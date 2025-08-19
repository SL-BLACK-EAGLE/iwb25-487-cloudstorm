public type ErrorPayload record {| string code; string message; string? field; |};

public function errorPayload(string code, string message, string? field = ()) returns ErrorPayload {
    return { code: code, message: message, field: field };
}
