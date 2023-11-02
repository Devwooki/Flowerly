package com.ssafy.flowerly.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@ToString
public class Sigungu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sigunguCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sido_code")
    @JsonIgnore
    private Sido sido;

    private String sigunguName;
}
