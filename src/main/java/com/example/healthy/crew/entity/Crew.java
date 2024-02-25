package com.example.healthy.crew.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@RequiredArgsConstructor
@Data
@Setter
@Getter
public class Crew {
    private Integer idx;
    private Integer userIdx;
    private String subject;
    private String category;
    private String content;
    private String img1;
    private String img2;
    private String creationDate;
    private Integer crewCount;
    private String endDate;
    private String startDate;
    private String location;





}