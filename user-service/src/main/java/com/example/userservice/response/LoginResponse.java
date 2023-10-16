package com.example.userservice.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginResponse {

    private Long userId;
    private String message;
    private boolean status;

    public LoginResponse(Long userId, String message, boolean status) {
        this.userId = userId;
        this.message = message;
        this.status = status;
    }
}
