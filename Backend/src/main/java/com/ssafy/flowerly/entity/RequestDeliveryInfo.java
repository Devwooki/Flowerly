package com.ssafy.flowerly.entity;

import com.ssafy.flowerly.chatting.dto.RequestFromChattingDto;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@DynamicUpdate //update시, 실제 값이 변경되는 컬럼만 update 쿼리로 생성
@Builder
@ToString
public class RequestDeliveryInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestDeliveryInfoId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "request_id")
    private Request request;

    @Column(nullable = false)
    private String recipientName;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private String address;

    public void updateDeliveryInfo(RequestFromChattingDto requestDto) {
        this.recipientName = requestDto.getRecipientName();
        this.phoneNumber = requestDto.getRecipientPhoneNumber();
        this.address = requestDto.getAddress();
    }
}
