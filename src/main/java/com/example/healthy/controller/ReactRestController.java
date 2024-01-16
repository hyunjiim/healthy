package com.example.healthy.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ReactRestController {

    @PostMapping("/testData")
    public Map<Integer, String> testData(@RequestBody List<String> params) {
        Map<Integer, String> data = new HashMap<>();
        data.put(1, "사과");
        data.put(2, "포도");
        data.put(3, "바나나");

        int i = 4;
        for (String param : params) {
            data.put(i, param);
            i++;
        }

        return data;
    }

    @RequestMapping(value = "/testData", method = RequestMethod.OPTIONS)
    public ResponseEntity<Object> preflight() {
        return ResponseEntity.ok().build();
    }
}

