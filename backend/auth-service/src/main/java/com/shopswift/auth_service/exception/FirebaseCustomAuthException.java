package com.shopswift.auth_service.exception;

public class FirebaseCustomAuthException extends Exception {
    private String message;

    public FirebaseCustomAuthException(String message) {
        super(message);
        this.message = message;
    }

    @Override
    public String getMessage() {
        return this.message;
    }
}
