package com.shopswift.auth_service.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(

        @NotBlank(message = "Token is required")
        String token

) {}
