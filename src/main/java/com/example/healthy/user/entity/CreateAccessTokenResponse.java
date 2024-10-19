package com.example.healthy.user.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

//토큰 생성 응답을 담당할 DTO 클래스

@AllArgsConstructor
@Getter
public class CreateAccessTokenResponse {
    private String accessToken;
}
