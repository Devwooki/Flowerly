package com.ssafy.flowerly.entity;

import com.ssafy.flowerly.dtos.MemberDto;
import com.ssafy.flowerly.enums.MemberRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Member {
    @Id
    @GeneratedValue
    private Long id;

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
                .id(this.id)
                .kakaoId(this.kakaoId)
                .nickName(this.nickName)
                .isNotification(this.isNotification)
                .build();
    }
    private void updateTime(){
        this.updateddAt = LocalDateTime.now();
    }

    public String notificationToggle(){
        this.isNotification ^= this.isNotification;

        return this.isNotification ?  "이제부터 알림을 받습니다" : "이제부터 알림을 받지 않습니다.";
    }

    public void deleteMember(){
        this.isRemoved = true;
    }
}
