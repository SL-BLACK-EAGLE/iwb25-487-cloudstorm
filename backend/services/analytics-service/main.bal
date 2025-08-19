import ballerina/http;
import ballerinax/postgresql;
import ballerina/os;
import ballerina/time;

listener http:Listener analyticsListener = new (8088);

function envOr(string k, string d) returns string { string? v = os:getEnv(k); return v ?: d; }
final string DB_HOST = envOr("DATABASE_HOST", "postgresql");
final string DB_NAME = envOr("DATABASE_NAME", "postgres");
final string DB_USER = envOr("DATABASE_USER", "postgres");
final string DB_PASS = envOr("DATABASE_PASSWORD", "password");

postgresql:Client dbClient;

function init() returns error? { dbClient = check new (host = DB_HOST, port = 5432, database = DB_NAME, username = DB_USER, password = DB_PASS); }

// Unified error + metrics
type ErrorResp record {| string code; string message; string? fieldName; |};
function err(string code, string message, string? fieldName = ()) returns ErrorResp { return { code, message, fieldName }; }

int analyticsQueryCount = 0; // counts actual DB summaries executed (not cache hits)
int lastUsers = 0;
int lastAid = 0;
int lastDonors = 0;
decimal lastTotalDonations = 0;
boolean cacheInitialized = false;
int lastSummaryTs = 0; // epoch seconds
const int SUMMARY_CACHE_TTL_SECONDS = 30;

service /analytics on analyticsListener {
    resource function get health() returns json { return { status: "ok" }; }

    resource function get summary() returns json|error {
        int now = time:utcNow()[0];
        if cacheInitialized && (now - lastSummaryTs) < SUMMARY_CACHE_TTL_SECONDS {
            return { users: lastUsers, aid_requests: lastAid, donors: lastDonors, total_donations: lastTotalDonations, cached: true };
        }
        record {int cnt;} users = check dbClient->queryRow(`SELECT COUNT(*) AS cnt FROM users`);
        record {int cnt;} aid = check dbClient->queryRow(`SELECT COUNT(*) AS cnt FROM aid_requests`);
        record {int cnt;} donors = check dbClient->queryRow(`SELECT COUNT(*) AS cnt FROM donors`);
        record {decimal total;} donations = check dbClient->queryRow(`SELECT COALESCE(SUM(amount),0) AS total FROM donations`);
        analyticsQueryCount = analyticsQueryCount + 1;
    lastUsers = users.cnt;
    lastAid = aid.cnt;
    lastDonors = donors.cnt;
    lastTotalDonations = donations.total;
    cacheInitialized = true;
        lastSummaryTs = now;
    return { users: lastUsers, aid_requests: lastAid, donors: lastDonors, total_donations: lastTotalDonations, cached: false };
    }

    resource function get metrics() returns string {
        return string `analytics_summary_queries_total ${analyticsQueryCount}`;
    }
}
