package com.example.healthy.user.service;

import com.example.healthy.user.dao.UserDao;
import com.example.healthy.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private final UserDao userDao;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional(rollbackOn = Exception.class)
    @Override
    public void addUser(User user) {
        try {
            System.out.println("userDao.insertUser 실행");
            String hashedPassword = bCryptPasswordEncoder.encode(user.getPassword());
            user.setPassword(hashedPassword);
            System.out.println("userDao.insertUser password set");

            userDao.insertUser(user);

            System.out.println("userDao.insertUser(user) 실행");
        } catch (Exception e) {
            e.printStackTrace();
            throw e; // 롤백을 위해 예외를 다시 던집니다.
        }
    }
}
