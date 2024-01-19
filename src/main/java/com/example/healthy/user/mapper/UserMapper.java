package com.example.healthy.user.mapper;

import com.example.healthy.user.entity.User;

public interface UserMapper {
    int insertUser(User user);
    User selectUser(String id);
}
