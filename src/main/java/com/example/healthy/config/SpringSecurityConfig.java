package com.example.healthy.config;

import jakarta.servlet.DispatcherType;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Arrays;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SpringSecurityConfig {

    //private final UserDetailsService userService;

    //Security Filter Chain : Spring Security에서 제공하는 인증, 인가를 위한 필터들의 모음
    //=> 최신 버전의 Spring Security에서 WebConfigureAdapter가 Deprecated 되고, SecurityFilterChain을 이용하도록 권장
    //Http 요청 >> Web Application Server(Servlet Container) >> 필터1 >> 필터2 ... >> 필터n >> Servlet >> Controller
    //1. SecurityFilterChain의 Bean 등록
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors
                        .configurationSource(request -> {
                            CorsConfiguration configuration = new CorsConfiguration();
                            configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
                            configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
                            configuration.setAllowedHeaders(Arrays.asList("Content-Type", "Authorization"));
                            configuration.setAllowCredentials(true);  // Allow credentials 설정
                            return configuration;
                        })
                )
                .authorizeHttpRequests(request -> request
                        .dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll()
                        .anyRequest().authenticated()
                )
                .formLogin(login -> login
                        .defaultSuccessUrl("/main", true)
                        .permitAll()
                )
                .build();
    }
}
