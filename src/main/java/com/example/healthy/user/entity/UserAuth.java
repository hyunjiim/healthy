package com.example.healthy.user.entity;

import lombok.*;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
public class UserAuth {
    private Long idx;
    private String id;
    private String auth;

    public UserAuth(String id, String auth){
        this.id = id;
        this.auth = auth;
    }
}
