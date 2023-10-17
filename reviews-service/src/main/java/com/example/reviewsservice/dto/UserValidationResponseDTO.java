package com.example.reviewsservice.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserValidationResponseDTO {
    private Long userId;
    private String message;
    private boolean status;

    public boolean getStatus() {
        return status;
    }

    public UserValidationResponseDTO(Long userId, String message, boolean status) {
        this.userId = userId;
        this.message = message;
        this.status = status;
    }

    // Constructors, getters, and setters
}

