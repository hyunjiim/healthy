package com.example.healthy.user.dao;

import com.example.healthy.user.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

//JPARepository
//JPA(Java Persistence API) : 자바 객체를 관계형 데이터 베이스에 영속적으로 저장하고 조회할 수 있는 ORM 기술에 대한 표준 명세
// => SQL 쿼리를 작성하지 않고도 객체를 통해 데이터베이스 조작 가능
// => 객체 지향적인 코드 작성과 유지 보수성 향상
//JPARepository : JPA를 사용하여 데이터베이스를 조작하기 위한 메서드 제공


public interface RefreshTokenDao extends JpaRepository<RefreshToken, String> {
    Optional<RefreshToken> findById(String id);
    Boolean existsByRefreshToken(String refreshToken);
    Optional<RefreshToken> findByRefreshToken(String refreshToken);
    void deleteByRefreshToken(String refreshToken);
}
