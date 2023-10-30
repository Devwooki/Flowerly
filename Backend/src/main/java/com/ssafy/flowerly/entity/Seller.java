package com.ssafy.flowerly.entity;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Seller {
    @Id
    @GeneratedValue
    Long id;


}
