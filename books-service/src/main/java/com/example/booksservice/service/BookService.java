package com.example.booksservice.service;

import com.example.booksservice.dto.UserDTO;
import com.example.booksservice.repo.BookRepo;
import com.example.booksservice.data.Book;
import com.example.booksservice.response.BookResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookService {

    @Autowired
    private BookRepo bookRepo;

    public List<BookResponse> getAllBooks() {
        List<Book> books = bookRepo.findAll();
        return books.stream()
                .map(this::mapToBookResponse)
                .collect(Collectors.toList());
    }

    public String createBook(MultipartFile image, Book book) {
        // Handle image upload
        String fileName = image.getOriginalFilename();
        String uploadDir = "./uploads";
        String filePath = uploadDir + fileName;

        try {
            // Save the image to the specified directory
            Files.copy(image.getInputStream(), Paths.get(uploadDir, fileName), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to upload image";
        }

        book.setBookImagePath(filePath);

        bookRepo.save(book);
        return "Book Added Successfully";
    }
    private BookResponse mapToBookResponse(Book book) {
        Long userId = book.getUserId();
        String apiUrl = "http://localhost:8081/users/" + userId;

        // Create a RestTemplate
        RestTemplate restTemplate = new RestTemplate();

        // Make a GET request to the user API
        UserDTO userDTO = restTemplate.getForObject(apiUrl, UserDTO.class, userId);

        BookResponse bookResponse = new BookResponse();
        bookResponse.setId(book.getId());
        bookResponse.setBookName(book.getBookName());
        bookResponse.setBookAuthor(book.getBookAuthor());
        bookResponse.setBookDescription(book.getBookDescription());
        bookResponse.setBookPrice(book.getBookPrice());
        bookResponse.setBookImagePath(book.getBookImagePath());

        if (userDTO != null) {
            bookResponse.setUserName(userDTO.getUserName());
            bookResponse.setUserEmail(userDTO.getEmail());
        } else {
            bookResponse.setUserName("User Not Found");
            bookResponse.setUserEmail("User Email Not Found");
        }
        return bookResponse;
    }
}
