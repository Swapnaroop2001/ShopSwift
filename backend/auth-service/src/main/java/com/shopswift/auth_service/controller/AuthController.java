package com.shopswift.auth_service.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.shopswift.auth_service.dto.LoginRequest;
import com.shopswift.auth_service.dto.SignUpRequest;
import com.shopswift.auth_service.exception.FirebaseCustomAuthException;
import com.shopswift.auth_service.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequest request) {
        try {
            String userId = authService.signUp(request);
            return ResponseEntity.ok("User created successfully with ID: " + userId);
        } catch (FirebaseCustomAuthException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Something went wrong. Please try again.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            if (request.token() == null || request.token().isBlank()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Token is required.");
            }
            String userId = authService.verifyToken(request.token(), request.fullName());
            return ResponseEntity.ok("User authenticated successfully with ID: " + userId);
        } catch (FirebaseCustomAuthException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Something went wrong. Please try again.");
        }
    }

    // New endpoint for forgot password
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        System.out.println("Received forgot password request for email: " + request.getEmail());
        try {
            authService.sendPasswordResetEmail(request.getEmail());
            return ResponseEntity.ok("Password reset email sent successfully.");
        } catch (FirebaseCustomAuthException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to send reset email. Please try again.");
        }
    }

}

class ForgotPasswordRequest {
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

// class LoginRequest {
//     private String email;
//     private String password;
//     private String token; // For Google login

//     public String getEmail() { return email; }
//     public void setEmail(String email) { this.email = email; }
//     public String getPassword() { return password; }
//     public void setPassword(String password) { this.password = password; }
//     public String getToken() { return token; }
//     public void setToken(String token) { this.token = token; }
// }