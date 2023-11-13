package com.ssafy.flowerly.entity;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Document(collection = "fcm_token")
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED) //서브클래스에서만 접근할 수 있도록 제한
@AllArgsConstructor
public class FCMToken {
    @Id
    private String id;
    private Long memberId;
    private List<String> tokens = new ArrayList<>();

    public FCMToken(Long member, String newFCM) {
        this.memberId = member;
        this.tokens.add(newFCM);
    }

    public void addToken(String newFCM){
        this.tokens.add(newFCM);
    }
}
