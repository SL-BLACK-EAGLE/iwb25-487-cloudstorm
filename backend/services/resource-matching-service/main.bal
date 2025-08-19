import ballerina/http;
import ballerina/sql;
import ballerinax/postgresql;
import ballerina/os;
import ballerina/time;

listener http:Listener matchListener = new (8085);

function envOr(string k, string d) returns string { string? v = os:getEnv(k); return v ?: d; }
final string DB_HOST = envOr("DATABASE_HOST", "postgresql");
final string DB_NAME = envOr("DATABASE_NAME", "postgres");
final string DB_USER = envOr("DATABASE_USER", "postgres");
final string DB_PASS = envOr("DATABASE_PASSWORD", "password");

postgresql:Client dbClient;

function init() returns error? {
    dbClient = check new (host = DB_HOST, port = 5432, database = DB_NAME, username = DB_USER, password = DB_PASS);
}

type AidNeed record {|
    string id;
    string title;
    string? category;
|};

type DonorPref record {|
    string id;
    json? categories;
|};

// Unified error + metrics + simple in-memory cache placeholder
type ErrorResp record {| string code; string message; string? fieldName; |};
function err(string code, string message, string? fieldName = ()) returns ErrorResp { return { code, message, fieldName }; }

int suggestionCalcCount = 0;
json? lastSuggestionsCache = ();
int lastCacheTimestamp = 0; // epoch seconds
const int CACHE_TTL_SECONDS = 30;

service /matching on matchListener {
    resource function get health() returns json { return { status: "ok" }; }

    // Naive matching with basic time-based cache to reduce DB pressure.
    resource function get suggestions() returns json|error {
    time:Utc t = time:utcNow();
    int now = t[0];
        if lastSuggestionsCache is json && (now - lastCacheTimestamp) < CACHE_TTL_SECONDS {
            return { suggestions: lastSuggestionsCache, cached: true };
        }
        // Fetch aid requests
        stream<record {string id; string title; string? category;}, sql:Error?> aidRs = dbClient->query(`SELECT id, title, category FROM aid_requests WHERE status = 'active' ORDER BY created_at DESC LIMIT 50`);
        AidNeed[] needs = [];
        error? e1 = aidRs.forEach(function(record {string id; string title; string? category;} r) { needs.push({ id: r.id, title: r.title, category: r.category }); });
        if e1 is error { return e1; }
        // Fetch donors (limit for demo)
        stream<record {string id; json? categories;}, sql:Error?> donorRs = dbClient->query(`SELECT id, categories FROM donors ORDER BY created_at DESC LIMIT 200`);
        DonorPref[] donors = [];
        error? e2 = donorRs.forEach(function(record {string id; json? categories;} r) { donors.push({ id: r.id, categories: r.categories }); });
        if e2 is error { return e2; }

        json[] matches = [];
        foreach var need in needs {
            string? cat = need.category;
            if cat is () { continue; }
            string[] donorIds = [];
            foreach var d in donors {
                if d.categories is json[] {
                    foreach var c in <json[]> d.categories { if c is string && c == cat { donorIds.push(d.id); break; } }
                }
            }
            if donorIds.length() > 0 { matches.push({ aid_request: need.id, category: cat, donors: donorIds }); }
        }
        suggestionCalcCount = suggestionCalcCount + 1;
        lastSuggestionsCache = matches;
        lastCacheTimestamp = now;
        return { suggestions: matches, cached: false };
    }

    resource function get metrics() returns string {
        return string `matching_suggestion_calculations_total ${suggestionCalcCount}`;
    }
}
