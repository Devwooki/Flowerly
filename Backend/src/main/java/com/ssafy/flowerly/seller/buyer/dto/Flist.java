package com.ssafy.flowerly.seller.buyer.dto;

import com.ssafy.flowerly.member.vo.StoreInfoDto;
import com.ssafy.flowerly.seller.vo.RequestFllyParticipateDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class Flist {
    FllyParticipateResponseDto participant;
    StoreInfoDto storeInfoDto;
}
