package com.example.healthy.user.entity;

//인증을 위한 자격 증명을 포함한 간단한 POJO 클래스
public class AccountCredentials {
    private String name;
    private String password;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
