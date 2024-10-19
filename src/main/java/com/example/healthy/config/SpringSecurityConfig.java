package com.example.healthy.config;

import com.example.healthy.config.jwt.TokenProvider;
import com.example.healthy.user.service.CustomUserDetailsService;
import com.example.healthy.user.service.RefreshTokenService;
import jakarta.servlet.DispatcherType;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Collections;


@Configuration
@EnableWebSecurity
public class SpringSecurityConfig {
    private final AuthenticationConfiguration authenticationConfiguration;
    private final TokenProvider tokenProvider;

    private final CustomUserDetailsService customUserDetailsService;

    private final RefreshTokenService refreshTokenService;

    public SpringSecurityConfig(AuthenticationConfiguration authenticationConfiguration, TokenProvider tokenProvider, CustomUserDetailsService customUserDetailsService, RefreshTokenService refreshTokenService) {
        this.authenticationConfiguration = authenticationConfiguration;
        this.tokenProvider = tokenProvider;
        this.customUserDetailsService = customUserDetailsService;
        this.refreshTokenService = refreshTokenService;
    }

    //AuthenticationManager Bean 등록
    /*
    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http, BCryptPasswordEncoder bCryptPasswordEncoder, CustomUserDetailsService customUserDetailsService){
        //인증 관리자 관련 설정
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(customUserDetailsService);
        authenticationProvider.setPasswordEncoder(bCryptPasswordEncoder);
        return new ProviderManager(authenticationProvider);
    }

     */

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {

        return configuration.getAuthenticationManager();
    }


    //암호화 알고리즘 방식 : Bcrypt
    //Bcrypt : 솔트(salt)를 부여해 여러번 해싱하여 더 안전하게 암호 관리
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){
        //BcryptPasswordEncoder : Spring Security 프레임워크에서 비밀번호를 암호화(해시)하는 데에 사용하는 클래스
        // => 사용자가 제출된 비밀번호와 암호화되어 저장된 비밀번호의 일치 여부를 확인하는 메소드 제공
        // => Bcrypt의 로그 라운드(강도) 설정 가능 - 로그 라운드가 클수록 더 많은 작업 수행 : 기본값(10), 4~31 사이의 값 지정 가능
        // 제공되는 메소드
        // 1. String encode(CharSequence rawPassword) : 패스워드 암호화 메ㅔ소드 - SHA-1 이상의 해시 적용
        // 2. boolean matches(CharSequence rawPassword, String encodePassword) : 제출된 암호와 저장소에 있는 인코딩된 암호가 일치하는지 확인
        // 3. boolean upgradeEncoding(String encodedPassword) : 더 나은 보안을 위해 인코딩된 암호를 다시 인코딩해야 하는 경우 true 반환, 그렇지 않으면 false 반환 - 기본값 : false
        return new BCryptPasswordEncoder();
    }

    // 시큐리티 설정 - SpringSecurity 5.5 이상 SecurityFilterChain 사용
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        //폼 로그인 비활성화
        http.formLogin(AbstractHttpConfigurer::disable);
        // HTTP 기본 인증 비활성화
        http.httpBasic(AbstractHttpConfigurer::disable);
        // CSRF 공격 방어 기능 비활성화
        http.csrf(AbstractHttpConfigurer::disable);

        http
                .cors((cors) -> cors.configurationSource(new CorsConfigurationSource() {
                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                        CorsConfiguration configuration = new CorsConfiguration();
                        configuration.setAllowedOrigins(Collections.singletonList("http://localhost:3000/"));
                        configuration.setAllowedMethods(Collections.singletonList("*"));
                        configuration.setAllowCredentials(true);
                        configuration.setAllowedHeaders(Collections.singletonList("*"));
                        configuration.setMaxAge(3600L);

                        configuration.setExposedHeaders(Collections.singletonList("access"));

                        return configuration;
                    }
                }));

        //인가 설정
        http.authorizeHttpRequests(request -> request
                .requestMatchers(
                        new AntPathRequestMatcher("/login"),
                        new AntPathRequestMatcher("/join"),
                        new AntPathRequestMatcher("/"),
                        new AntPathRequestMatcher("/reissue")
                )
                .permitAll()
                .dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll()
                .anyRequest().authenticated()
        );

        //JWT 인증을 위해 구현한 필터가 UsernamePasswordAuthenticationFilter 이전에 실행되도록 설정
        http.addFilterBefore(new TokenAuthenticationFilter(tokenProvider, customUserDetailsService), LoginFilter.class);
        http.addFilterAt(new LoginFilter(authenticationManager(authenticationConfiguration), tokenProvider, refreshTokenService), UsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(new CustomLogoutFilter(tokenProvider, refreshTokenService), LogoutFilter.class);

        //세션 관리 정책 설정
        // 세션 인증을 사용하지 않고, JWT를 사용하여 인증하기 때문에 세션이 필요하지 않음
        http.sessionManagement( management -> management
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOriginPattern("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

}
