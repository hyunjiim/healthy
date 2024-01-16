package com.example.healthy.user.dao;
import com.example.healthy.user.entity.User;

public interface UserDao {
    int insertUser(User user);
    User selectUser(String id);
}
