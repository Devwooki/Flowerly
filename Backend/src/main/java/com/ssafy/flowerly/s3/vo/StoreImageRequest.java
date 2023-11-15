package com.ssafy.flowerly.s3.vo;

import com.ssafy.flowerly.entity.Member;
import com.ssafy.flowerly.entity.StoreImage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StoreImageRequest {
    private Long storeImageId;
    private Long seller;
    private String imageUrl;


    public StoreImage toEntity(Member member){
        return StoreImage.builder()
                .seller(member)
                .imageUrl(this.imageUrl)
                .build();
    }
}
