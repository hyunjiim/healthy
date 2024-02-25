package com.example.healthy.crew.controller;

import com.example.healthy.crew.entity.Crew;
import com.example.healthy.crew.service.CrewService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CrewController {
    @Autowired
    private CrewService crewService;
    @GetMapping("/crew")
    public String crewList(Model model, Crew crew){
        List<Crew> crewList = crewService.selectCrewList();

        model.addAttribute("crewList", crewList);

        return "crew.js";
    }

//    크루 등록 컨트롤러
    @PostMapping("/crew/reg")
    public String addCrew(@RequestBody Crew crew){
        crewService.addCrew(crew);
        log.info("crew info : {}",crew);
        return "crew";
    }
}
