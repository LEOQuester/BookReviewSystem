package com.example.userservice.response;

import lombok.Data;

@Data
public class RegisterResponse {

    private String message;
    private boolean status;
    // Default constructor
    public RegisterResponse() {
    }
    public RegisterResponse(String message, boolean status) {
        this.message = message;
        this.status = status;
    }
}
