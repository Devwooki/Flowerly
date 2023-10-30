package com.ssafy.flowerly.entity;

import javax.persistence.*;

@Entity
public class Dong {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dongCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "singungu_code")
    private Sigungu sigungu;

    private String dongName;
}
