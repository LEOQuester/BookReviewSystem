package com.example.reviewsservice.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class ReviewDeleteDTO {
    private Long id;
    private Long userId;
    private String password;
}
