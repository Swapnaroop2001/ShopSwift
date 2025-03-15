package com.shopswift.auth_service.service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import com.shopswift.auth_service.dto.LoginRequest;
import com.shopswift.auth_service.dto.SignUpRequest;
import com.shopswift.auth_service.exception.*;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    public String signUp(SignUpRequest request) throws FirebaseCustomAuthException {
        try {
            UserRecord.CreateRequest createRequest = new UserRecord.CreateRequest()
                    .setEmail(request.email())
                    .setPassword(request.password());

            UserRecord userRecord = FirebaseAuth.getInstance().createUser(createRequest);
            return userRecord.getUid();
        } catch (FirebaseAuthException e) {
            throw new FirebaseCustomAuthException("Error creating user: " + e.getMessage());
        }
    }

    public String login(LoginRequest request) throws FirebaseCustomAuthException {
        try {
            UserRecord userRecord = FirebaseAuth.getInstance().getUserByEmail(request.email());
            // In a real implementation, you would verify the password here
            return userRecord.getUid();
        } catch (FirebaseAuthException e) {
            throw new FirebaseCustomAuthException("Authentication failed: " + e.getMessage());
        }
    }
}
