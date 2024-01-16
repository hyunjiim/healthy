package com.example.healthy.user.dao;

import com.example.healthy.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserDaoImpl implements UserDao{
    @Override
    public int insertUser(User user) {
        return 0;
    }

    @Override
    public User selectUser(String id) {
        return null;
    }
    //private SqlSessionTemplate sqlSessionTemplate;

}
