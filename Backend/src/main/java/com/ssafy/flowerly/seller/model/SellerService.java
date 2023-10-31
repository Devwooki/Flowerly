package com.ssafy.flowerly.seller.model;


import com.ssafy.flowerly.entity.Flly;
import com.ssafy.flowerly.entity.FlowerMeaning;
import com.ssafy.flowerly.seller.vo.FllyRequestDto;
import com.ssafy.flowerly.seller.vo.FlowerMeaningDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SellerService {

    private final FllyRepository fellyRepository;
    private final FlowerMeaningRepository flowerMeaningRepository;


    public FllyRequestDto getRequestLetter(long fllyId) {

        Flly fllyInfo = fellyRepository.findByFllyId(fllyId).orElseThrow();
        FllyRequestDto fllyRequestDto = fllyInfo.toFllyRequestDto();
        if(fllyInfo.getFlower1() != null){
            List<FlowerMeaningDto> flowerMeain1 = flowerMeaningRepository
                    .findByFlowerFlowerCode(fllyInfo.getFlower1().getFlowerCode())
                    .stream().map(FlowerMeaning::toFlowerMeaningDto).collect(Collectors.toList());
            fllyRequestDto.setFlower1(fllyInfo.getFlower1().toFlowerSimpleInfoDto(flowerMeain1));
        }
        if(fllyInfo.getFlower2() != null){
            List<FlowerMeaningDto> flowerMeain2 = flowerMeaningRepository
                    .findByFlowerFlowerCode(fllyInfo.getFlower2().getFlowerCode())
                    .stream().map(FlowerMeaning::toFlowerMeaningDto).collect(Collectors.toList());

            fllyRequestDto.setFlower2(fllyInfo.getFlower2().toFlowerSimpleInfoDto(flowerMeain2));
        }
        if(fllyInfo.getFlower3() != null){
            List<FlowerMeaningDto> flowerMeain3 = flowerMeaningRepository
                    .findByFlowerFlowerCode(fllyInfo.getFlower3().getFlowerCode())
                    .stream().map(FlowerMeaning::toFlowerMeaningDto).collect(Collectors.toList());
            fllyRequestDto.setFlower3(fllyInfo.getFlower3().toFlowerSimpleInfoDto(flowerMeain3));
        }

        return fllyRequestDto;
    }
}
