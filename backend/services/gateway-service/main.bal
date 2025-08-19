import ballerina/http;
import ballerina/log;

listener http:Listener gatewayListener = new (8080);

http:Client authClient = check new ("http://auth-service:8081");
http:Client aidClient = check new ("http://aid-request-service:8082");
http:Client donorClient = check new ("http://donor-management-service:8083");
http:Client volunteerClient = check new ("http://volunteer-coordination-service:8084");
http:Client matchClient = check new ("http://resource-matching-service:8085");
http:Client notificationClient = check new ("http://notification-service:8086");
http:Client locationClient = check new ("http://location-service:8087");
http:Client analyticsClient = check new ("http://analytics-service:8088");

// Simple gateway metrics counters
int proxyRequestCount = 0;
int proxyErrorCount = 0;

function wrapJson(http:Client cl, string path, string method = "GET", json body = {}, map<string|string[]> headers = {}) returns json|error {
    proxyRequestCount = proxyRequestCount + 1;
    http:Response|error resp;
    if method == "GET" {
        resp = cl->get(path, headers);
    } else if method == "POST" {
        resp = cl->post(path, body, headers);
    } else if method == "PUT" {
        resp = cl->put(path, body, headers);
    } else {
        return { code: "unsupported_method", message: "Method not supported" };
    }
    if resp is error {
        proxyErrorCount = proxyErrorCount + 1;
        log:printError("Gateway proxy error", 'error = resp);
        return resp;
    }
    return check resp.getJsonPayload();
}

service / on gatewayListener {
    resource function get health() returns json {
        return { status: "ok" };
    }

    resource function post auth/login(@http:Payload json body) returns json|error {
        return wrapJson(authClient, "/auth/login", "POST", body);
    }

    resource function post auth/register(@http:Payload json body) returns json|error {
        return wrapJson(authClient, "/auth/register", "POST", body);
    }

    resource function get auth/profile(@http:Header string authorization) returns json|error {
        map<string|string[]> headers = { authorization };
        return wrapJson(authClient, "/auth/profile", "GET", {}, headers);
    }

    resource function get aid/requests() returns json|error {
        return wrapJson(aidClient, "/aid_requests");
    }

    resource function post aid/requests(@http:Header string authorization, @http:Payload json body) returns json|error {
        map<string|string[]> headers = { authorization };
        return wrapJson(aidClient, "/aid_requests", "POST", body, headers);
    }

    // Donor proxy
    resource function post donors(@http:Payload json body) returns json|error {
        return wrapJson(donorClient, "/donors", "POST", body);
    }

    resource function get donors() returns json|error {
        return wrapJson(donorClient, "/donors");
    }

    resource function get donors/[string id]() returns json|error {
        return wrapJson(donorClient, string `/donors/${id}`);
    }

    resource function post donors/[string id]/donations(@http:Payload json body) returns json|error {
        return wrapJson(donorClient, string `/donors/${id}/donations`, "POST", body);
    }

    resource function get donors/[string id]/history() returns json|error {
        return wrapJson(donorClient, string `/donors/${id}/history`);
    }

    resource function put donors/[string id]/categories(@http:Payload json body) returns json|error|http:Response {
        // Return raw response only if conflict to preserve status code
        http:Response|error raw = donorClient->put(string `/donors/${id}/categories`, body);
        if raw is error { proxyErrorCount = proxyErrorCount + 1; return raw; }
        if raw.statusCode == 409 { return raw; }
        proxyRequestCount = proxyRequestCount + 1;
        return check raw.getJsonPayload();
    }

    // Volunteer & tasks proxy
    resource function post volunteers(@http:Payload json body) returns json|error {
        return wrapJson(volunteerClient, "/volunteers", "POST", body);
    }

    resource function get volunteers() returns json|error {
        return wrapJson(volunteerClient, "/volunteers");
    }

    resource function post volunteers/tasks(@http:Payload json body) returns json|error {
        return wrapJson(volunteerClient, "/volunteers/tasks", "POST", body);
    }

    resource function get volunteers/tasks() returns json|error {
        return wrapJson(volunteerClient, "/volunteers/tasks");
    }

    resource function post volunteers/tasks/assign/[string taskId]() returns json|error {
        return wrapJson(volunteerClient, string `/volunteers/tasks/assign/${taskId}`, "POST", {});
    }

    // Matching
    resource function get matching/suggestions() returns json|error {
        return wrapJson(matchClient, "/matching/suggestions");
    }

    // Notifications
    resource function post notifications/email(@http:Payload json body) returns json|error {
        return wrapJson(notificationClient, "/notifications/email", "POST", body);
    }
    resource function post notifications/sms(@http:Payload json body) returns json|error {
        return wrapJson(notificationClient, "/notifications/sms", "POST", body);
    }
    resource function get notifications/queue() returns json|error {
        return wrapJson(notificationClient, "/notifications/queue");
    }

    // Location
    resource function post locations/geocode(@http:Payload json body) returns json|error {
        return wrapJson(locationClient, "/locations/geocode", "POST", body);
    }
    resource function get locations/recent() returns json|error {
        return wrapJson(locationClient, "/locations/recent");
    }

    // Analytics
    resource function get analytics/summary() returns json|error {
        return wrapJson(analyticsClient, "/analytics/summary");
    }

    resource function get metrics() returns string {
        return string `gateway_proxy_requests_total ${proxyRequestCount}\n` +
            string `gateway_proxy_errors_total ${proxyErrorCount}`;
    }
}
