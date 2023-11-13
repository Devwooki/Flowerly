package com.ssafy.flowerly.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Document(collection = "chatting_message")
@AllArgsConstructor
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED) //서브클래스에서만 접근할 수 있도록 제한
public class FCMToken {
    @Id
    private Long id;

    private Long memberId;

    private List<String> token;

    public FCMToken(Long member) {
        this.memberId = member;
        this.token = new ArrayList<>();
    }
}
