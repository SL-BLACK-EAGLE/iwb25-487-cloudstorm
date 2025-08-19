import ballerina/crypto;
import ballerina/time;

// Simplified token (NOT spec-compliant JWT): payload=userId:exp, signature=SHA256(payload+secret)
// token = payload + "." + hex(signature)

public function sign(string userId, string secret, int ttlSeconds = 3600) returns string {
    time:Utc now = time:utcNow();
    int nowSec = now[0];
    int exp = nowSec + ttlSeconds;
    string payload = userId + ":" + exp.toString();
    byte[] digest = crypto:hashSha256((payload + secret).toBytes());
    string sig = digest.toBase16();
    return payload + "." + sig;
}

public function verify(string token, string secret) returns string|error {
    int? dot = token.indexOf(".");
    if dot is () { return error("invalid_token"); }
    int d = dot;
    string payload = token.substring(0, d);
    string sig = token.substring(d + 1);
    byte[] expected = crypto:hashSha256((payload + secret).toBytes());
    if sig != expected.toBase16() { return error("invalid_signature"); }
    int? colon = payload.indexOf(":");
    if colon is () { return error("invalid_payload"); }
    int c = colon;
    string userId = payload.substring(0, c);
    string expStr = payload.substring(c + 1);
    int exp = check int:fromString(expStr);
    time:Utc now = time:utcNow();
    int nowSec = now[0];
    if nowSec > exp { return error("expired"); }
    return userId;
}
