package com.example.reviewsservice.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class UserValidationDTO {
    private Long id;
    private String password;

}

