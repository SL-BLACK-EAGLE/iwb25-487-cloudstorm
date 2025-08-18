import ballerina/http;
import ballerina/log;
import ballerina/uuid;

listener http:Listener volunteerListener = new (8084);

type Volunteer record {|
    string id;
    string name;
    string[] skills;
    boolean available;
|};

type Task record {|
    string id;
    string title;
    string description?;
    string? volunteerId;
    string status;
|};

Volunteer[] volunteerList = [];
Task[] taskList = [];

service /volunteers on volunteerListener {
    resource function post .(@http:Payload record {|string name; string[] skills?;|} body) returns Volunteer {
    Volunteer v = { id: uuid:createType1AsString(), name: body.name, skills: body.skills ?: [], available: true };
    volunteerList = [...volunteerList, v];
        log:printInfo("Volunteer added: " + v.id);
        return v;
    }

    resource function get .() returns Volunteer[] { return volunteerList; }

    resource function post tasks(@http:Payload record {|string title; string? description;|} body) returns Task {
    Task t = { id: uuid:createType1AsString(), title: body.title, description: body.description, volunteerId: (), status: "pending" };
    taskList = [...taskList, t];
        return t;
    }

    resource function get tasks() returns Task[] { return taskList; }

    resource function post tasks/assign/[string taskId]() returns json {
    foreach int i in 0 ..< taskList.length() {
            if taskList[i].id == taskId && taskList[i].status == "pending" {
        foreach int j in 0 ..< volunteerList.length() {
                    if volunteerList[j].available {
                        taskList[i].volunteerId = volunteerList[j].id;
                        taskList[i].status = "assigned";
                        volunteerList[j].available = false;
                        return { "assigned": true, "task": taskList[i] };
                    }
                }
                return { "assigned": false, "reason": "no_available_volunteer" };
            }
        }
        return { "error": "task_not_found" };
    }
}
