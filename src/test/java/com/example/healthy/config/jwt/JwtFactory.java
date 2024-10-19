/*
package com.example.healthy.config.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.Builder;
import lombok.Getter;

import javax.crypto.SecretKey;
import java.time.Duration;
import java.util.Collections;
import java.util.Date;
import java.util.Map;


//JWT 토큰 서비스를 테스트하는 데 사용할 모킹(mocking)용 객체
//모킹(mocking) : 테스트를 실행 할 때 객체를 대신하는 가짜 객체
@Getter
public class JwtFactory {
    private String subject = "test@email.com";
    private Date issuedAt = new Date();
    private Date expiration = new Date(new Date().getTime() + Duration.ofDays(14).toMillis());
    private Map<String, Object> claims = Collections.emptyMap();

    //빌더 패턴을 사용해 설정이 필요한 데이터만 선택 설정
    @Builder
    public JwtFactory(String subject, Date issuedAt, Date expiration, Map<String, Object> claims){
        this.subject = subject != null? subject : this.subject;
        this.issuedAt = issuedAt != null? issuedAt : this.issuedAt;
        this.expiration = expiration != null? expiration : this.expiration;
        this.claims = claims != null? claims : this.claims;

    }

    public static JwtFactory withDefaultValues(){
        return JwtFactory.builder().build();
    }

    //jjwt 라이브러리를 사용해 JWT 토큰 생성
    public String createToken(JwtProp jwtProp) {
        SecretKey secretKey = Keys.hmacShaKeyFor(jwtProp.getSecretKey().getBytes());
        return Jwts.builder()
                .header()
                .add("typ","JWT")
                .and()
                .claims(claims)
                .subject(subject)
                .issuer(jwtProp.getIssuer())
                .issuedAt(issuedAt)
                .expiration(expiration)
                .signWith(secretKey, Jwts.SIG.HS512)
                .compact();
    }

}
*/