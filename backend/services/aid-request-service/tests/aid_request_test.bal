import ballerina/test;
import ballerina/http;
import ballerinax/postgresql;
import ballerina/uuid;
import ballerina/os;

final string BASE = "http://localhost:8082";

// Reuse environment helper inline (avoid redeclaration clashes with service module)
function localEnv(string k, string d) returns string { string? v = os:getEnv(k); return v ?: d; }

@test:Config {}
function testCreateAidRequest() returns error? {
    postgresql:Client db = check new (host = localEnv("DATABASE_HOST", "localhost"), port = 5432,
        database = localEnv("DATABASE_NAME", "postgres"), username = localEnv("DATABASE_USER", "postgres"),
        password = localEnv("DATABASE_PASSWORD", "password"));
    string userId = uuid:createType1AsString();
    _ = check db->execute(`INSERT INTO users (id,email,password_hash,role) VALUES (CAST(${userId} AS UUID), ${userId}@example.com, 'x', 'victim')`);
    http:Client c = check new (BASE);
    string fakeToken = userId + ".sig";
    json req = { title: "Need water", description: "Bottled water", category: "water", urgency_level: 2 };
    map<string|string[]> headers = { authorization: "Bearer " + fakeToken };
    json created = check c->post("/aid_requests", req, headers);
    test:assertEquals((<map<anydata>>created)["title"].toString(), "Need water");
    json list = check c->get("/aid_requests");
    test:assertTrue(list is json[] && list.length() > 0);
}
