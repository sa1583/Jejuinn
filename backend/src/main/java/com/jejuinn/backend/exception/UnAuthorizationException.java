package com.jejuinn.backend.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class UnAuthorizationException extends RuntimeException {
    public UnAuthorizationException() {
        super();
    }
    public UnAuthorizationException(String message, Throwable cause) {
        super(message, cause);
    }

    public UnAuthorizationException(String message) {
        super(message);
    }
    public UnAuthorizationException(Throwable cause) {
        super(cause);
    }
}
