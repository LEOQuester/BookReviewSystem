package com.example.reviewsservice.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@NoArgsConstructor
@Data
public class ReviewUpdateDTO {
    private Long id;
    private Long userId;
    private String password;
    private String description;
    @Temporal(TemporalType.TIMESTAMP) // Use appropriate TemporalType for dateAndTime
    private Date dateAndTime;
}
