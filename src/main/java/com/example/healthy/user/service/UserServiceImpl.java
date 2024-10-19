package com.example.healthy.user.service;

import com.example.healthy.user.dao.UserDao;
import com.example.healthy.user.entity.User;
import com.example.healthy.user.entity.UserAuth;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    //Could not autowire. No beans of '~' type found. 에러 발생
    // => 원인 : IDE에서 인식하지 못하는 문제로 에러 발생. 실행 시 정상 동작한다면 무시하고 진행
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    @Transactional(rollbackOn = Exception.class)
    @Override
    public int addUser(User user, String auth) {
        try {
            //비밀번호 암호화
            String hashedPassword = bCryptPasswordEncoder.encode(user.getPassword());
            user.setPassword(hashedPassword);

            //회원 등록
            int result = userDao.insertUser(user);

            //권한 설정
            if( result > 0 ){

                if(auth.equals("ROLE_REGISTER")){
                    userDao.insertUserAuth(new UserAuth(user.getId(), "ROLE_REGISTER"));
                    userDao.insertUserAuth(new UserAuth(user.getId(), "ROLE_USER"));
                } else if(auth.equals("ROLE_USER")){
                    userDao.insertUserAuth(new UserAuth(user.getId(), "ROLE_USER"));
                }
            }
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            throw e; // 롤백을 위해 예외를 다시 던짐
        }
    }

    @Transactional(rollbackOn = Exception.class)
    @Override
    public void addUserAuth(UserAuth userAuth) {

    }

    @Override
    public int idCheck(String id) {
        return userDao.idCheck(id);
    }

    @Override
    public int emailCheck(String email) {
        return userDao.emailCheck(email);
    }

    //유저 ID로 유저를 검색해서 전달하는 findById() 메서드 구성
    public User findById(String id){

        return userDao.selectUserById(id);
    }

    @Override
    public User findByEmail(String email) {
        return userDao.selectUserByEmail(email);
    }

}
