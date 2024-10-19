package com.example.healthy.user.controller;

//import com.example.healthy.constants.SecurityConstants;
import com.example.healthy.config.jwt.JwtProp;
import com.example.healthy.config.jwt.TokenProvider;
import com.example.healthy.user.entity.CreateAccessTokenResponse;
import com.example.healthy.user.entity.User;
import com.example.healthy.user.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.*;



@RestController
@Slf4j
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final TokenProvider tokenProvider;

    @Autowired
    private JwtProp jwtProp;

    
    @GetMapping(value = "/login")
    public String loginForm(){
        return "view/login";
    }

    @PostMapping(value = "/join")
    @ResponseBody
    public ResponseEntity<Map<String, String>> addUser(@RequestBody User user, @RequestParam String auth) {
        try {
            System.out.println("addUser 실행");
            userService.addUser(user, auth);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("error", "회원가입 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMap);
        }
    }

    //아이디 중복검사
    @GetMapping(value = "/userIdCheck")
    @ResponseBody
    public String userIdCheck(@RequestParam String id) {
        System.out.println("userIdCheck() 실행");
        int result = userService.idCheck(id);
        //중복 아이디가 존재할 경우
        if(result != 0){
            return "fail";
        }else{ //중복 아이디가 존재하지 않을 경우
            return "success";
        }
    }

}

//JWT 로그인을 위한 controller 클래스 구현
    /*
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


/*

    //로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest request) {
        String name = request.getName();
        String password = request.getPassword();

        //사용자 인증 로직 - 데이터베이스에서 사용자 정보와 비밀번호 확인

        //사용자 권한
        User user =

        byte[] signingKey = jwtProp.getSecretKey().getBytes();

        //토큰 생성
        //.signWith(시크릿 키, 알고리즘)
        String jwt = Jwts.builder()
                .signWith(Keys.hmacShaKeyFor(signingKey), Jwts.SIG.HS512)
                .header()
                .add("typ", SecurityConstants.TOKEN_TYPE)
                .and()
                .expiration(new Date( System.currentTimeMillis() + 1000*60*60*24*5))
                .claim("uid", name)
                .claim("rol", roles)
                .compact();

        return new ResponseEntity<String>(jwt, HttpStatus.OK);

    }

    //회원가입
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

    //토큰 해석
    @GetMapping("/info")
    public ResponseEntity<?> userInfo(@RequestHeader(name="Authorization") String header) {
        //Authorization : Bearer ${jwt} 형태로 값이 넘어옴 - Authorization부분을 제거 하여 원하는 형태로 저장
        String jwt = header.replace(SecurityConstants.TOKEN_PREFIX, "");

        byte[] signingKey = jwtProp.getSecretKey().getBytes();

        //JWS(JSON Web Signature) : Claim 정보를 디지털 서명을 이용하여 안전하게 전송하는 방식 - JWT의 한 유형
        //   >> Claim의 내용이 노출되지만 서명을 이용해 원본이 맞는지 무결성 파악 가능
        //   >> 클라이언트가 Claim 데이터를 사용하기 위해 암호화 방식(JWE)이 아닌 디지털 서명 방식(JWS)을 사용
        //   >> 대부분의 JWT라고 하면 JWS를 가리킴
        //Claims : name/value의 쌍을 이루고 있는 페이로드의 단위, 주고받는 정보
        //암호화 키로 복호화하는 과정
        //Jws<Claims> : JWT를 파싱하고 서명을 검증한 후, 그 결과로 Claim을 포함하는 객체
        Jws<Claims> parsedToken = Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(signingKey))
                .build()
                .parseSignedClaims(jwt);

        String id = parsedToken.getPayload().get("uid").toString();

        //rol : [ROLE_USER]
        Claims claims = parsedToken.getPayload();
        Object roles = claims.get("rol");

        log.info("rol : " + roles);

        return new ResponseEntity<String>(parsedToken.toString(), HttpStatus.OK);
    }


}
*/