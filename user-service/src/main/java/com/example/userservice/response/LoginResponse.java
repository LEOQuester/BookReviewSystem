package com.example.userservice.response;

import lombok.Data;

@Data
public class LoginResponse {

    private Long userId;
    private String message;
    private boolean status;
    // Default constructor
    public LoginResponse() {
    }
    public LoginResponse(Long userId, String message, boolean status) {
        this.userId = userId;
        this.message = message;
        this.status = status;
    }
}
