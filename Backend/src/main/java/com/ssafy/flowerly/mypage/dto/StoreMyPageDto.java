package com.ssafy.flowerly.mypage.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoreMyPageDto {
    private String storeName;
    private List<String> imageUrl;
}
