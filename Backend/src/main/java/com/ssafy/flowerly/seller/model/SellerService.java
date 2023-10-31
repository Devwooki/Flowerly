package com.ssafy.flowerly.seller.model;


import com.ssafy.flowerly.entity.Flly;
import com.ssafy.flowerly.entity.FllyParticipation;
import com.ssafy.flowerly.entity.FlowerMeaning;
import com.ssafy.flowerly.entity.Request;
import com.ssafy.flowerly.entity.type.ProgressType;
import com.ssafy.flowerly.seller.vo.FllyRequestDto;
import com.ssafy.flowerly.seller.vo.FlowerMeaningDto;
import com.ssafy.flowerly.seller.vo.OrderParticipationDto;
import com.ssafy.flowerly.seller.vo.OrderSelectSimpleDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class SellerService {

    private final FllyRepository fellyRepository;
    private final FlowerMeaningRepository flowerMeaningRepository;
    private final RequestRepository requestRepository;
    private final FllyParticipationRepository fllyParticipationRepository;

    /*
        의뢰 내용 API
     */
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

    /*
        채택된 주문 리스트
     */

    public Page<OrderSelectSimpleDto> getOrderSelect(Long mamberId, Pageable pageable) {
        
        //내꺼인지
        
        //주문완료인 제작완료인지
        
        Page<OrderSelectSimpleDto> oderBySelect = requestRepository.findBySellerMemberIdOrderByCreatedAt(mamberId, pageable).map(Request::toOrderSelectSimpleDto);

        return oderBySelect;
    }

    /*
        채택된 주문 완료하기
     */
    @Transactional
    public String UpdateProgressType(Long mamberId, Long fllyId) {

        //내가 참여한건지 (주문서인지)

       //주문오나료랑 제작완료 인애만 떠야함 

        Flly fllyInfo = fellyRepository.findByFllyId(fllyId).orElseThrow();
        if(fllyInfo.getProgress().getTitle().equals("주문완료")){
            fllyInfo.UpdateFllyProgress(ProgressType.FINISH_MAKING);
        }
        if(fllyInfo.getProgress().getTitle().equals("제작완료")) {
            fllyInfo.UpdateFllyProgress(ProgressType.FINISH_DELIVERY);
        }
        Flly updateInfo = fellyRepository.save(fllyInfo);

        return updateInfo.getProgress().getTitle();
    }

    /*
        참여한 플리
     */
    public Page<OrderParticipationDto> getParticipation(Long memberId ,Pageable pageable){
        //입찰인지 조율이지 + 경매마감시간이 안지난것만 보여져야한다
        LocalDateTime currentDateTime = LocalDateTime.now();
        log.info(currentDateTime.toString());
        Page<OrderParticipationDto> orderParticipation =
                fllyParticipationRepository.findBySellerMemberIdParticipationDto(memberId, pageable, currentDateTime)
                        .map(FllyParticipation::toOrderParticipationDto);

        return orderParticipation;
    }



}
