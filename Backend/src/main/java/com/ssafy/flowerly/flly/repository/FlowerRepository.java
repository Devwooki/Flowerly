package com.ssafy.flowerly.flly.repository;

import com.ssafy.flowerly.entity.Flower;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FlowerRepository extends JpaRepository<Flower, Long> {
    @Query("SELECT f FROM Flower f JOIN FlowerRecommendation fr ON f = fr.flower WHERE f.color IN :colors AND fr.situation = :situation AND fr.target = :target")
    List<Flower> findFlowersByColorAndRecommendation(@Param("color") List<String> colors, @Param("situation") String situation, @Param("target") String target);

}
