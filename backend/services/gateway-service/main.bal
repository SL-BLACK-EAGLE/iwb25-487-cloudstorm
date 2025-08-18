import ballerina/http;

listener http:Listener gatewayListener = new (8080);

http:Client authClient = check new ("http://auth-service:8081");
http:Client aidClient = check new ("http://aid-request-service:8082");

service / on gatewayListener {
    resource function get health() returns json {
        return { status: "ok" };
    }

    resource function post auth/login(@http:Payload json body) returns json|error {
        http:Response resp = check authClient->post("/auth/login", body);
        return check resp.getJsonPayload();
    }

    resource function post auth/register(@http:Payload json body) returns json|error {
        http:Response resp = check authClient->post("/auth/register", body);
        return check resp.getJsonPayload();
    }

    resource function get auth/profile(@http:Header string authorization) returns json|error {
        map<string|string[]> headers = { authorization }; // single header
        http:Response resp = check authClient->get("/auth/profile", headers);
        return check resp.getJsonPayload();
    }

    resource function get aid/requests() returns json|error {
        http:Response resp = check aidClient->get("/aid_requests");
        return check resp.getJsonPayload();
    }

    resource function post aid/requests(@http:Header string authorization, @http:Payload json body) returns json|error {
        map<string|string[]> headers = { authorization };
        http:Response resp = check aidClient->post("/aid_requests", body, headers);
        return check resp.getJsonPayload();
    }
}
