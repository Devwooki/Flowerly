package com.ssafy.flowerly.config;

import com.ssafy.flowerly.JWT.JWTService;
import com.ssafy.flowerly.interceptor.AuthInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.mvc.WebContentInterceptor;

import java.util.Arrays;

@Configuration
@RequiredArgsConstructor
public class WebConfigure implements WebMvcConfigurer {
    private final  AuthInterceptor authInterceptor;
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authInterceptor)
                .order(0) //가장 첫 번째 순서로 수행한다
                .addPathPatterns("/api/member/signup/seller")
                .addPathPatterns("/api/member/signup/buyer")
                .addPathPatterns("/api/member"); // "/temp"에서 접근할 때, 인터셉터를 거치게한다.

    }
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000/", "http://localhost:6090/", "https://flower-ly.co.kr/")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS")
                .allowedHeaders("X-Custom-Header", "Content-Type", "Authorization")
                .exposedHeaders("Authorization")
                .allowCredentials(true);
    }

}

