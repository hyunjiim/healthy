package com.example.healthy.crew.service;

import com.example.healthy.crew.entity.Crew;
import com.example.healthy.crew.repository.CrewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public  class CrewService {
    @Autowired
    private final CrewRepository crewRepository;

    public List<Crew> selectCrewList() {
        return crewRepository.selectCrewList();
    }

    public void addCrew(Crew crew) {
            }
}