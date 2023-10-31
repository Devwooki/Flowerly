package com.ssafy.flowerly.seller.vo;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ParticipationRequestDto {

    FllyRequestDto fllyRequestDto;
    FllyResponeDto fllyResponeDto;

}
