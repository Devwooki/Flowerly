package com.ssafy.flowerly.buyer.dto;

import com.ssafy.flowerly.member.vo.StoreInfoDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Flist {
    FllyParticipateResponseDto participant;
    StoreInfoDto storeInfoDto;
}
