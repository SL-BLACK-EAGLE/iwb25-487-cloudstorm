import ballerina/http;

listener http:Listener locationListener = new (8087);

service /locations on locationListener {
    resource function get health() returns json {
        return { status: "ok" };
    }
}
