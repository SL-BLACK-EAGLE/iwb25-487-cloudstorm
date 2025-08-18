import ballerina/http;

listener http:Listener notificationListener = new (8086);

service /notifications on notificationListener {
    resource function get health() returns json {
        return { status: "ok" };
    }
}
