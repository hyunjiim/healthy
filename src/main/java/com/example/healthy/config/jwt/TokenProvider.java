package com.example.healthy.config.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Duration;
import java.util.*;

//토큰 생성, 유효성 검사, 토큰에 필요한 정보를 가져오는 클래스

@RequiredArgsConstructor
@Service
public class TokenProvider {

    private final JwtProp jwtProp;

    //서명에 사용할 키 생성
    private SecretKey secretKey;

    @PostConstruct
    public void init() {
        this.secretKey = Keys.hmacShaKeyFor(jwtProp.getSecretKey().getBytes());
    }

    public String generateToken(String category, String id, Duration expiredAt, List<String> roles){
        Date now = new Date();
        return makeToken(category, new Date(now.getTime() + expiredAt.toMillis()), id, roles);
    }

    //1. JWT 토큰 생성 메소드 작성
    private String makeToken(String category,Date expiry, String id, List<String> roles) {
        Date now = new Date();

        //setHeaderParams(Map<String, ?> params) : JJWT 0.12.0 이후 deprecated
        // => 대안 : header().add(map).and()
        //Map<String, Object> headerParams = new HashMap<>();
        //headerParams.put("typ", "JWT");

        return Jwts.builder()
                .claims()
                .issuer(jwtProp.getIssuer())
                .issuedAt(now)
                .expiration(expiry)
                .add("id",id)
                .add("role", roles)
                .add("category", category)
                .and()
                .signWith(secretKey, Jwts.SIG.HS512) //Keys.hmacShaKeyFor(keyBytes): HMAC-SHA 키 생성
                .compact();
    }

    //2. JWT 토큰 유효성 검증 메소드 작성
    // => 토큰 복호화 과정에서 에러 발생 시 false 반환, 에러가 발생하지 않는다면 true 반환
    public boolean validToken(String token){
        try{
            Jwts.parser()
                    .verifyWith(secretKey) //비밀값으로 복호화
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (Exception e){
            return false;
        }
    }

    //3. 토큰 기반으로 인증 정보를 가져오는 메소드
    /*
    public Authentication getAuthentication(String token){
        Claims claims = getClaims(token);
        Set<SimpleGrantedAuthority> authorities = Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"));

        //Spring Security에서 제공하는 User 클래스 import
        return new UsernamePasswordAuthenticationToken(
                new org.springframework.security.core.userdetails.User(claims.getSubject(), "",authorities)
                ,token,authorities);
    }
     */

    public List<String> getRole(String token) {

        Claims claims = getClaims(token);

        // Claims에서 "roles" 클레임을 List<String>으로 가져옴
        return claims.get("role", List.class);
    }


    //4. 토큰 기반으로 유저 ID를 가져오는 메소드
    public String getUserId(String token){
        Claims claims = getClaims(token);
        return claims.get("id", String.class);
    }

    //5. 토큰 기반으로 토큰의 카테고리(access/refresh)를 가져오는 메소드
    public String getCategory(String token){
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("category", String.class);
    }

    private Claims getClaims(String token){
        return Jwts.parser()  //클레임 조회
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
