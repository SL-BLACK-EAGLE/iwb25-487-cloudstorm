import ballerina/http;

listener http:Listener gatewayListener = new (8080);

http:Client authClient = check new ("http://auth-service:8081");
http:Client aidClient = check new ("http://aid-request-service:8082");
http:Client donorClient = check new ("http://donor-management-service:8083");
http:Client volunteerClient = check new ("http://volunteer-coordination-service:8084");

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

    // Donor proxy
    resource function post donors(@http:Payload json body) returns json|error {
        http:Response resp = check donorClient->post("/donors", body);
        return check resp.getJsonPayload();
    }

    resource function get donors() returns json|error {
        http:Response resp = check donorClient->get("/donors");
        return check resp.getJsonPayload();
    }

    resource function get donors/[string id]() returns json|error {
        http:Response resp = check donorClient->get(string `/donors/${id}`);
        return check resp.getJsonPayload();
    }

    resource function post donors/[string id]/donations(@http:Payload json body) returns json|error {
        http:Response resp = check donorClient->post(string `/donors/${id}/donations`, body);
        return check resp.getJsonPayload();
    }

    resource function get donors/[string id]/history() returns json|error {
        http:Response resp = check donorClient->get(string `/donors/${id}/history`);
        return check resp.getJsonPayload();
    }

    resource function put donors/[string id]/categories(@http:Payload json body) returns json|error|http:Response {
        http:Response resp = check donorClient->put(string `/donors/${id}/categories`, body);
        if resp.statusCode == 409 { return resp; }
        return check resp.getJsonPayload();
    }

    // Volunteer & tasks proxy
    resource function post volunteers(@http:Payload json body) returns json|error {
        http:Response resp = check volunteerClient->post("/volunteers", body);
        return check resp.getJsonPayload();
    }

    resource function get volunteers() returns json|error {
        http:Response resp = check volunteerClient->get("/volunteers");
        return check resp.getJsonPayload();
    }

    resource function post volunteers/tasks(@http:Payload json body) returns json|error {
        http:Response resp = check volunteerClient->post("/volunteers/tasks", body);
        return check resp.getJsonPayload();
    }

    resource function get volunteers/tasks() returns json|error {
        http:Response resp = check volunteerClient->get("/volunteers/tasks");
        return check resp.getJsonPayload();
    }

    resource function post volunteers/tasks/assign/[string taskId]() returns json|error {
        http:Response resp = check volunteerClient->post(string `/volunteers/tasks/assign/${taskId}`, {});
        return check resp.getJsonPayload();
    }
}
