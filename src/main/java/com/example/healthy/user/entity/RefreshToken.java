package com.example.healthy.user.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/*
REFRESH_TOKEN 테이블

idx -   BIGINT
id -    VARCHAR
refresh_token - VARCHAR
 */

@NoArgsConstructor
@Getter
@Entity
public class RefreshToken {
    @Id
    private long idx;
    private String id;
    private String refreshToken;

    public RefreshToken(String id, String refreshToken){
        this.id = id;
        this.refreshToken = refreshToken;
    }

    public RefreshToken update(String newRefreshToken){
        this.refreshToken = newRefreshToken;
        return this;
    }

}
