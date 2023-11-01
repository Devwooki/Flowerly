package com.ssafy.flowerly.entity;


import lombok.Getter;


import javax.persistence.*;

@Entity
@Getter
public class Dong {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dongCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sigungu_code")
    private Sigungu sigungu;

    private String dongName;
}
