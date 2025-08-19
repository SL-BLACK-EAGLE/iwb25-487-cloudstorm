import ballerina/http;
import ballerina/uuid;
import ballerina/sql;
import ballerinax/postgresql;
import ballerina/os;

listener http:Listener donorListener = new (8083);

function envOr(string k, string d) returns string { string? v = os:getEnv(k); return v ?: d; }
final string DB_HOST = envOr("DATABASE_HOST", "postgresql");
final string DB_NAME = envOr("DATABASE_NAME", "postgres");
final string DB_USER = envOr("DATABASE_USER", "postgres");
final string DB_PASS = envOr("DATABASE_PASSWORD", "password");

postgresql:Client dbClient;

function init() returns error? {
    dbClient = check new (host = DB_HOST, port = 5432, database = DB_NAME, username = DB_USER, password = DB_PASS);
}

type Donation record {|
    string donation_id;
    string donor_id;
    decimal amount;
    string currency;
    string? aid_request_id;
    string status;
    string? timestamp;
|};

type Donor record {|
    string id;
    string name;
    string? email;
    string? phone;
    string? organization;
    string[] categories?;
    decimal total_contributed;
    string? created_at;
|};

// Row types for DB mapping
type DonorRow record {|
    string id;
    string name;
    string? email;
    string? phone;
    string? organization;
    json? categories;
    decimal total_contributed;
    string? created_at;
|};

type DonationRow record {|
    string donation_id;
    string donor_id;
    decimal amount;
    string currency;
    string? aid_request_id;
    string status;
    string? timestamp;
|};

type DonorTotalRow record {| decimal total_contributed; |};

// Unified error payload type + helper
type ErrorResp record {| string code; string message; string? fieldName; |};

function err(string code, string message, string? fieldName = ()) returns ErrorResp { return { code, message, fieldName }; }

// Basic metrics (not concurrency-safe; acceptable for demo)
int donorCreatedCount = 0;
int donationCreatedCount = 0;

// Safely extract string array categories from a json/json[] value returned by DB
function extractCategories(json? j) returns string[]? {
    if j is json[] {
        string[] acc = [];
        foreach var item in j { if item is string { acc.push(item); } }
        if acc.length() > 0 { return acc; }
    }
    return ();
}

service /donors on donorListener {
    resource function post .(@http:Payload record {|string name; string? email?; string? phone?; string? organization?; string[] categories?;|} body) returns json|error {
        if body.name.trim().length() == 0 { return err("invalid_input", "Name required", "name"); }
        string id = uuid:createType1AsString();
        string? catsJsonText = ();
        if body.categories is string[] { catsJsonText = (<json> body.categories).toJsonString(); }
        sql:ParameterizedQuery q = `INSERT INTO donors (id, name, email, phone, organization, categories)
            VALUES (CAST(${id} AS UUID), ${body.name}, ${body?.email}, ${body?.phone}, ${body?.organization}, CAST(${catsJsonText} AS JSONB))
            RETURNING id, name, email, phone, organization, COALESCE(categories, '[]'::jsonb) AS categories, total_contributed, created_at`;
        var res = dbClient->queryRow(q, DonorRow);
        if res is sql:Error {
            string msg = res.message();
            if msg.indexOf("duplicate key value") >= 0 && msg.indexOf("email") >= 0 {
                return err("email_conflict", "Email already exists", "email");
            }
            return res;
        }
        DonorRow row = <DonorRow>res;
        string[]? cats = extractCategories(row.categories);
        donorCreatedCount = donorCreatedCount + 1;
        return <json>{ id: row.id, name: row.name, email: row.email, phone: row.phone, organization: row.organization, categories: cats, total_contributed: row.total_contributed, created_at: row.created_at };
    }

    // Search donors by a single category value
    resource function get search(@http:Query string category) returns json|error {
        // Build JSON array text for containment query
        string catJson = (<json>[category]).toJsonString();
        sql:ParameterizedQuery q = `SELECT id, name, email, phone, organization, COALESCE(categories, '[]'::jsonb) AS categories, total_contributed, created_at FROM donors WHERE categories @> CAST(${catJson} AS JSONB) ORDER BY total_contributed DESC LIMIT 100`;
        stream<record {string id; string name; string? email; string? phone; string? organization; json? categories; decimal total_contributed; string? created_at;}, sql:Error?> rs = dbClient->query(q);
        json[] out = [];
        error? e = rs.forEach(function(record {string id; string name; string? email; string? phone; string? organization; json? categories; decimal total_contributed; string? created_at;} r) {
            string[]? cats = extractCategories(r.categories);
            out.push({ id: r.id, name: r.name, email: r.email, phone: r.phone, organization: r.organization, categories: cats, total_contributed: r.total_contributed, created_at: r.created_at });
        });
        if e is error { return e; }
        return out;
    }

    resource function get .() returns json|error {
        stream<record {string id; string name; string? email; string? phone; string? organization; json? categories; decimal total_contributed; string? created_at;}, sql:Error?> rs = dbClient->query(`SELECT id, name, email, phone, organization, COALESCE(categories, '[]'::jsonb) AS categories, total_contributed, created_at FROM donors ORDER BY created_at DESC LIMIT 200`);
        json[] out = [];
        error? e = rs.forEach(function(record {string id; string name; string? email; string? phone; string? organization; json? categories; decimal total_contributed; string? created_at;} r) {
            string[]? cats = ();
            if r.categories is json[] {
                json[] arr = <json[]> r.categories;
                string[] tmp = [];
                foreach var j in arr { if j is string { tmp.push(j); } }
                if tmp.length() > 0 { cats = tmp; }
            }
            out.push({ id: r.id, name: r.name, email: r.email, phone: r.phone, organization: r.organization, categories: cats, total_contributed: r.total_contributed, created_at: r.created_at });
        });
        if e is error { return e; }
        return out;
    }

    resource function get [string id]() returns json|error {
        sql:ParameterizedQuery q = `SELECT id, name, email, phone, organization, COALESCE(categories, '[]'::jsonb) AS categories, total_contributed, created_at FROM donors WHERE id = CAST(${id} AS UUID)`;
        var row = dbClient->queryRow(q, DonorRow);
    if row is DonorRow {
            string[]? cats = ();
            if row.categories is json[] {
                json[] arr = <json[]> row.categories;
                string[] temp = [];
                foreach var it in arr { if it is string { temp.push(it); } }
                if temp.length() > 0 { cats = temp; }
            }
            return <json>{ id: row.id, name: row.name, email: row.email, phone: row.phone, organization: row.organization, categories: cats, total_contributed: row.total_contributed, created_at: row.created_at };
        } else if row is sql:NoRowsError {
            return err("not_found", "Donor not found");
        } else if row is sql:Error {
            return row;
        }
    }

    resource function post [string id]/donations(@http:Payload record {|decimal amount; string currency; string? aidRequestId?;|} body) returns json|error {
        // Insert donation
        string donationId = uuid:createType1AsString();
        sql:ParameterizedQuery ins = `INSERT INTO donations (donation_id, donor_id, amount, currency, aid_request_id) VALUES (CAST(${donationId} AS UUID), CAST(${id} AS UUID), ${body.amount}, ${body.currency}, ${body?.aidRequestId}) RETURNING donation_id, donor_id, amount, currency, aid_request_id, status, timestamp`;
    DonationRow drow = check dbClient->queryRow(ins);
        // Update donor total
    var execRes = dbClient->execute(`UPDATE donors SET total_contributed = total_contributed + ${body.amount} WHERE id = CAST(${id} AS UUID)`);
    if execRes is sql:Error { return execRes; }
    var totRow = dbClient->queryRow(`SELECT total_contributed FROM donors WHERE id = CAST(${id} AS UUID)`, DonorTotalRow);
    decimal newTotal = 0;
    if totRow is record {decimal total_contributed;} { newTotal = totRow.total_contributed; }
    json respDonation = { donation_id: drow.donation_id, donor_id: drow.donor_id, amount: drow.amount, currency: drow.currency, aid_request_id: drow.aid_request_id, status: drow.status, timestamp: drow.timestamp };
    donationCreatedCount = donationCreatedCount + 1;
    return <json>{ donation: respDonation, total_contributed: newTotal };
    }

    resource function get [string id]/history() returns json|error {
        stream<record {string donation_id; string donor_id; decimal amount; string currency; string? aid_request_id; string status; string? timestamp;}, sql:Error?> rs = dbClient->query(`SELECT donation_id, donor_id, amount, currency, aid_request_id, status, timestamp FROM donations WHERE donor_id = CAST(${id} AS UUID) ORDER BY timestamp DESC LIMIT 500`);
        json[] list = [];
        error? e = rs.forEach(function(record {string donation_id; string donor_id; decimal amount; string currency; string? aid_request_id; string status; string? timestamp;} r) {
            list.push({ donation_id: r.donation_id, donor_id: r.donor_id, amount: r.amount, currency: r.currency, aid_request_id: r.aid_request_id, status: r.status, timestamp: r.timestamp });
        });
        if e is error { return e; }
    return { donation_history: list };
    }

    // Update donor categories (replace existing set)
    resource function put [string id]/categories(@http:Payload record {| string[] categories?; |} body) returns json|error {
        string? catsJsonText = ();
        if body?.categories is string[] {
            catsJsonText = (<json> body.categories).toJsonString();
        }
        sql:ParameterizedQuery q = `UPDATE donors SET categories = CAST(${catsJsonText} AS JSONB) WHERE id = CAST(${id} AS UUID) RETURNING id, name, email, phone, organization, COALESCE(categories, '[]'::jsonb) AS categories, total_contributed, created_at`;
        var res = dbClient->queryRow(q, DonorRow);
        if res is DonorRow {
            string[]? cats = extractCategories(res.categories);
            return <json>{ id: res.id, name: res.name, email: res.email, phone: res.phone, organization: res.organization, categories: cats, total_contributed: res.total_contributed, created_at: res.created_at };
        } else if res is sql:NoRowsError {
            return err("not_found", "Donor not found");
        } else if res is sql:Error {
            return res;
        }
    }

    // Prometheus style metrics endpoint
    resource function get metrics() returns string {
        return string `donor_created_total ${donorCreatedCount}\n` +
            string `donation_created_total ${donationCreatedCount}`;
    }
}
