package com.example.healthy.user.entity;

import lombok.*;

import java.util.List;

@Getter
@Setter
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private long idx;
    private String id;
    private String password;
    private String name;
    private String phone;
    private String email;
    private String gender;
    private String birth;
    private String address1;
    private String address2;
    private String address3;
    private double height;
    private double weight;
    private int status;
    private int subscription;
    private String subDay;
    private String enabled;

    private List<UserAuth> userAuthList;
}
