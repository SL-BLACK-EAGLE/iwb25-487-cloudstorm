import ballerina/http;
import ballerina/sql;
import ballerinax/postgresql;
import ballerina/crypto;
import ballerina/time;
import ballerina/os;
import smartrelief.shared.errors as serr;
// (no extra util imports required)

// Environment configuration (simple approach using runtime: getEnv)
function envOr(string key, string def) returns string {
    string? val = os:getEnv(key);
    return val ?: def;
}

final string DB_HOST = envOr("DATABASE_HOST", "postgresql");
final string DB_PORT = envOr("DATABASE_PORT", "5432");
final string DB_USER = envOr("DATABASE_USER", "postgres");
final string DB_PASS = envOr("DATABASE_PASSWORD", "password");
final string DB_NAME = envOr("DATABASE_NAME", "postgres");
final string JWT_SECRET = envOr("JWT_SECRET", "devsecret");

// Create PostgreSQL client
postgresql:Client dbClient = check new (host = DB_HOST, port = 5432, database = DB_NAME, username = DB_USER, password = DB_PASS);

type RegisterRequest record {|
    string email;
    string password;
    string role?;
|};

type LoginRequest record {|
    string email;
    string password;
|};

type User record {| string id; string email; string role; |};

// Shared error type/constructor
type ErrorResp serr:ErrorResp;
function err(string code, string message, string? fieldName = ()) returns ErrorResp { return serr:err(code, message, fieldName); }

// Simple metrics counters
int registerCount = 0;
int loginCount = 0;

// Internal row mapping types
type RowReg record {| string id; string role; |};
type RowLogin record {| string id; string password_hash; string role; |};

function hashPassword(string pwd) returns string {
    // Placeholder hashing; for production use a strong adaptive hash.
    byte[] digest = crypto:hashSha256(pwd.toBytes());
    return digest.toBase16();
}

// Token structure: userId.issuedAtEpochSeconds.signature(HMAC(userId.issuedAt, secret))
const int TOKEN_TTL_SECONDS = 3600; // 1 hour

function generateToken(User u) returns string {
    time:Utc now = time:utcNow();
    int issued = now[0];
    string base = u.id + "." + issued.toString();
    byte[]|crypto:Error sig = crypto:hmacSha256(JWT_SECRET.toBytes(), base.toBytes());
    if sig is crypto:Error { return base + ".err"; }
    return base + "." + sig.toBase16();
}

function verifyToken(string token) returns string|error {
    int? firstDot = token.indexOf(".");
    if firstDot is () { return error("invalid_token"); }
    int fd = firstDot;
    int? secondDot = token.indexOf(".", fd + 1);
    if secondDot is () { return error("invalid_token"); }
    int sd = secondDot;
    string userId = token.substring(0, fd);
    string issuedStr = token.substring(fd + 1, sd);
    string providedSig = token.substring(sd + 1);
    int|error issued = int:fromString(issuedStr);
    if issued is error { return error("invalid_token"); }
    int now = time:utcNow()[0];
    if (now - issued) > TOKEN_TTL_SECONDS { return error("token_expired"); }
    string base = userId + "." + issuedStr;
    byte[]|crypto:Error expected = crypto:hmacSha256(JWT_SECRET.toBytes(), base.toBytes());
    if expected is crypto:Error { return error("invalid_signature"); }
    if expected.toBase16() != providedSig { return error("invalid_signature"); }
    return userId;
}

// Verify password (hash compare)
function verifyPassword(string pwd, string hash) returns boolean {
    return hashPassword(pwd) == hash;
}

listener http:Listener authListener = new (8081);

service /auth on authListener {
    resource function post register(@http:Payload RegisterRequest req) returns json|error {
        string role = req.role ?: "victim";
        string pwdHash = hashPassword(req.password);
        sql:ParameterizedQuery insertQ = `INSERT INTO users (email, password_hash, role) VALUES (${req.email}, ${pwdHash}, ${role}) RETURNING id, role`;
    var res = dbClient->queryRow(insertQ, RowReg);
    if res is sql:Error {
            string m = res.message();
            if m.indexOf("duplicate key value") >= 0 && m.indexOf("users_email_key") >= 0 { return err("email_conflict", "Email already registered", "email"); }
            return res;
        }
    RowReg row = <RowReg>res;
        User u = { id: row.id, email: req.email, role: row.role };
        string token = generateToken(u);
        registerCount = registerCount + 1;
        return { user: u, token };
    }

    resource function post login(@http:Payload LoginRequest req) returns json|error {
        sql:ParameterizedQuery selQ = `SELECT id, password_hash, role FROM users WHERE email = ${req.email}`;
    var qres = dbClient->queryRow(selQ, RowLogin);
        if qres is sql:NoRowsError { return err("invalid_credentials", "Email or password incorrect"); }
        if qres is sql:Error { return qres; }
    RowLogin row = <RowLogin>qres;
        if !verifyPassword(req.password, row.password_hash) { return err("invalid_credentials", "Email or password incorrect"); }
        User u = { id: row.id, email: req.email, role: row.role };
        string token = generateToken(u);
        loginCount = loginCount + 1;
        return { user: u, token };
    }

    resource function get profile(@http:Header string authorization) returns json|error {
        if !authorization.startsWith("Bearer ") { return err("unauthorized", "Missing bearer token"); }
        string token = authorization.substring(7);
        var uid = verifyToken(token);
        if uid is error { return err("unauthorized", uid.message()); }
        return { user_id: uid };
    }

    resource function get metrics() returns string {
        return string `auth_register_total ${registerCount}\n` +
            string `auth_login_total ${loginCount}`;
    }
}
