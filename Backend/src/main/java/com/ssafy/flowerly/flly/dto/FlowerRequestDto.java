package com.ssafy.flowerly.flly.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FlowerRequestDto {
    private String situation;
    private String target;
    private List<String> colors = new ArrayList<>();
}
