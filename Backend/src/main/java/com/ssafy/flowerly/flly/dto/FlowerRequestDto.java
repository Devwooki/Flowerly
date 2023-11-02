package com.ssafy.flowerly.flly.dto;

import com.ssafy.flowerly.entity.type.ColorType;
import com.ssafy.flowerly.entity.type.SituationType;
import com.ssafy.flowerly.entity.type.TargetType;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
public class FlowerRequestDto {
    private List<SituationType> situation;
    private List<TargetType> target;
    private List<ColorType> colors = new ArrayList<>();
}
