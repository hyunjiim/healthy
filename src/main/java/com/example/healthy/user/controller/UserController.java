package com.example.healthy.user.controller;

import com.example.healthy.user.entity.User;
import com.example.healthy.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("join")
    public String getAddUser(){
        return "views/join";
    }

    @PostMapping("/join")
    public ResponseEntity<String> addUser(@RequestBody User user) {
        try {
            userService.addUser(user);
            return ResponseEntity.ok("views/main.js");
        } catch (Exception e) {
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원가입 중 오류가 발생했습니다.");
        }
    }
}
