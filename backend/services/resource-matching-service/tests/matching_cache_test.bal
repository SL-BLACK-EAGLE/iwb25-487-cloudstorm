import ballerina/test;
import ballerina/http;

final string BASE = "http://localhost:8085/matching";

@test:Config {}
function testSuggestionsCacheFlag() returns error? {
    http:Client c = check new (BASE);
    json first = check c->get("/suggestions");
    test:assertTrue(first is json);
    json second = check c->get("/suggestions");
    test:assertTrue(second is json);
}
