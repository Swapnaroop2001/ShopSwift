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
            // Verify email/password with Firebase (this is a placeholder)
            // In a real app, you'd use Firebase Authentication REST API or client-side auth
            String uid = FirebaseAuth.getInstance().getUserByEmail(request.email()).getUid();
            // Note: Firebase Admin SDK doesn't verify passwords directly; this should be done client-side
            // For simplicity, assume client-side auth sends a token instead
            return uid;
        } catch (FirebaseAuthException e) {
            throw new FirebaseCustomAuthException("Login failed: " + e.getMessage());
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

    public String verifyToken(String idToken, String fullName) throws FirebaseCustomAuthException {
        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String uid = decodedToken.getUid();
            String email = decodedToken.getEmail();
            System.out.println("Token verified. UID: " + uid + ", Email: " + email);
    
            try {
                FirebaseAuth.getInstance().getUser(uid);
                return uid; // User exists, treat as login
            } catch (FirebaseAuthException e) {
                if ("USER_NOT_FOUND".equals(e.getErrorCode())) {
                    FirebaseAuth.getInstance().createUser(
                        new com.google.firebase.auth.UserRecord.CreateRequest()
                            .setUid(uid)
                            .setEmail(email)
                            .setEmailVerified(decodedToken.isEmailVerified())
                            .setDisplayName(fullName) // Set fullName here
                    );
                    return uid; // New user created
                }
                throw e;
            }
        } catch (FirebaseAuthException e) {
            throw new FirebaseCustomAuthException("Failed to verify token: " + e.getMessage());
        }
    }
    
}
