package com.example.healthy.user.controller;

import com.example.healthy.user.entity.User;
import com.example.healthy.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private UserService userService;

    @PostMapping("/join")
    @ResponseBody
    public ResponseEntity<Map<String, String>> addUser(@RequestBody User user) {
        System.out.println(user.getId());
        try {
            System.out.println("addUser 실행");
            userService.addUser(user);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("error", "회원가입 중 오류가 발생했습니다.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorMap);
        }
    }


}
