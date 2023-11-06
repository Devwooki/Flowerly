package com.ssafy.flowerly.review.repository;

import com.ssafy.flowerly.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepostiroy  extends JpaRepository<Review, Long> {
}
