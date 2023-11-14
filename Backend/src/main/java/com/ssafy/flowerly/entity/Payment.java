package com.ssafy.flowerly.entity;

import com.ssafy.flowerly.chatting.dto.PaymentDto;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@DynamicUpdate //update시, 실제 값이 변경되는 컬럼만 update 쿼리로 생성
@Builder
@ToString
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "request_id")
    private Request request;

    private Integer price;
    private String cid;
    private String tid;
    private String aid;
    private String pgToken;
    private LocalDateTime createdAt;
    private LocalDateTime approvedAt;

    public void addApprovalInfo(String aid, String pgToken, String approvedAt) {
        this.aid = aid;
        this.pgToken = pgToken;
        this.approvedAt = LocalDateTime.parse(approvedAt);
    }

}
