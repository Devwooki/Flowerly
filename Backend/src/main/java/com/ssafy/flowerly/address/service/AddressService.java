package com.ssafy.flowerly.address.service;


import com.ssafy.flowerly.address.repository.SidoRepository;
import com.ssafy.flowerly.entity.Dong;
import com.ssafy.flowerly.entity.Sido;
import com.ssafy.flowerly.entity.Sigungu;
import com.ssafy.flowerly.seller.model.DongRepository;
import com.ssafy.flowerly.seller.model.SigunguRepository;
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

    public List<Sigungu> getSigunguByCode(Long sidoCode) {
        return sigunguRspository.findSigungusBySido_SidoCode(sidoCode);
    }

    public List<Dong> getDongsByCode(Long sigunguCode) {
        return dongRspository.findDongsBySigunguSigunguCode(sigunguCode);
    }
}
