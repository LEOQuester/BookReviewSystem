package com.example.userservice.dto;

import lombok.Data;

@Data
public class UserDTO {
    private String email;
    private String password;
    // Include other fields as needed
    public UserDTO(String email, String password) {
        this.email = email;
        this.password = password;
        // Initialize other fields here if necessary
    }
}
