package com.linkshortener.exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(InvalidUrlException.class)
    public ResponseEntity<String> handleInvalidUrl(InvalidUrlException ex) {

        // ex.getMessage() retrieves the string you passed in Step 1
        return new ResponseEntity<>(ex.getMessage() , HttpStatus.BAD_REQUEST);
    }

}
