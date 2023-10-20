package com.example.reviewsservice.service;

import com.example.reviewsservice.data.Review;
import com.example.reviewsservice.dto.ReviewDeleteDTO;
import com.example.reviewsservice.dto.ReviewUpdateDTO;
import com.example.reviewsservice.dto.UserValidationDTO;
import com.example.reviewsservice.dto. UserValidationResponseDTO;
import com.example.reviewsservice.repo.ReviewRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.util.Objects;

@Service
public class ReviewService {
    String validateUrl = "http://localhost:8081/users/validate";
    private final ReviewRepo reviewRepo;

    @Autowired
    public ReviewService(ReviewRepo reviewRepo) {
        this.reviewRepo = reviewRepo;
    }

    // Create a new review
    public Review createReview(Review review) {
        return reviewRepo.save(review);
    }

    // Retrieve a review by its ID
    public List<Review> getReviewsByBookId(Long bookId) {
        return reviewRepo.findByBookId(bookId);
    }

    // Retrieve all reviews
    public List<Review> getAllReviews() {
        return reviewRepo.findAll();
    }

    // Delete a review
    public String deleteReview(ReviewDeleteDTO reviewDeleteDTO) {
        Review review = reviewRepo.findById(reviewDeleteDTO.getId()).orElse(null);

        if (review == null) {
            return "Review not found"; // Handle the case where the review doesn't exist
        }
        if (!Objects.equals(review.getUserId(), reviewDeleteDTO.getUserId())){
            return "User Not Authorized to Delete this review";
        }

        RestTemplate restTemplate = new RestTemplate();

        // Step 1: Create a Request Body for User Validation
        UserValidationDTO userValidationDTO = new UserValidationDTO();
        userValidationDTO.setId(reviewDeleteDTO.getUserId());
        userValidationDTO.setPassword(reviewDeleteDTO.getPassword());

        // Step 2: Send a Request to Validate the User using postForObject
        UserValidationResponseDTO userValidationResponse = restTemplate.postForObject(validateUrl, userValidationDTO, UserValidationResponseDTO.class);

        // Step 3: Check the Validation Result
        if (userValidationResponse != null && userValidationResponse.getStatus()) {
            // User is validated, proceed to delete the review
            reviewRepo.deleteById(reviewDeleteDTO.getId());
            return "review deleted successfully";
        } else {
            // User validation failed, handle the error or provide an appropriate response
            return "user validation failed";
        }
    }
    public Review updateReview(ReviewUpdateDTO reviewUpdateDTO) {
        Review review = reviewRepo.findById(reviewUpdateDTO.getId()).orElse(null);

        if (review == null) {
            return null; // Handle the case where the review doesn't exist
        }
        if (!Objects.equals(review.getUserId(), reviewUpdateDTO.getUserId())){
            return null;
        }

        RestTemplate restTemplate = new RestTemplate();

        // Step 1: Create a Request Body for User Validation
        UserValidationDTO userValidationDTO = new UserValidationDTO();
        userValidationDTO.setId(reviewUpdateDTO.getUserId());
        userValidationDTO.setPassword(reviewUpdateDTO.getPassword());

        // Step 2: Send a Request to Validate the User using postForObject
        UserValidationResponseDTO userValidationResponse = restTemplate.postForObject(validateUrl, userValidationDTO, UserValidationResponseDTO.class);

        // Step 3: Check the Validation Result
        if (userValidationResponse != null && userValidationResponse.getStatus()) {
            // User is validated, proceed to delete the review
            Review updateReview = new Review();
            updateReview.setId(reviewUpdateDTO.getId());
            updateReview.setDescription(reviewUpdateDTO.getDescription());
            updateReview.setBookId(review.getBookId());
            updateReview.setUserId(review.getUserId());
            updateReview.setDateAndTime(reviewUpdateDTO.getDateAndTime());
            return reviewRepo.save(updateReview);
        } else {
            // User validation failed,
            return null;
        }
    }
}
