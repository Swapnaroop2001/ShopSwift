package com.shopswift.auth_service.service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import com.shopswift.auth_service.dto.LoginRequest;
import com.shopswift.auth_service.dto.SignUpRequest;
import com.shopswift.auth_service.exception.FirebaseCustomAuthException;
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
            System.out.println("Firebase Error Code: " + e.getErrorCode());
            System.out.println("Firebase Error Message: " + e.getMessage());

            if ("EMAIL_EXISTS".equals(e.getErrorCode())) {
                throw new FirebaseCustomAuthException("User already exists with this email! Please login.");
            }
            throw new FirebaseCustomAuthException("Error creating user: " + e.getMessage());
        }
    }

    public String login(LoginRequest request) throws FirebaseCustomAuthException {
        try {
            // Verify the Firebase ID token
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(request.token());
            return decodedToken.getUid(); // Return user ID after verifying the token
        } catch (FirebaseAuthException e) {
            throw new FirebaseCustomAuthException("Authentication failed: " + e.getMessage());
        }
    }


    // New method for forgot password
    public void sendPasswordResetEmail(String email) throws FirebaseCustomAuthException {
        try {
            FirebaseAuth.getInstance().generatePasswordResetLink(email);
            // Firebase sends the email automatically
        } catch (FirebaseAuthException e) {
            throw new FirebaseCustomAuthException("Failed to send password reset email: " + e.getMessage());
        }
    }
    
}
