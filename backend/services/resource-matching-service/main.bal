import ballerina/http;

listener http:Listener matchListener = new (8085);

service /matching on matchListener {
    resource function get health() returns json {
        return { status: "ok" };
    }
}
