package com.example.healthy.crew.controller;

import com.example.healthy.crew.entity.Crew;
import com.example.healthy.crew.service.CrewService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3002")
public class CrewController {
    @Autowired
    private CrewService crewService;
    @GetMapping("/crew")
    public String crewForm(){

        return "crew-detail.html";
    }

//    크루 등록 컨트롤러
    @PostMapping("/crew/reg")
    public String addCrew(@RequestBody Crew crew){
        crewService.addCrew(crew);
        log.info("crew info : {}",crew);
        return "crew";
    }
}
