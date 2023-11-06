package com.ssafy.flowerly.flly.service;

import com.ssafy.flowerly.entity.StoreInfo;
import com.ssafy.flowerly.member.model.StoreInfoRepository;
import com.ssafy.flowerly.member.vo.StoreInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FllyService {
    private final StoreInfoRepository storeInfoRepository;

    public StoreInfoDto getStoreInfo(Long storeId){
        return storeInfoRepository.findById(storeId)
                .map(StoreInfo::toDto)
                .orElseThrow();
    }



}
