package com.ssafy.flowerly.address.service;


import com.ssafy.flowerly.address.repository.SidoRepository;
import com.ssafy.flowerly.address.repository.SigunguRepository;
import com.ssafy.flowerly.entity.Sido;
import com.ssafy.flowerly.seller.model.DongRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class AddressService {

    private final SidoRepository sidoRspository ;
    private final SigunguRepository sigunguRspository;
    private final DongRepository dongRspository;
    public List<Sido> getSido() {
        return sidoRspository.findAll();
    }

    public List<Sido> getSigungu(Long sidoCode) {
        return sigunguRspository.findBySidoCode(sidoCode);
    }
}
