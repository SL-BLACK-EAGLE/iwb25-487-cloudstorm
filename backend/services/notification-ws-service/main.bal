import ballerina/http;
import ballerina/websocket;
import ballerina/os;

// Minimal WebSocket proxy service.
// Clients connect and can request current raw metrics from the core notification-service.

const string DEFAULT_NOTIFICATION_BASE = "http://localhost:8086/notifications";
string notificationBase = DEFAULT_NOTIFICATION_BASE;

function init() {
    string? v = os:getEnv("NOTIFICATION_BASE");
    if v is string {
        string trimmed = v.trim();
        if trimmed.length() > 0 { notificationBase = trimmed; }
    }
}


listener websocket:Listener wsListener = new (8090);

service /ws on wsListener {
    resource function get metrics() returns websocket:Service {
        return new MetricsWsService();
    }
}

service class MetricsWsService {
    *websocket:Service;

    remote function onOpen(websocket:Caller caller) returns websocket:Error? {
        return caller->writeTextMessage("{\"type\":\"welcome\",\"msg\":\"send 'metrics' to get current queue metrics\"}");
    }

    remote function onText(websocket:Caller caller, string text) returns websocket:Error? {
        if text == "ping" { return caller->writeTextMessage("pong"); }
        if text == "metrics" {
            http:Client c = checkpanic new (notificationBase);
            http:Response|error resp = c->get("/metrics");
            if resp is http:Response {
                var payload = resp.getTextPayload();
                if payload is string {
                    int email = 0; int sms = 0; string line = "";
                    int i = 0; int len = payload.length();
                    while i < len {
                        string ch = payload.substring(i, i + 1);
                        if ch == "\n" {
                            [email, sms] = processLine(line, email, sms);
                            line = "";
                        } else {
                            line = line + ch;
                        }
                        i = i + 1;
                    }
                    // last line
                    if line.length() > 0 { [email, sms] = processLine(line, email, sms); }
                    json out = {"type": "queue_metrics", "emailQueued": email, "smsQueued": sms};
                    return caller->writeTextMessage(out.toJsonString());
                }
            } else if resp is error {
                return caller->writeTextMessage("{\"type\":\"error\",\"message\":\"" + resp.toString() + "\"}");
            }
        }
    }
}

function processLine(string line, int email, int sms) returns [int,int] {
    int emailLocal = email;
    int smsLocal = sms;
    string trimmed = line.trim();
    if trimmed.startsWith("notification_email_queued_total") {
        int idx = trimmed.lastIndexOf(" ") ?: -1;
        if idx > 0 { var v = int:fromString(trimmed.substring(idx + 1)); if v is int { emailLocal = v; } }
    } else if trimmed.startsWith("notification_sms_queued_total") {
        int idx2 = trimmed.lastIndexOf(" ") ?: -1;
        if idx2 > 0 { var v2 = int:fromString(trimmed.substring(idx2 + 1)); if v2 is int { smsLocal = v2; } }
    }
    return [emailLocal, smsLocal];
}
