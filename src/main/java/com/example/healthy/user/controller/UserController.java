package com.example.healthy.user.controller;

import com.example.healthy.user.entity.AccountCredentials;
import com.example.healthy.user.entity.User;
import com.example.healthy.user.service.JwtService;
import com.example.healthy.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    //JWT 로그인을 위한 controller 클래스 구현
    @PostMapping(value = "/login")
    public ResponseEntity<?> getToken(@RequestBody AccountCredentials credentials) {
        //토큰을 생성하고 응답의 Authorization 헤더로 보냄
        UsernamePasswordAuthenticationToken creds =
                new UsernamePasswordAuthenticationToken(
                        credentials.getName(),
                        credentials.getPassword());

        Authentication auth = authenticationManager.authenticate(creds);

        //토큰 생성
        String jwts = jwtService.getToken(auth.getName());

        //생성된 토큰으로 응답을 생성
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer" + jwts)
                .header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization")
                .build();

    }
    @PostMapping(value = "/join")
    @ResponseBody
    public ResponseEntity<Map<String, String>> addUser(@RequestBody User user) {
        System.out.println("addUser() 실행 : "+user.getId());
        System.out.println("addUser() 실행 : "+user.getPassword());
        System.out.println("addUser() 실행 : "+user.getName());
        System.out.println("addUser() 실행 : "+user.getBirth());
        System.out.println("addUser() 실행 : "+user.getEmail());
        System.out.println("addUser() 실행 : "+user.getAddress1());
        System.out.println("addUser() 실행 : "+user.getGender());

        try {
            System.out.println("addUser 실행");
            userService.addUser(user);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("error", "회원가입 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMap);
        }
    }


}
