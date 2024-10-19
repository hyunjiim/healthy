package com.example.healthy.user.entity;

import lombok.Getter;
import lombok.Setter;

//토큰 생성 요청을 담당할 DTO 클래스

@Getter
@Setter
public class CreateAccessTokenRequest {
    private String refreshToken;
}
