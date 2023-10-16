package com.example.booksservice.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BookResponse {
    private Long id;
    private String bookName;
    private String bookAuthor;
    private String bookDescription;
    private double bookPrice;
    private byte[] bookImage;
    private String userName;
    private String userEmail;

}
