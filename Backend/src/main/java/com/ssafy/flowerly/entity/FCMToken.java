package com.ssafy.flowerly.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED) //서브클래스에서만 접근할 수 있도록 제한
public class FCMToken {
    @Id
    @GeneratedValue
    @Column(name = "fcm_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private String token;

    public FCMToken(Member member, String token) {
        this.member = member;
        this.token = token;
    }
}
