package com.ssafy.flowerly.flly.repository;

import com.ssafy.flowerly.entity.Flower;
import com.ssafy.flowerly.entity.type.ColorType;
import com.ssafy.flowerly.entity.type.SituationType;
import com.ssafy.flowerly.entity.type.TargetType;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FlowerRepository extends JpaRepository<Flower, Long> {
    @Query("SELECT distinct f FROM Flower f JOIN FlowerRecommendation fr ON f = fr.flower WHERE f.color IN :colors AND (fr.situation IN :situation OR fr.situation IS NULL) AND (fr.target IN :target OR fr.target IS NULL)")
    List<Flower> findFlowersByRequest(@Param("colors") List<ColorType> colors, @Param("situation") List<SituationType> situation, @Param("target") List<TargetType> target, Pageable pageable);
    @Query("SELECT distinct f FROM Flower f JOIN FlowerRecommendation fr ON f = fr.flower WHERE f.color IN :colors")
    List<Flower> findFlowersByColor(List<ColorType> colors, Pageable pageable);
    @Query("SELECT distinct f FROM Flower f JOIN FlowerRecommendation fr ON f = fr.flower WHERE (fr.situation IN :situation OR fr.situation IS NULL) OR (fr.target IN :target OR fr.target IS NULL)")
    List<Flower> findFlowersByMeaning(List<SituationType> situation, List<TargetType> target, Pageable pageable);
}
