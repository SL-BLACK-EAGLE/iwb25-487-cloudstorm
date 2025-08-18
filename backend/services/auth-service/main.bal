import ballerina/http;
import ballerina/sql;
import ballerinax/postgresql;
import ballerina/crypto;
import ballerina/time;
import ballerina/os;

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

type User record {|
    string id;
    string email;
    string role;
|};

function hashPassword(string pwd) returns string {
    // Simple SHA256 hash (placeholder; in production use bcrypt/argon2 via external lib)
    byte[] digest = crypto:hashSha256(pwd.toBytes());
    return digest.toBase16();
}

function generateToken(User u) returns string {
    time:Utc now = time:utcNow();
    string tokenSource = u.id + u.email + time:utcToString(now);
    byte[] hash = crypto:hashSha256(tokenSource.toBytes());
    return u.id + "." + hash.toBase16();
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
    record {string id; string role;} row = check dbClient->queryRow(insertQ);
    User u = { id: row.id, email: req.email, role: row.role };
    string token = generateToken(u);
    return {"user": u, "token": token};
    }

    resource function post login(@http:Payload LoginRequest req) returns json|error {
        sql:ParameterizedQuery selQ = `SELECT id, password_hash, role FROM users WHERE email = ${req.email}`;
    record {string id; string password_hash; string role;} row = check dbClient->queryRow(selQ);
    if !verifyPassword(req.password, row.password_hash) { return {"error":"invalid_credentials"}; }
    User u = { id: row.id, email: req.email, role: row.role };
    string token = generateToken(u);
    return {"user": u, "token": token};
    }

    resource function get profile(@http:Header string authorization) returns json|error {
    if authorization.startsWith("Bearer ") { return {"message":"ok"}; }
    return {"error":"unauthorized"};
    }
}
