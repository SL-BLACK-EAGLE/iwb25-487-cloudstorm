import ballerina/http;
import ballerina/sql;
import ballerinax/postgresql;
import ballerina/os;
import ballerina/time;
import ballerina/log;
import ballerina/uuid;

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

// Local error payload
type ErrorResp record {| string code; string message; string? fieldName; |};
function err(string code, string message, string? fieldName = ()) returns ErrorResp { return { code, message, fieldName }; }

int suggestionCalcCount = 0;
json? lastSuggestionsCache = ();
int lastCacheTimestamp = 0; // epoch seconds
const int CACHE_TTL_SECONDS = 30;

// Histogram buckets counters
int duration_lt_1s = 0;
int duration_lt_5s = 0;
int duration_ge_5s = 0;

// Use shared structured logger
// Correlation + timing helpers (local)
type Timer record {| int started; string cid; string op; |};

function correlationId(string? incoming = ()) returns string {
    if incoming is string && incoming.length() > 0 { return incoming; }
    return uuid:createType4AsString();
}

function startTimer(string op, string cid = correlationId()) returns Timer { return { started: time:utcNow()[0], cid, op }; }

function endTimer(Timer t, map<anydata>? extra = ()) returns string {
    int elapsed = time:utcNow()[0] - t.started;
    string b = elapsed < 1 ? "lt_1s" : (elapsed < 5 ? "lt_5s" : "ge_5s");
    map<anydata> m = { duration_seconds: elapsed, bucket: b, op: t.op };
    if extra is map<anydata> { foreach var [k,v] in extra.entries() { m[k] = v; } }
    logJson("info", "op_complete", m, t.cid);
    return b;
}

function logJson(string level, string msg, map<anydata>? fields = (), string cid = "") {
    string useCid = cid.length() > 0 ? cid : correlationId();
    map<anydata> m = { ts: time:utcNow()[0], level: level, msg: msg, cid: useCid, svc: "resource-matching-service" };
    if fields is map<anydata> { foreach var [k,v] in fields.entries() { m[k] = v; } }
    json j = <json>m;
    if level == "error" { log:printError(j.toJsonString()); } else { log:printInfo(j.toJsonString()); }
}

service /matching on matchListener {
    resource function get health() returns json { return { status: "ok", svc: "resource-matching-service" }; }

    // Naive matching with basic time-based cache to reduce DB pressure.
    resource function get suggestions(@http:Header string? x_cid) returns json|error {
        string cid = correlationId(x_cid);
        Timer tm = startTimer("suggestions", cid);
        time:Utc t = time:utcNow();
        int now = t[0];
        if lastSuggestionsCache is json && (now - lastCacheTimestamp) < CACHE_TTL_SECONDS {
            logJson("debug", "cache_hit", { ageSeconds: now - lastCacheTimestamp }, cid);
            string b = endTimer(tm, { cache: true });
            trackBucket(b);
            return { suggestions: lastSuggestionsCache, cached: true, bucket: b };
        }
        // Fetch aid requests
        stream<record {string id; string title; string? category;}, sql:Error?> aidRs = dbClient->query(`SELECT id, title, category FROM aid_requests WHERE status = 'active' ORDER BY created_at DESC LIMIT 50`);
        AidNeed[] needs = [];
        error? e1 = aidRs.forEach(function(record {string id; string title; string? category;} r) { needs.push({ id: r.id, title: r.title, category: r.category }); });
    if e1 is error {
        logJson("error", "aid_query_failed", { err: e1.message() }, cid);
    _ = endTimer(tm, { "error": true });
        return e1;
    }
        // Fetch donors (limit for demo)
        stream<record {string id; json? categories;}, sql:Error?> donorRs = dbClient->query(`SELECT id, categories FROM donors ORDER BY created_at DESC LIMIT 200`);
        DonorPref[] donors = [];
        error? e2 = donorRs.forEach(function(record {string id; json? categories;} r) { donors.push({ id: r.id, categories: r.categories }); });
    if e2 is error {
        logJson("error", "donor_query_failed", { err: e2.message() }, cid);
    _ = endTimer(tm, { "error": true });
        return e2;
    }

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
    logJson("info", "suggestions_computed", { suggestions: matches.length(), calcNo: suggestionCalcCount }, cid);
    string b2 = endTimer(tm, { suggestions: matches.length() });
        trackBucket(b2);
        return { suggestions: matches, cached: false, bucket: b2 };
    }

    resource function get metrics() returns string {
        return string `matching_suggestion_calculations_total ${suggestionCalcCount}\n` +
            string `matching_duration_bucket{le="lt_1s"} ${duration_lt_1s}\n` +
            string `matching_duration_bucket{le="lt_5s"} ${duration_lt_5s}\n` +
            string `matching_duration_bucket{le="ge_5s"} ${duration_ge_5s}`;
    }
}

function trackBucket(string b) {
    if b == "lt_1s" { duration_lt_1s = duration_lt_1s + 1; }
    else if b == "lt_5s" { duration_lt_5s = duration_lt_5s + 1; }
    else { duration_ge_5s = duration_ge_5s + 1; }
}
