package com.example.healthy.crew.service;

import com.example.healthy.crew.entity.Crew;
import com.example.healthy.crew.mapper.CrewMapper;
import com.example.healthy.crew.repository.CrewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Slf4j
@Service
@RequiredArgsConstructor
public  class CrewService {
    @Autowired
    private final CrewRepository crewRepository;

    public List<Crew> selectCrewList() {
        log.info("crewMapper확인:{}",crewRepository.selectCrewList());
        System.out.printf("mapper확인"+crewRepository.selectCrewList());
        return crewRepository.selectCrewList();
    }

    public void addCrew(Crew crew) {
            }
}