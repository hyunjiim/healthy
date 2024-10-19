package com.example.healthy.config.jwt;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

//JWT(JSON Web Token) : 인증 및 권한과 관련된 정보를 안전하게 전달하기 위한 JSON 형식의 암호화된 문자열
// => 구조 : 헤더.페이로드.시그니처
// => 헤더(HEADER) : 토큰의 종류(typ)와 암호화 알고리즘(alg) - me tadata
// => 페이로드(PAYLOAD) : 전송할 정보 >> 사용자의 고유 식별자(sub), name(사용자의 이름), 토큰 발급 시간(iat)
//    >> 페이로드 단위 : Claims(json의 필드라 생각)
// => 시그니처(VERIFY SIGNATURE) : 헤더와 페이로드를 검증하기 위한 정보, 토큰의 변조 여부를 검증하기 위한 문자열, 정품임을 증명하는 표식
//    >> 암호화{(헤더, 페이로드) + 비밀키}
//    >> 암호화 결과(시그니처 값)가 서버측에서 갖고 있는 비밀키로 암호화한게 아니라면 입증 불가

//JWT 동작 방식
// 1. 서버는 사용자의 인증 정보를 사용하여 JWT 생성, 클라이언트가 해당 JWT를 저장
// 2. 클라이언트는 매 요청마다 JWT를 서버에 전송
// 3. 서버는 JWT와 시그니처를 사용하여 무결성 확인
// 4. 서버는 JWT의 내용을 사용하여 사용자의 인증 상태를 확인하거나 권한 부여

//JWT의 Registered Fields
// 1. iss(Issuer) : JWT를 발급한 주체
// 2. sub(Subject) : JWT 발급 목적
// 3. aud(Audience) : JWT 발급받은 수신자 - 식별이 가능해야 함
// 4. exp(Expiration Time) : JWT 만료시간
// 5. nbf(Not Before) : JWT 활성화 시간
// 6. iat(Issued At) : JWT 발급 시간
// 7. jti(JWT ID) : JWT 발급의 Unique ID

//SpringBoot의 '@ConfigurationProperties' 어노테이션을 사용하여 application.properties 파일로부터
//JWT 관련 프로퍼티를 관리하는 프로퍼티 클래스

//application.properties에 저장된 비밀키(SecretKey)와 발급자(issuer)를 가져와 자바 코드로 사용할 수 있도록 작성
@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "com.example.healthy") //com.example.healthy 경로 하위 속성들을 지정
public class JwtProp {

    //com.example.healthy.secret-key => secretKey : {인코딩된 시크릿 키}
    private String secretKey;

    private String issuer;
}
