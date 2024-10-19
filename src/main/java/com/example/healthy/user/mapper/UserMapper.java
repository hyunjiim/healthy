package com.example.healthy.user.mapper;

import com.example.healthy.user.entity.User;
import com.example.healthy.user.entity.UserAuth;

public interface UserMapper {
    int insertUser(User user);
    int insertUserAuth(UserAuth userAuth);
    int idCheck(String id);
    int emailCheck(String email);
    User selectUserById(String id);
    User selectUserByEmail(String email);

}
