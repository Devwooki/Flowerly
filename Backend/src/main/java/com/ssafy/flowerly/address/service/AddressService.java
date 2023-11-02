package com.ssafy.flowerly.address.service;


import com.ssafy.flowerly.address.repository.SidoRepository;
import com.ssafy.flowerly.entity.Dong;
import com.ssafy.flowerly.entity.Sido;
import com.ssafy.flowerly.entity.Sigungu;
import com.ssafy.flowerly.address.repository.DongRepository;
import com.ssafy.flowerly.address.repository.SigunguRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    public Page<Sigungu> getSigunguByCode(Pageable pageable, Long sidoCode) {
        return sigunguRspository.findSigungusBySido_SidoCode(pageable, sidoCode).orElseThrow(() -> new IllegalArgumentException("잘못된 입력값 입니다."));
    }

    public Page<Dong> getDongsByCode(Pageable pageable, Long sigunguCode) {
        return dongRspository.findDongsBySigunguSigunguCode(pageable, sigunguCode).orElseThrow(() -> new IllegalArgumentException("잘못된 입력값 입니다."));
    }
}
