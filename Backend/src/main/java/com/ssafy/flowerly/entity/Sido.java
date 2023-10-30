package com.ssafy.flowerly.entity;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@ToString
public class Sido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sidoCode;

    private String sidoName;
}
