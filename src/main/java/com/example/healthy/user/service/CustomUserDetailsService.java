package com.example.healthy.user.service;

import com.example.healthy.user.dao.UserDao;
import com.example.healthy.user.entity.CustomUserDetails;
import com.example.healthy.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

//SpringSecurity에서 유저의 정보를 가져오는 인터페이스
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserDao userDao;
    
    //사용자ID로 사용자의 정보를 가져오는 메소드 구현
    @Override
    public CustomUserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        User user = userDao.selectUserById(id);

        if(user == null){
            throw new UsernameNotFoundException(id+ "의 사용자를 찾을 수 없습니다.");
        }

        //Users -> CustomUser 변환

        return new CustomUserDetails(user);
    }
}
