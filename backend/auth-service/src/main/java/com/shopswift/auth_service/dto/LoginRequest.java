package com.shopswift.auth_service.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
    String email,      // Optional for Google login, required for email/password
    String password,   // Optional for Google login, required for email/password
    String token,       // Optional for email/password, required for Google login
    String fullName
) {
    // Custom validation can be added if needed, but @NotBlank is removed from token
    // to allow flexibility for email/password login
}