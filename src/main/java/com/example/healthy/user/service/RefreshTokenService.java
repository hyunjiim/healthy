package com.example.healthy.user.service;

import com.example.healthy.user.dao.RefreshTokenDao;
import com.example.healthy.user.entity.RefreshToken;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class RefreshTokenService {
    private final RefreshTokenDao refreshTokenDao;

    public void saveRefreshToken(String id, String newRefreshToken){
        RefreshToken refreshToken = refreshTokenDao.findById(id)
                .orElse(new RefreshToken(id, newRefreshToken));
        refreshToken.update(newRefreshToken);
        refreshTokenDao.save(refreshToken);
    }

    public Boolean existsByRefreshToken(String refreshToken) {
        return refreshTokenDao.existsByRefreshToken(refreshToken);
    }

    public RefreshToken findByRefreshToken(String refreshToken){
        return refreshTokenDao.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new IllegalArgumentException("Unexpected Token"));
    }

    public void deleteByRefreshToken(String refreshToken){
        refreshTokenDao.deleteByRefreshToken(refreshToken);
    }

}
