package com.example.healthy.user.entity;

import com.example.healthy.user.dao.UserDao;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserDao userDao;
    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        User user = userDao.selectUser(id);

        if(user == null){
            throw new UsernameNotFoundException(id);
        }

        return new CustomUserDetails(user);
    }
}
