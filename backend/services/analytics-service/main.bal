import ballerina/http;

listener http:Listener analyticsListener = new (8088);

service /analytics on analyticsListener {
    resource function get health() returns json {
        return { status: "ok" };
    }
}
