package com.example.booksservice.controller;

import com.example.booksservice.data.Book;
import com.example.booksservice.response.BookResponse;
import com.example.booksservice.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/books")
@CrossOrigin
public class BookController {

    @Autowired
    private BookService bookService;
    @GetMapping
    public List<BookResponse> getAllBooks(){
        return bookService.getAllBooks();
    }
    @PostMapping
    public String addBook(@RequestParam("image") MultipartFile image, @ModelAttribute Book book) {
        return bookService.createBook(image, book);
    }
    @GetMapping(path = "/{id}")
    public Optional<BookResponse> getBookById(@PathVariable Long id){
        return bookService.getBookById(id);
    }

}
