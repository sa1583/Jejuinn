package com.jejuinn.backend.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpStatusCodeException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleException(Exception ex) {
        HttpStatus status = getStatus(ex);
        HttpHeaders headers = new HttpHeaders();
        log.info("Handler activate !!!!!");
        headers.add("Access-Control-Allow-Origin", "*");
        return new ResponseEntity<>(ex, headers, status);
    }

    private HttpStatus getStatus(Exception ex) {
        if (ex instanceof HttpStatusCodeException) {
            return ((HttpStatusCodeException) ex).getStatusCode();
        }
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
}
