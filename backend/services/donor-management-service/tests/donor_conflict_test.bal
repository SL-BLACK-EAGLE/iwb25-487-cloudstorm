import ballerina/test;
import ballerina/http;
import ballerina/uuid;

final string BASE = "http://localhost:8083/donors";

@test:Config {}
function testDuplicateEmailConflict() returns error? {
    http:Client c = check new (BASE);
    string email = "donor_" + uuid:createType1AsString() + "@ex.com";
    json body = { name: "First Donor", email, categories: ["food"] };
    json first = check c->post("/", body);
    test:assertEquals((<map<anydata>>first)["email"].toString(), email);
    json second = check c->post("/", body);
    test:assertEquals((<map<anydata>>second)["code"].toString(), "email_conflict");
}
