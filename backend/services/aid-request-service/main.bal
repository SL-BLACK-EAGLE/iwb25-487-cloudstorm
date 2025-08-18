import ballerina/http;
import ballerina/sql;
import ballerinax/postgresql;
import ballerina/os;

listener http:Listener aidListener = new (8082);

function envOr(string k, string d) returns string { string? v = os:getEnv(k); return v ?: d; }
final string DB_HOST = envOr("DATABASE_HOST", "postgresql");
final string DB_NAME = envOr("DATABASE_NAME", "postgres");
final string DB_USER = envOr("DATABASE_USER", "postgres");
final string DB_PASS = envOr("DATABASE_PASSWORD", "password");

postgresql:Client dbClient;

function init() returns error? {
    dbClient = check new (host = DB_HOST, port = 5432, database = DB_NAME, username = DB_USER, password = DB_PASS);
}

type CreateAidRequest record {|
    string title;
    string? description;
    string? category;
    int? urgency_level; // optional in request body
|};

type AidRequest record {|
    string id;
    string user_id;
    string title;
    string? description;
    string? category;
    int urgency_level; // stored non-null in DB
    string? status;
    string? created_at;
|};

function extractUserId(string authorization) returns string|error {
    if !authorization.startsWith("Bearer ") { return error("unauthorized"); }
    string token = authorization.substring(7);
    int? dotIndexOpt = token.indexOf(".");
    if dotIndexOpt is () { return error("unauthorized"); }
    int dotIndex = dotIndexOpt;
    if dotIndex < 0 { return error("unauthorized"); }
    return token.substring(0, dotIndex);
}

service / on aidListener {
    resource function post aid_requests(@http:Header string authorization, @http:Payload CreateAidRequest req) returns json|error {
        string userId = check extractUserId(authorization);
    int urgency = req.urgency_level ?: 0;
    sql:ParameterizedQuery q = `INSERT INTO aid_requests (user_id, title, description, category, urgency_level) VALUES (${userId}, ${req.title}, ${req.description}, ${req.category}, ${urgency}) RETURNING id, user_id, title, description, category, urgency_level, status, created_at`;
    record {string id; string user_id; string title; string? description; string? category; int urgency_level; string? status; string? created_at;} row = check dbClient->queryRow(q);
        return { id: row.id, user_id: row.user_id, title: row.title, description: row.description, category: row.category, urgency_level: row.urgency_level, status: row.status, created_at: row.created_at };
    }

    resource function get aid_requests() returns json|error {
    stream<record {string id; string user_id; string title; string? description; string? category; int urgency_level; string? status; string? created_at;}, sql:Error?> rs = dbClient->query(`SELECT id, user_id, title, description, category, urgency_level, status, created_at FROM aid_requests ORDER BY created_at DESC LIMIT 100`);
        json[] out = [];
        while true {
            var n = rs.next();
            if n is () { break; }
            if n is record {string id; string user_id; string title; string? description; string? category; int urgency_level; string? status; string? created_at;} rec {
                out.push({ id: rec.id, user_id: rec.user_id, title: rec.title, description: rec.description, category: rec.category, urgency_level: rec.urgency_level, status: rec.status, created_at: rec.created_at });
            } else if n is sql:Error err { return err; }
        }
        return out;
    }
}
