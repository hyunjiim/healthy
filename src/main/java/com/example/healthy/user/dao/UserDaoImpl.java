package com.example.healthy.user.dao;

import com.example.healthy.user.entity.User;
import com.example.healthy.user.entity.UserAuth;
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
    public int insertUserAuth(UserAuth userAuth) {
        return sqlSessionTemplate.insert("com.example.healthy.user.mapper.UserMapper.insertUserAuth", userAuth);
    }

    @Override
    public int idCheck(String id) {
        return sqlSessionTemplate.selectOne("com.example.healthy.user.mapper.UserMapper.idCheck", id);
    }

    @Override
    public int emailCheck(String email) {
        return sqlSessionTemplate.selectOne("com.example.healthy.user.mapper.UserMapper.emailCheck", email);
    }

    @Override
    public User selectUserById(String id) {
        return sqlSessionTemplate.selectOne("com.example.healthy.user.mapper.UserMapper.selectUserById", id);
    }

    @Override
    public User selectUserByEmail(String email) {
        return sqlSessionTemplate.selectOne("com.example.healthy.user.mapper.UserMapper.selectUserByEmail", email);
    }

}
