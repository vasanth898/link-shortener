package com.linkshortener.exception;

public class InvalidUrlException extends RuntimeException {

    public InvalidUrlException() {
    }

    public InvalidUrlException(String message) {
        super(message);
    }

}
