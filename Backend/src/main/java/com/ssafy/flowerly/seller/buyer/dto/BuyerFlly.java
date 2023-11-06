package com.ssafy.flowerly.seller.buyer.dto;

import com.ssafy.flowerly.member.vo.StoreInfoDto;
import com.ssafy.flowerly.seller.vo.FllyRequestDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
public class BuyerFlly {
    FllyRequestDto flly;
    Page<Flist> stores;
}
