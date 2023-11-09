//package com.ssafy.flowerly.config;
//
//import com.google.api.gax.rpc.ApiException;
//import com.google.auth.oauth2.GoogleCredentials;
//import com.google.firebase.FirebaseApp;
//import com.google.firebase.FirebaseOptions;
//import com.google.firebase.messaging.*;
//import com.ssafy.flowerly.exception.CustomException;
//import com.ssafy.flowerly.exception.ErrorCode;
//import lombok.extern.slf4j.Slf4j;
//import org.aspectj.apache.bcel.classfile.Field;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.core.io.ClassPathResource;
//import org.springframework.stereotype.Component;
//
//import javax.annotation.PostConstruct;
//import java.io.IOException;
//import java.io.InputStream;
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Component
//@Slf4j
//public class FCMConfig {
//    @Value("${fcm.key.path}")
//    private String FCM_CREDENTIAL;
//
//    @Value("${fcm.key.scope}")
//    private String FIREBASE_SCOPE;
//
//    @PostConstruct
//    public void init() {
//        try {
//            FirebaseOptions options = new FirebaseOptions.Builder()
//                    .setCredentials(
//                            GoogleCredentials
//                                    .fromStream(new ClassPathResource(FCM_CREDENTIAL).getInputStream())
//                                    .createScoped(List.of(FIREBASE_SCOPE)))
//                    .build();
//            if (FirebaseApp.getApps().isEmpty()) {
//                FirebaseApp.initializeApp(options);
//                log.info("Firebase application has been initialized");
//            }
//        } catch (IOException e) {
//            log.error(e.getMessage());
//            // spring 뜰때 알림 서버가 잘 동작하지 않는 것이므로 바로 죽임
//            throw new RuntimeException(e.getMessage());
//        }
//    }
//
//    // 알림 보내기
//    public void sendByTokenList(List<String> tokenList, String title, String body) {
//
//        // 메시지 만들기
//        List<Message> messages = tokenList.stream().map(token -> Message.builder()
//                .putData("time", LocalDateTime.now().toString())
//                .setNotification(new Notification(title, body))
//                .setToken(token)
//                .build()).collect(Collectors.toList());
//
//        // 요청에 대한 응답을 받을 response
//        BatchResponse response;
//        try {
//
//            // 알림 발송
//            response = FirebaseMessaging.getInstance().sendAll(messages);
//
//            // 요청에 대한 응답 처리
//            if (response.getFailureCount() > 0) {
//                List<SendResponse> responses = response.getResponses();
//                List<String> failedTokens = new ArrayList<>();
//
//                for (int i = 0; i < responses.size(); i++) {
//                    if (!responses.get(i).isSuccessful()) {
//                        failedTokens.add(tokenList.get(i));
//                    }
//                }
//                log.error("List of tokens are not valid FCM token : " + failedTokens);
//            }
//        } catch (FirebaseMessagingException e) {
//            log.error("cannot send to memberList push message. error info : {}", e.getMessage());
//            throw new CustomException(ErrorCode.INIT_FCM_ERROR);
//        }
//    }
//}
