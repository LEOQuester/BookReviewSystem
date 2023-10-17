package com.example.reviewsservice.repo;

import com.example.reviewsservice.data.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepo extends JpaRepository<Review, Long> {
    // You can add custom query methods here if needed
    List<Review> findByBookId(Long bookId);
}
