package com.ssafy.flowerly.flly.service;

import com.ssafy.flowerly.entity.Flower;
import com.ssafy.flowerly.entity.type.ColorType;
import com.ssafy.flowerly.entity.type.SituationType;
import com.ssafy.flowerly.entity.type.TargetType;
import com.ssafy.flowerly.flly.dto.FlowerDto;
import com.ssafy.flowerly.flly.dto.FlowerRequestDto;
import com.ssafy.flowerly.flly.repository.FlowerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FlowerService {
    private final FlowerRepository flowerRepository;
    public List<FlowerDto> getFlowerList(FlowerRequestDto flowerRequest) {
        Pageable pageable = PageRequest.of(0, 20);
        if(flowerRequest.getSituation() == null) {
            List<SituationType> temp = new ArrayList<>();
            for(SituationType situationType: SituationType.values()) {
                temp.add(situationType);
            }
            flowerRequest.setSituation(temp);
        }
        if(flowerRequest.getTarget() == null) {
            List<TargetType> temp = new ArrayList<>();
            for(TargetType targetType: TargetType.values()) {
                temp.add(targetType);
            }
            flowerRequest.setTarget(temp);
        }
        if(flowerRequest.getColors() == null) {
            List<ColorType> temp = new ArrayList<>();
            for(ColorType colorType: ColorType.values()) {
                temp.add(colorType);
            }
            flowerRequest.setColors(temp);
        }
        List<Flower> flowerList = flowerRepository.findFlowersByRequest(
                flowerRequest.getColors(), flowerRequest.getSituation(), flowerRequest.getTarget(), pageable);

        List<FlowerDto> flowerDtoList = new ArrayList<>();
        for(Flower flower: flowerList) {
            flowerDtoList.add(FlowerDto.of(flower));
        }

        return flowerDtoList;
    }

    public List<FlowerDto> getFlowerListByColor(FlowerRequestDto flowerRequest) {
        Pageable pageable = PageRequest.of(0, 10);
        List<Flower> flowerList = flowerRepository.findFlowersByColor(flowerRequest.getColors(), pageable);

        List<FlowerDto> flowerDtoList = new ArrayList<>();
        for(Flower flower: flowerList) {
            flowerDtoList.add(FlowerDto.of(flower));
        }
        return flowerDtoList;
    }

    public List<FlowerDto> getFlowerListByMeaning(FlowerRequestDto flowerRequest) {
        if(flowerRequest.getSituation() == null) {
            List<SituationType> temp = new ArrayList<>();
            for(SituationType situationType: SituationType.values()) {
                temp.add(situationType);
            }
            flowerRequest.setSituation(temp);
        }
        if(flowerRequest.getTarget() == null) {
            List<TargetType> temp = new ArrayList<>();
            for(TargetType targetType: TargetType.values()) {
                temp.add(targetType);
            }
            flowerRequest.setTarget(temp);
        }

        Pageable pageable = PageRequest.of(0, 10);
        List<Flower> flowerList = flowerRepository.findFlowersByMeaning(flowerRequest.getSituation(), flowerRequest.getTarget(), pageable);

        List<FlowerDto> flowerDtoList = new ArrayList<>();
        for(Flower flower: flowerList) {
            flowerDtoList.add(FlowerDto.of(flower));
        }
        return flowerDtoList;
    }
}
