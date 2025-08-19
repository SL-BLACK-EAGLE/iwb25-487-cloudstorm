import ballerina/time;
import ballerina/log;
import ballerina/uuid;

// Root shared helpers (import smartrelief/shared).

public type ErrorResp record {| string code; string message; string? fieldName; |};
public function err(string code, string message, string? fieldName = ()) returns ErrorResp { return { code, message, fieldName }; }

public type Timer record {| int started; string cid; string op; |};

public function correlationId(string? incoming = ()) returns string {
    if incoming is string && incoming.length() > 0 { return incoming; }
    return uuid:createType4AsString();
}

public function startTimer(string op, string cid = correlationId()) returns Timer {
    return { started: time:utcNow()[0], cid, op };
}

function bucket(int elapsedSec) returns string {
    if elapsedSec < 1 { return "lt_1s"; }
    if elapsedSec < 5 { return "lt_5s"; }
    return "ge_5s";
}

public function logJson(string level, string message, map<anydata>? fields = (), string cid = correlationId()) {
    map<anydata> data = { ts: time:utcNow()[0], level, msg: message, cid };
    if fields is map<anydata> { foreach var [k,v] in fields.entries() { data[k] = v; } }
    json j = <json>data;
    if level == "error" { log:printError(j.toJsonString()); } else { log:printInfo(j.toJsonString()); }
}

public function endTimer(Timer t, map<anydata>? extra = ()) returns string {
    int elapsed = time:utcNow()[0] - t.started;
    string b = bucket(elapsed);
    map<anydata> m = { duration_seconds: elapsed, bucket: b, op: t.op };
    if extra is map<anydata> { foreach var [k,v] in extra.entries() { m[k] = v; } }
    logJson("info", "op_complete", m, t.cid);
    return b;
}
