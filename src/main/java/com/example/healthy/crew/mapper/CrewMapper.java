package com.example.healthy.crew.mapper;

import com.example.healthy.crew.entity.Crew;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CrewMapper {
    //크루 등록 메소드
    public int insertCrew(Crew crew);


}
