package com.ssafy.flowerly.entity;

import com.ssafy.flowerly.entity.common.BaseCreatedTimeEntity;
import com.ssafy.flowerly.entity.common.BaseTimeEntity;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@DynamicUpdate //update시, 실제 값이 변경되는 컬럼만 update 쿼리로 생성
@Builder
@ToString
public class Chatting extends BaseCreatedTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chattingId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flly_participation_id")
    private FllyParticipation fllyParticipation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consumer_id")
    private Member consumer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id")
    private Member seller;

    private String lastChattingMessage;
    private LocalDateTime lastChattingTime;

    @Column(nullable = false)
    private boolean isRemoved;

    public void updateChatting(String chattingMessage) {
        this.lastChattingMessage = chattingMessage;
        this.lastChattingTime = LocalDateTime.now();
    }
}
