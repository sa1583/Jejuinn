package com.jejuinn.backend.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NO_CONTENT)
public class NoContentException extends RuntimeException {
    public NoContentException() {
        super();
    }
    public NoContentException(String message, Throwable cause) {
        super(message, cause);
    }

    public NoContentException(String message) {
        super(message);
    }
    public NoContentException(Throwable cause) {
        super(cause);
    }
}
