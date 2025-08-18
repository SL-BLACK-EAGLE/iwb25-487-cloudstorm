import ballerina/http;
import ballerina/log;

listener http:Listener volunteerListener = new (8084);

type Volunteer record {|
    string id;
    string[] skills?;
|};

Volunteer[] volunteers = [];

service /volunteers on volunteerListener {
    resource function post .(@http:Payload Volunteer v) returns Volunteer|error {
        volunteers = [...volunteers, v];
        log:printInfo("Volunteer added: " + v.id);
        return v;
    }

    resource function get .() returns Volunteer[] {
        return volunteers;
    }
}
