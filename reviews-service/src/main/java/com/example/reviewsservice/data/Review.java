package com.example.reviewsservice.data;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@NoArgsConstructor
@Data
@Table // You can specify the table name if needed
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String description;
    private Long userId;
    private Long bookId;

    @Temporal(TemporalType.TIMESTAMP) // Use appropriate TemporalType for dateAndTime
    private Date dateAndTime;
}
