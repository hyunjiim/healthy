package com.example.healthy.crew.mapper;

import com.example.healthy.crew.entity.Crew;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CrewMapper {
    //크루 등록 메소드
    public int insertCrew(Crew crew);
    List<Crew> selectCrewList();

}
