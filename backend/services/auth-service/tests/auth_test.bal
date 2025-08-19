import ballerina/test;
import ballerina/http;
import ballerina/uuid;

final string BASE = "http://localhost:8081/auth";

@test:Config {}
function testRegisterLoginProfile() returns error? {
    http:Client c = check new (BASE);
    string email = "user_" + uuid:createType1AsString() + "@ex.com";
    json reg = { email, password: "pass123", role: "victim" };
    json regResp = check c->post("/register", reg);
    test:assertTrue(regResp is json);
    string token = <string>(<map<anydata>>regResp)["token"];
    json loginResp = check c->post("/login", { email, password: "pass123" });
    test:assertTrue(loginResp is json);
    map<string|string[]> headers = { authorization: "Bearer " + token };
    json profile = check c->get("/profile", headers);
    test:assertTrue(profile is json);
}
