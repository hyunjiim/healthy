package com.example.healthy.crew.service;

import com.example.healthy.crew.entity.Crew;
import com.example.healthy.crew.repository.CrewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CrewService {

    @Autowired
    private CrewRepository crewRepository ;
    public void addCrew(Crew crew){
        crewRepository.save(crew);
    }
}
