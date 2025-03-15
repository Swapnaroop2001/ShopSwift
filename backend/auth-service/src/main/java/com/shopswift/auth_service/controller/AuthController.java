package com.shopswift.auth_service.controller;

import com.shopswift.auth_service.dto.LoginRequest;
import com.shopswift.auth_service.dto.SignUpRequest;
import com.shopswift.auth_service.exception.FirebaseCustomAuthException;
import com.shopswift.auth_service.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody SignUpRequest request) throws FirebaseCustomAuthException {
        String userId = authService.signUp(request);
        return ResponseEntity.ok("User created successfully with ID: " + userId);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) throws FirebaseCustomAuthException {
        String userId = authService.login(request);
        return ResponseEntity.ok("User authenticated successfully with ID: " + userId);
    }
}
