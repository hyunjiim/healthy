package com.example.healthy.user.dao;

import com.example.healthy.user.entity.User;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserDaoImpl implements UserDao{
    private SqlSessionTemplate sqlSessionTemplate;

    @Autowired
    public UserDaoImpl(SqlSessionTemplate sqlSessionTemplate){this.sqlSessionTemplate = sqlSessionTemplate;}

    @Override
    public int insertUser(User user) {
        return sqlSessionTemplate.insert("com.example.healthy.user.mapper.UserMapper.insertUser",user);
    }

    @Override
    public User selectUser(String id) {
        return sqlSessionTemplate.selectOne("com.example.healthy.user.mapper.UserMapper.selectUser", id);
    }

}
