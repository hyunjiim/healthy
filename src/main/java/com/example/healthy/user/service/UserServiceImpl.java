package com.example.healthy.user.service;

import com.example.healthy.user.dao.UserDao;
import com.example.healthy.user.entity.User;
//import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserDao userDao;
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    @Transactional(rollbackOn = Exception.class)
    @Override
    public void addUser(User user) {
        String hashedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);

        userDao.insertUser(user);
    }
}
