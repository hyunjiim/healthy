package com.example.healthy.user.service;

import com.example.healthy.user.entity.User;
import com.example.healthy.user.entity.UserAuth;

public interface UserService {

    int addUser(User user, String auth);

    void addUserAuth(UserAuth userAuth);

    int idCheck(String id);

    int emailCheck(String email);

    User findById(String id);

    User findByEmail(String email);

}
