package com.example.healthy.config;

import com.example.healthy.config.jwt.TokenProvider;
import com.example.healthy.user.entity.User;
import com.example.healthy.user.service.RefreshTokenService;
import com.example.healthy.user.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.*;

@RequiredArgsConstructor
public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    private final TokenProvider tokenProvider;

    private final RefreshTokenService refreshTokenService;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        //String username = obtainUsername(request);
        //String password = obtainPassword(request);
        //클라이언트 요청에서 id, password 추출
        //String id = request.getParameter("id");
        //String password = request.getParameter("password");

        User loginUser;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            ServletInputStream inputStream = request.getInputStream();
            String messageBody = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);
            System.out.println(messageBody);
            loginUser = objectMapper.readValue(messageBody, User.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        String id = loginUser.getId();
        String password = loginUser.getPassword();

        System.out.println(id);
        System.out.println(password);

        //Spring Security는 token에 담아 id와 password를 검증
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(id, password);

        //token에 담은 검증을 위한 AuthenticationManager로 전달
        return authenticationManager.authenticate(authToken);
    }

    //로그인 성공시 실행하는 메소드(JWT 토큰 발급)
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException{
        String id = authentication.getName();
        System.out.println("successfulAuthenticaion: "+id);

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        List<String> roles = new ArrayList<>();

        for(GrantedAuthority authority : authorities){
            roles.add(authority.getAuthority());
        }

        //토큰 생성
        String accessToken = tokenProvider.generateToken("accessToken", id, Duration.ofHours(2), roles);
        String refreshToken = tokenProvider.generateToken("refreshToken", id, Duration.ofDays(3), roles);

        //refreshToken 저장
        refreshTokenService.saveRefreshToken(id, refreshToken);

        //응답 설정
        response.setHeader("accessToken", accessToken);
        response.addCookie(createCookie("refreshToken", refreshToken));
        response.setStatus(HttpStatus.OK.value());

        //ObjectMapper : Jackson 라이브러리의 클래스로, Java 객체를 JSON으로 직렬화하거나 역직렬화하는 데 사용
        // => Map 객체를 JSON으로 직렬화하여 HTTP 응답으로 전송
        //JSON 응답 생성
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("id", id);

        ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(response.getWriter(), responseData);

    }

    //로그인 실패시 실행하는 메소드
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed){
        response.setStatus(401);
    }

    //쿠키 생성 메소드
    private Cookie createCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24*60*60); //유효 시간 설정
        cookie.setHttpOnly(true); //http에서 수정 불가(JavaScript를 통해 쿠키에 접근 불가)

        return cookie;
    }

}
