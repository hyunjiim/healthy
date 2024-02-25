package com.example.healthy.user.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

//서명된 JWT를 생성하고 검증하는 클래스

@Component
public class JwtService {
    //토큰의 만료 시간을 밀리초 단위로 정의하기 위한 상수 선언
    static final long EXPIRATIONTIME = 86400000;
    //토큰의 접두사를 정의하기 위한 상수 선언
    static final String PREFIX = "Bearer";
    //비밀 키 생성 => 시연용도로만 사용
    static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    //서명된 JWT 토큰 생성
    public String getToken(String name) {
        String token = Jwts.builder()
                .setSubject(name)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
                .signWith(key)
                .compact();

        return token;
    }

    //요청 권한 부여 헤더에서 토큰을 가져와 토큰을 확인하고 사용자 이름을 얻음
    public String getAuthUser(HttpServletRequest request) {
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);

        if(token != null) {
            String user = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token.replace(PREFIX, ""))
                    .getBody()
                    .getSubject();

            if (user != null) {
                return user;
            }
        }
        return null;
    }

}


