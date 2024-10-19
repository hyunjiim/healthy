package com.example.healthy.config;

//토큰 필터 구현하기
//액세스 토큰값이 담긴 Authorization 헤더값을 가져온 뒤 액세스 토큰이 유효하다면 인증 정보 설정

import com.example.healthy.config.jwt.TokenProvider;
import com.example.healthy.user.entity.CustomUserDetails;
import com.example.healthy.user.entity.User;
import com.example.healthy.user.service.CustomUserDetailsService;
import com.example.healthy.user.service.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

//OncePerRequestFilter : 요청받을 때 단 한번만 실행됨
@RequiredArgsConstructor
public class TokenAuthenticationFilter extends OncePerRequestFilter {
    private final TokenProvider tokenProvider;
    private final CustomUserDetailsService customUserDetailsService;
    //private final static String HEADER_AUTHORIZATION = "Authorization";
    //private final static String TOKEN_PREFIX = "Bearer";


    //doFilterInternal :
    @Override
    protected void doFilterInternal(
            HttpServletRequest request
            , HttpServletResponse response
            , FilterChain filterChain) throws ServletException, IOException {

        //1. 요청 헤더에서 accessToken 키의 값을 조회
        String accessToken = null;
        accessToken = request.getHeader("accessToken");

        //accessToken이 null인 경우
        if(accessToken == null) {
            filterChain.doFilter(request,response);
            return;
        }

        //2. 가져온 토큰이 유효한지 확인하고, 유효하면 인증 정보 설정, 만료시 다음 필터로 넘기지 않음
        // => TokenProvider.validToken(token) : JWT 토큰 유효성 검증 메소드
        try{
            tokenProvider.validToken(accessToken);
        } catch (ExpiredJwtException e) {
            //response body
            PrintWriter writer = response.getWriter();
            writer.println("access token expired");

            //response status code
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        //토큰이 accessToken인지 확인
        String category = tokenProvider.getCategory(accessToken);

        if (!category.equals("accessToken")) {
            //response body
            PrintWriter writer = response.getWriter();
            writer.print("invaild access token");

            //response status code
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        //토큰에서 사용자 id 추출
        String id = tokenProvider.getUserId(accessToken);

        CustomUserDetails customUserDetails = customUserDetailsService.loadUserByUsername(id);

        Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authToken);

        //필터 체인의 다음 필터 호출
        filterChain.doFilter(request, response);
    }
}

