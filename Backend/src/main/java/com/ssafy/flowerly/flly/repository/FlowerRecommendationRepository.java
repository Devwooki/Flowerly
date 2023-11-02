package com.ssafy.flowerly.flly.repository;

import com.ssafy.flowerly.entity.FlowerRecommendation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlowerRecommendationRepository extends JpaRepository<FlowerRecommendation, Long> {
}
