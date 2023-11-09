package com.ssafy.flowerly.flly.service;

import com.ssafy.flowerly.address.repository.DongRepository;
import com.ssafy.flowerly.address.repository.SidoRepository;
import com.ssafy.flowerly.address.repository.SigunguRepository;
import com.ssafy.flowerly.entity.*;
import com.ssafy.flowerly.entity.type.*;
import com.ssafy.flowerly.exception.CustomException;
import com.ssafy.flowerly.exception.ErrorCode;
import com.ssafy.flowerly.flly.dto.FllyDto;
import com.ssafy.flowerly.flly.dto.FlowerDto;
import com.ssafy.flowerly.flly.dto.FlowerRequestDto;
import com.ssafy.flowerly.flly.repository.FlowerRepository;
import com.ssafy.flowerly.s3.model.S3Service;
import com.ssafy.flowerly.seller.model.FllyDeliveryRegionRepository;
import com.ssafy.flowerly.seller.model.FllyPickupRegionRepository;
import com.ssafy.flowerly.seller.model.FllyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class FlowerService {
    private final FlowerRepository flowerRepository;
    private final FllyRepository fllyRepository;
    private final SidoRepository sidoRepository;
    private final SigunguRepository sigunguRepository;
    private final DongRepository dongRepository;
    private final FllyPickupRegionRepository fllyPickupRegionRepository;
    private final FllyDeliveryRegionRepository fllyDeliveryRegionRepository;
    private final S3Service s3Service;
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
                    FlowerDto flowerDto = new FlowerDto();
                    flowerDto.setFlowerCode(flower.getFlowerCode());
                    if(flowerDtoList.contains(flowerDto)) continue;
                    flowerDtoListColor.add(FlowerDto.of(flower));
                }
                lists.put("flowersColor", flowerDtoListColor);
            }

            List<Flower> flowerListMeaning = flowerRepository.findFlowersByMeaning(situationTypes, targetTypes, pageable);

            List<FlowerDto> flowerDtoListMeaning = new ArrayList<>();
            for(Flower flower: flowerListMeaning) {
                if(flowerDtoListMeaning.size() > 9) break;
                FlowerDto flowerDto = new FlowerDto();
                flowerDto.setFlowerCode(flower.getFlowerCode());
                if(flowerDtoList.contains(flowerDto) || flowerDtoListColor.contains(flowerDto)) continue;
                flowerDtoListMeaning.add(FlowerDto.of(flower));
            }
            lists.put("flowersMeaning", flowerDtoListMeaning);
        }

        return lists;
    }

    public void saveFllyRequest(FllyDto fllyDto) {
        //=========================================================
        // String s3uploadUrl = s3Service.makeFlowerBouquet(이미지 URL);
        // 으로 쓰면 됩니다.
        //=========================================================

        Flly flly = new Flly();
        flly.setSituation(fllyDto.getSituation());
        flly.setTarget(fllyDto.getTarget());
        if(fllyDto.getColors().size() > 0) {
            flly.setColor1(ColorType.valueOf(fllyDto.getColors().get(0)));
            if(fllyDto.getColors().size() > 1) {
                flly.setColor2(ColorType.valueOf(fllyDto.getColors().get(1)));
                if(fllyDto.getColors().size() > 2) flly.setColor3(ColorType.valueOf(fllyDto.getColors().get(2)));
            }
        }
        if(fllyDto.getFlowers().size() > 0) {
            Flower flower1 = flowerRepository.findById(fllyDto.getFlowers().get(0).getFlowerCode())
                            .orElseThrow(() -> new CustomException(ErrorCode.FLOWER_NOT_FOUND));
            flly.setFlower1(flower1);
            if(fllyDto.getFlowers().size() > 1) {
                Flower flower2 = flowerRepository.findById(fllyDto.getFlowers().get(1).getFlowerCode())
                        .orElseThrow(() -> new CustomException(ErrorCode.FLOWER_NOT_FOUND));
                flly.setFlower2(flower2);
                if(fllyDto.getFlowers().size() > 2) {
                    Flower flower3 = flowerRepository.findById(fllyDto.getFlowers().get(2).getFlowerCode())
                            .orElseThrow(() -> new CustomException(ErrorCode.FLOWER_NOT_FOUND));
                    flly.setFlower3(flower3);
                }
            }
        }
        flly.setOrderType(fllyDto.getOrderType());
        flly.setDeadline(fllyDto.getDeadline().plusHours(9));
        flly.setRequestContent(fllyDto.getRequestContent());
        flly.setBudget(fllyDto.getBudget());
//        flly.setImageUrl("");
        flly.setImageUrl(s3Service.makeFlowerBouquet(fllyDto.getImageUrl()));
        flly.setCanceled(false);
        flly.setProgress(ProgressType.START);

        Flly savedFlly = fllyRepository.save(flly);
        if(fllyDto.getOrderType().equals(OrderType.DELIVERY)) {
            Sido sido = sidoRepository.findBySidoName(fllyDto.getDelivery().getSido())
                            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FIND_SIDO));
            Sigungu sigungu = sigunguRepository.findBySigunguNameAndSido(fllyDto.getDelivery().getSigungu(), sido)
                    .orElseThrow(() -> new CustomException(ErrorCode.NOT_FIND_SIGUNGU));

            Dong dong = dongRepository.findByDongNameAndSigungu(fllyDto.getDelivery().getDong(), sigungu)
                    .orElseThrow(() -> new CustomException((ErrorCode.NOT_FIND_DONG)));

            FllyDeliveryRegion fllyDeliveryRegion = FllyDeliveryRegion.builder()
                    .flly(savedFlly)
                    .sido(sido)
                    .sigungu(sigungu)
                    .dong(dong)
                    .deliveryAddress(fllyDto.getDetailAddress())
                    .build();

            fllyDeliveryRegionRepository.save(fllyDeliveryRegion);
        } else {
            for (FllyDto.Pickup pickup : fllyDto.getPickup()) {
                Long sidoCode = pickup.getSidoCode();
                Long sigunguCode = pickup.getSigunguCode();
                Long dongCode = pickup.getDongCode();

                Sido pickupSido = sidoRepository.findBySidoCode(sidoCode)
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FIND_SIDO));

                Sigungu pickupSigungu = sigunguRepository.findBySigunguCodeAndSido(sigunguCode, pickupSido)
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FIND_SIGUNGU));

                Dong pickupDong = dongRepository.findByDongCodeAndSigungu(dongCode, pickupSigungu)
                        .orElseThrow(() -> new CustomException(ErrorCode.NOT_FIND_DONG));

                FllyPickupRegion fllyPickupRegion = FllyPickupRegion.builder()
                        .flly(savedFlly)
                        .sido(pickupSido)
                        .sigungu(pickupSigungu)
                        .dong(pickupDong)
                        .build();

                fllyPickupRegionRepository.save(fllyPickupRegion);
            }
        }
    }
}
