package com.ssafy.flowerly.entity;

import com.ssafy.flowerly.dtos.MemberDto;
import com.ssafy.flowerly.enums.MemberRole;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@DynamicUpdate //update시, 실제 값이 변경되는 컬럼만 update 쿼리로 생성
@Builder
public class Member {
    @Id
    @GeneratedValue
    private Long memberId;

    @Column(nullable = false)
    private String kakaoId;

    @Enumerated(EnumType.STRING)
    private MemberRole role;

    @Column(nullable = false)
    private String nickName;

    @Column(nullable = false)
    private LocalDateTime createdAt;
    @Column(nullable = false)
    private LocalDateTime updateddAt;

    @Column(nullable = false)
    private boolean isRemoved;

    @Column(nullable = false)
    private boolean isNotification;



    public MemberDto toDto(){
        return MemberDto.builder()
                .id(this.memberId)
                .kakaoId(this.kakaoId)
                .nickName(this.nickName)
                .isNotification(this.isNotification)
                .build();
    }

    public Member updateNicknameAndMail(String nickname, String kakaoId){
        this.nickName = nickname;
        this.kakaoId = kakaoId;
        dataUpdate();
        return this;
    }
    private void dataUpdate(){
        this.updateddAt = LocalDateTime.now();
    }

    public String notificationToggle(){
        this.isNotification ^= this.isNotification;
        dataUpdate();
        return this.isNotification ?  "이제부터 알림을 받습니다" : "이제부터 알림을 받지 않습니다.";
    }

    public void deleteMember(){
        this.isRemoved = true;
        dataUpdate();
    }
}
