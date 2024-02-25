package com.example.healthy.crew.mapper;

import com.example.healthy.crew.entity.Crew;
import lombok.extern.log4j.Log4j;
import lombok.extern.log4j.Log4j2;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface CrewMapper {
    //크루 등록 메소드
    public int insertCrew(Crew crew);
    List<Crew> selectCrewList();

}
