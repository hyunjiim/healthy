package com.example.healthy.crew.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.sql.Date;

@Entity
public class Crew {
    @Id //Primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)//identity가 maria/mysql에서 사용
    private Integer idx;
    private Integer userIdx;
    private String subject;
    private String category;
    private String content;
    private String img1;
    private String img2;
    private Date creationDate;
    private Integer crewCount;
    private Integer enjoyCunt;
    private Date endDate;
    private Date startDate;
    private String location;





}