package com.example.healthy.user.controller;


import com.example.healthy.config.jwt.TokenProvider;
import com.example.healthy.user.service.RefreshTokenService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.util.List;


@RequiredArgsConstructor
@RestController
public class TokenController {
    private final TokenProvider tokenProvider;
    private final RefreshTokenService refreshTokenService;

    // "/token" POST 요청 시 RefreshToken 기반으로 새로운 AccessToken 생성
    /*
    @PostMapping("/token")
    public ResponseEntity<CreateAccessTokenResponse> createNewAccessToken(@RequestBody CreateAccessTokenRequest request){
        String newAccessToken = tokenService.createNewAccessToken(request.getRefreshToken());

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new CreateAccessTokenResponse(newAccessToken));
    }

     */

    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response){

        String refreshToken = null;
        Cookie[] cookies = request.getCookies();
        for(Cookie cookie : cookies){
            if(cookie.getName().equals("refreshToken")) {
                refreshToken = cookie.getValue();
            }
        }

        //쿠키에 refreshToken이 없을 경우
        if (refreshToken == null){
            return new ResponseEntity<>("refresh token null", HttpStatus.BAD_REQUEST);
        }

        //유효하지 않은 토큰인 경우 ExpiredJwtException 발생
        try{
            tokenProvider.validToken(refreshToken);
        }catch (ExpiredJwtException e){
            //response status code
            return new ResponseEntity<>("refresh token expired", HttpStatus.BAD_REQUEST);
        }

        //토큰이 refreshToken인지 확인
        String category = tokenProvider.getCategory(refreshToken);

        //refreshToken이 아니면
        if (!category.equals("refreshToken")){
            return new ResponseEntity<>("invaild refresh token", HttpStatus.BAD_REQUEST);
        }

        //DB에 refreshToken이 저장되어 있는지 확인
        Boolean isExist = refreshTokenService.existsByRefreshToken(refreshToken);
        if(!isExist) {
            return new ResponseEntity<>("invaild refresh token", HttpStatus.BAD_REQUEST);
        }

        String id = tokenProvider.getUserId(refreshToken);
        List<String> role = tokenProvider.getRole(refreshToken);

        String newAccessToken = tokenProvider.generateToken("accessToken", id, Duration.ofHours(2), role);
        String newRefreshToken = tokenProvider.generateToken("refreshToken", id, Duration.ofDays(3), role);

        //refreshToken을 저장한 DB에 기존의 refreshToken 삭제 후 새 RefreshToken 저장
        refreshTokenService.deleteByRefreshToken(refreshToken);
        refreshTokenService.saveRefreshToken(id, newRefreshToken);

        response.setHeader("accessToken", newAccessToken);
        response.addCookie(createCookie("refreshToken", newRefreshToken));

        return new ResponseEntity<>(HttpStatus.OK);
    }

    //쿠키 생성 메소드
    private Cookie createCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24*60*60); //유효 시간 설정
        cookie.setHttpOnly(true); //http에서 수정 불가(JavaScript를 통해 쿠키에 접근 불가)

        return cookie;
    }
}
