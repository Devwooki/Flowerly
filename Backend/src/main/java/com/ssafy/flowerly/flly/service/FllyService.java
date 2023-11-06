package com.ssafy.flowerly.flly.service;

import com.ssafy.flowerly.entity.StoreInfo;
import com.ssafy.flowerly.member.model.StoreInfoRepository;
import com.ssafy.flowerly.member.vo.StoreInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class FllyService {
    private final StoreInfoRepository storeInfoRepository;

    public Map<String, Object> getStoreDetail(Long storeId){
        Map<String, Object> responseData = new HashMap<>();


        return null;

//        return storeInfoRepository.findById(storeId)
//                .map(StoreInfo::toDto)
//                .orElseThrow();
    }



}
