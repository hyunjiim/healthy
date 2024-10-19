package com.example.healthy.user.entity;

import lombok.*;

import java.util.List;

//@EqualsAndHashCode 어노테이션 : 객체의 .equals() 와 .hashCode() 코드 생성
//equals 메소드 : 객체의 동일성(두 객체의 메모리 주소가 동일) 판단 => 동등성(두 객체가 같은 값) 판단X
//
//https://growth-coder.tistory.com/103 다시 확인! 재정의의 의미?
@Getter
@Setter
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private long idx;
    private String id;
    private String password;
    //비밀번호 확인
    private String passwordCheck;
    private String name;
    private String phone;
    private String email;
    private int gender;
    private String birth;
    private String address1;
    private String address2;
    private String address3;
    private double height;
    private double weight;
    private int status;
    private int subscription;
    private String subDay;
    //휴면 여부
    private int enabled;
    //권한 목록 - ROLE_USER, ROLE_
    private List<UserAuth> userAuthList;
}
