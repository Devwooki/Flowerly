package com.ssafy.flowerly.entity;

import com.ssafy.flowerly.entity.common.BaseTimeEntity;
import com.ssafy.flowerly.member.SocialType;
import com.ssafy.flowerly.member.vo.MemberDto;
import com.ssafy.flowerly.member.MemberRole;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@DynamicUpdate //update시, 실제 값이 변경되는 컬럼만 update 쿼리로 생성
@Builder
@ToString
public class Member extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false)
    private String socialId;

    @Column(nullable = false)
    private String email;

    @Enumerated(EnumType.STRING)
    private MemberRole role;

    @Enumerated(EnumType.STRING)
    private SocialType socialType;

    @Column(nullable = false)
    private String nickName;

//    @Column(nullable = false)
//    private LocalDateTime createdAt;
//    @Column(nullable = false)
//    private LocalDateTime updateddAt;

    @Column(nullable = false)
    private boolean isNotification;

    @OneToMany(mappedBy = "member", orphanRemoval = true)
    private List<FCMToken> fcmTokens = new ArrayList<>();

    public MemberDto toDto(){
        return MemberDto.builder()
                .id(this.memberId)
                .socialId(this.socialId)
                .nickName(this.nickName)
                .email(this.email)
                .isNotification(this.isNotification)
                .role(this.role)
                .build();
    }

    public Member updateMail(String email){
        this.email = email;
//        dataUpdate();
        System.out.println(this);
        return this;
    }
//    private void dataUpdate(){
//        this.updatedAt = LocalDateTime.now();
//    }

    public String notificationToggle(){
        this.isNotification = !this.isNotification;
//        dataUpdate();
        return this.isNotification ?  "이제부터 알림을 받습니다" : "이제부터 알림을 받지 않습니다.";
    }

    public void deleteMember(){
        this.role = MemberRole.DELETE;
//        dataUpdate();
    }
    public void updateRole(MemberRole role){
        this.role = role;
    }

    public void updateNickName(String nickname){
        this.nickName =nickname;
    }



}
