public type ErrorResp record {| string code; string message; string? fieldName; |};

// Backward compatible alias
public type ErrorPayload ErrorResp;

public function err(string code, string message, string? fieldName = ()) returns ErrorResp {
    return { code, message, fieldName };
}
