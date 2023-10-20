package com.example.reviewsservice.controller;

import com.example.reviewsservice.data.Review;
import com.example.reviewsservice.dto.ReviewDeleteDTO;
import com.example.reviewsservice.dto.ReviewUpdateDTO;
import com.example.reviewsservice.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@CrossOrigin
public class ReviewController {
    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public Review createReview(@RequestBody Review review) {
        return reviewService.createReview(review);
    }

    @GetMapping("/{bookId}")
    public List<Review> getReviewsByBookId(@PathVariable Long bookId) {
        return reviewService.getReviewsByBookId(bookId);
    }


    @GetMapping
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @PutMapping
    public Review updateReview(@RequestBody ReviewUpdateDTO reviewUpdateDTO) {
        return reviewService.updateReview(reviewUpdateDTO);
    }

    @DeleteMapping
    public String deleteReview(@RequestBody ReviewDeleteDTO reviewDeleteDTO) {
        return reviewService.deleteReview(reviewDeleteDTO);
    }

}
