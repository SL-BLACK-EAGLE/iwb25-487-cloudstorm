import ballerina/http;
import ballerina/uuid;

listener http:Listener locationListener = new (8087);

type GeocodeResult record {|
    string id;
    string address;
    decimal lat;
    decimal lng;
|};

GeocodeResult[] cache = [];

// Unified error + metrics
type ErrorResp record {| string code; string message; string? fieldName; |};
function err(string code, string message, string? fieldName = ()) returns ErrorResp { return { code, message, fieldName }; }
int geocodeCount = 0;

service /locations on locationListener {
    resource function get health() returns json { return { status: "ok" }; }

    resource function post geocode(@http:Payload record {| string address; |} body) returns GeocodeResult|ErrorResp {
        if body.address.trim().length() == 0 { return err("invalid_input", "Address required", "address"); }
        // Simple deterministic fake coordinates based on manual hash
        int h = 0;
        int len = body.address.length();
        int i = 0;
        while i < len {
            string ch = body.address.substring(i, i + 1);
            int code = ch.toBytes()[0];
            h = (h * 31 + code) & 0x7fffffff;
            i += 1;
        }
        decimal lat = <decimal>((h % 18000) / 100) - 90; // -90..+90
        decimal lng = <decimal>(((h / 100) % 36000) / 100) - 180; // -180..+180
        GeocodeResult g = { id: uuid:createType1AsString(), address: body.address, lat, lng };
        cache = [...cache, g];
        geocodeCount = geocodeCount + 1;
        return g;
    }

    resource function get recent() returns GeocodeResult[] { return cache; }

    resource function get metrics() returns string {
        return string `location_geocode_total ${geocodeCount}`;
    }
}
