package com.example.healthy.config;

import com.example.healthy.user.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class AuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //Authorication 헤더에서 토큰을 가져옴
        String jws = request.getHeader(HttpHeaders.AUTHORIZATION);
        if(jws != null) {
            //토큰을 확인하고 사용자를 얻음
            String user = jwtService.getAuthUser(request);
            //인증
            Authentication authentication = new UsernamePasswordAuthenticationToken(user, null,
                    Collections.emptyList());

            SecurityContextHolder.getContext()
                    .setAuthentication(authentication);
        }
        //원래 요청으로 이동
        filterChain.doFilter(request, response);
    }
}