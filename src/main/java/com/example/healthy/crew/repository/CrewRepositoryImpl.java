package com.example.healthy.crew.repository;

import com.example.healthy.crew.entity.Crew;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CrewRepositoryImpl implements CrewRepository{

    private SqlSessionTemplate sqlSessionTemplate;

    @Autowired
    public CrewRepositoryImpl(SqlSessionTemplate sqlSessionTemplate){this.sqlSessionTemplate = sqlSessionTemplate;}

    @Override
    public int insertCrew(Crew crew) {
        return 0;
    }

    @Override
    public List<Crew> selectCrewList() {
        return sqlSessionTemplate.selectList("com.example.healthy.user.mapper.CrewMapper.selectCrewList");
    }
}
