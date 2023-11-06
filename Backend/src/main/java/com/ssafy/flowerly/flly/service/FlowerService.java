package com.ssafy.flowerly.flly.service;

import com.ssafy.flowerly.entity.Flower;
import com.ssafy.flowerly.entity.type.ColorType;
import com.ssafy.flowerly.entity.type.SituationType;
import com.ssafy.flowerly.entity.type.TargetType;
import com.ssafy.flowerly.flly.dto.FllyDto;
import com.ssafy.flowerly.flly.dto.FlowerDto;
import com.ssafy.flowerly.flly.dto.FlowerRequestDto;
import com.ssafy.flowerly.flly.repository.FlowerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class FlowerService {
    private final FlowerRepository flowerRepository;

    public Map<String, List<FlowerDto>> getFlowerList(FlowerRequestDto flowerRequest) {
        Map<String, List<FlowerDto>> lists = new HashMap<>();
        lists.put("flowers", null);
        lists.put("flowersColor", null);
        lists.put("flowersMeaning", null);

        List<SituationType> situationTypes = flowerRequest.getSituation();
        List<TargetType> targetTypes = flowerRequest.getTarget();
        List<ColorType> colorTypes = new ArrayList<>();
        for(String color: flowerRequest.getColors()) {
            colorTypes.add(ColorType.valueOf(color));
        }

        Pageable pageable = PageRequest.of(0, 20);
        if(flowerRequest.getSituation() == null) {
            situationTypes = new ArrayList<>();
            for(SituationType situationType: SituationType.values()) {
                situationTypes.add(situationType);
            }
        }
        if(flowerRequest.getTarget() == null) {
            targetTypes = new ArrayList<>();
            for(TargetType targetType: TargetType.values()) {
                targetTypes.add(targetType);
            }
        }
        if(flowerRequest.getColors() == null) {
            for(ColorType colorType: ColorType.values()) {
                colorTypes.add(colorType);
            }
        }
        List<Flower> flowerList = flowerRepository.findFlowersByRequest(
                colorTypes, situationTypes, targetTypes, pageable);

        List<FlowerDto> flowerDtoList = new ArrayList<>();
        for(Flower flower: flowerList) {
            flowerDtoList.add(FlowerDto.of(flower));
        }
        lists.put("flowers", flowerDtoList);

        if(flowerList.size() < 10) {
            List<FlowerDto> flowerDtoListColor = new ArrayList<>();
            if(flowerRequest.getColors() != null) {
                List<Flower> flowerListColor = flowerRepository.findFlowersByColor(colorTypes, pageable);

                for(Flower flower: flowerListColor) {
                    if(flowerDtoListColor.size() > 9) break;
                    if(flowerDtoList.contains(flower)) continue;
                    flowerDtoListColor.add(FlowerDto.of(flower));
                }
                lists.put("flowersColor", flowerDtoListColor);
            }

            List<Flower> flowerListMeaning = flowerRepository.findFlowersByMeaning(situationTypes, targetTypes, pageable);

            List<FlowerDto> flowerDtoListMeaning = new ArrayList<>();
            for(Flower flower: flowerListMeaning) {
                if(flowerDtoListMeaning.size() > 9) break;
                if(flowerDtoList.contains(flower) || flowerDtoListColor.contains(flower)) continue;
                flowerDtoListMeaning.add(FlowerDto.of(flower));
            }
            lists.put("flowersMeaning", flowerDtoListMeaning);

        }

        return lists;
    }

    public void saveFllyRequest(FllyDto fllyDto) {
    }
}
