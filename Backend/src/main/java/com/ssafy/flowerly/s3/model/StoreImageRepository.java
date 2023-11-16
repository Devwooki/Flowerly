package com.ssafy.flowerly.s3.model;

import com.ssafy.flowerly.entity.StoreImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoreImageRepository extends JpaRepository<StoreImage, Long> {
    List<StoreImage> findBySeller_MemberId(Long memberId);


    StoreImage findByStoreImageId(Long StoreImageId);
}
