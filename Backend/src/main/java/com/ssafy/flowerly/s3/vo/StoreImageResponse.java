package com.ssafy.flowerly.s3.vo;

import com.ssafy.flowerly.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
public class StoreImageResponse {
    private Long storeImageId;
    private Long sellerId;
    private String imageUrl;
}
