import ballerina/http;
import ballerina/uuid;
import ballerina/log;

listener http:Listener notificationListener = new (8086);

type Notification record {|
    string id;
    string channel; // email | sms
    string to;
    string subject?; // email
    string message?;
    string status; // queued|sent
|};

Notification[] queue = [];

// Unified error + metrics
type ErrorResp record {| string code; string message; string? fieldName; |};
function err(string code, string message, string? fieldName = ()) returns ErrorResp { return { code, message, fieldName }; }

int emailQueuedCount = 0;
int smsQueuedCount = 0;

service /notifications on notificationListener {
    resource function get health() returns json { return { status: "ok" }; }

    resource function post email(@http:Payload record {| string to; string subject; string message; |} body) returns json|ErrorResp {
        if body.to.trim().length() == 0 { return err("invalid_input", "Recipient required", "to"); }
        Notification n = { id: uuid:createType1AsString(), channel: "email", to: body.to, subject: body.subject, message: body.message, status: "queued" };
        queue = [...queue, n];
        log:printInfo("Queued email to " + body.to);
        emailQueuedCount = emailQueuedCount + 1;
        return { queued: true, id: n.id };
    }

    resource function post sms(@http:Payload record {| string to; string message; |} body) returns json|ErrorResp {
        if body.to.trim().length() == 0 { return err("invalid_input", "Recipient required", "to"); }
        Notification n = { id: uuid:createType1AsString(), channel: "sms", to: body.to, message: body.message, status: "queued" };
        queue = [...queue, n];
        log:printInfo("Queued sms to " + body.to);
        smsQueuedCount = smsQueuedCount + 1;
        return { queued: true, id: n.id };
    }

    resource function get queue() returns Notification[] { return queue; }

    resource function get metrics() returns string {
        return string `notification_email_queued_total ${emailQueuedCount}\n` +
            string `notification_sms_queued_total ${smsQueuedCount}`;
    }
}
