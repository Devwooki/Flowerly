package com.ssafy.flowerly.buyer.dto;

import com.ssafy.flowerly.seller.vo.FllyRequestDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

@Setter
@Getter
@AllArgsConstructor
public class BuyerFlly {
    BuyerFllyDto flly;
    Page<Flist> stores;
}
