import ballerina/time;
import ballerina/log;
import ballerina/uuid;

// Structured logging + simple timing with correlation IDs.

public type Timer record {| int started; string cid; |};

public function correlationId(string? incoming = ()) returns string {
    if incoming is string && incoming.length() > 0 { return incoming; }
    return uuid:createType4AsString();
}

public function startTimer(string cid = correlationId()) returns Timer {
    return { started: time:utcNow()[0], cid };
}

function bucket(int elapsedSec) returns string {
    if elapsedSec < 1 { return "lt_1s"; }
    if elapsedSec < 5 { return "lt_5s"; }
    return "ge_5s";
}

public type LogFields map<anydata>;

public function logJson(string level, string message, LogFields? fields = (), string cid = correlationId()) {
    map<anydata> data = { ts: time:utcNow()[0], level, msg: message, cid };
    if fields is map<anydata> { foreach var [k,v] in fields.entries() { data[k] = v; } }
    json j = <json>data;
    if level == "error" { log:printError(j.toJsonString()); } else { log:printInfo(j.toJsonString()); }
}

public function endTimer(Timer t, string message, LogFields? fields = ()) {
    int elapsed = time:utcNow()[0] - t.started;
    string b = bucket(elapsed);
    map<anydata> extra = { duration_seconds: elapsed, bucket: b };
    if fields is map<anydata> { foreach var [k,v] in fields.entries() { extra[k] = v; } }
    logJson("info", message, extra, t.cid);
}
