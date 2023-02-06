package com.jejuinn.backend.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class DuplicateDataException extends RuntimeException {
    public DuplicateDataException() {
        super();
    }
    public DuplicateDataException(String message, Throwable cause) {
        super(message, cause);
    }

    public DuplicateDataException(String message) {
        super(message);
    }
    public DuplicateDataException(Throwable cause) {
        super(cause);
    }
}
