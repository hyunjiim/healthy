package com.example.healthy.user.service;

import com.example.healthy.user.entity.User;
import com.example.healthy.user.entity.UserAuth;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class CustomUserDetails implements UserDetails {

    private long idx;
    private String id;
    private String password;
    private String name;
    private String phone;
    private String email;
    private  String gender;
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
    private List<GrantedAuthority> userAuthList;

    // 생성자에 멤버 객체 정보 주입
    public CustomUserDetails(User user) {
        this.idx = user.getIdx();
        this.id = user.getId();
        this.password = user.getPassword();
        this.name = user.getName();
        this.phone = user.getPhone();
        this.email = user.getEmail();
        this.gender = user.getGender();
        this.birth = user.getBirth();
        this.address1 = user.getAddress1();
        this.address2 = user.getAddress2();
        this.height = user.getHeight();
        this.weight = user.getWeight();
        this.status = user.getStatus();
        this.subDay = user.getSubDay();
        this.enabled = user.getEnabled();
        this.userAuthList = new ArrayList<>();

        for (UserAuth auth : user.getUserAuthList()) {
            userAuthList.add(new SimpleGrantedAuthority(auth.getAuth()));
        }

    }
    //인증 사용자 권한 정보를 반환하는 메소드
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}

