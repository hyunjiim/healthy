package com.example.healthy.crew.repository;

import com.example.healthy.crew.entity.Crew;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

//크루 등록
public interface CrewRepository{
    int insertCrew(Crew crew);
    List<Crew> selectCrewList();
}
