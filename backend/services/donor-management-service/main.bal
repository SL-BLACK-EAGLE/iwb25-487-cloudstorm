import ballerina/http;
import ballerina/log;

listener http:Listener donorListener = new (8083);

type Donor record {|
    string id;
    string name;
    string email?;
|};

Donor[] donors = [];

service /donors on donorListener {
    resource function post .(@http:Payload Donor donor) returns Donor|error {
        donors = [...donors, donor];
        log:printInfo("Donor added: " + donor.id);
        return donor;
    }

    resource function get .() returns Donor[] {
        return donors;
    }
}
