package com.lec.spring.mycareer.config;

import com.lec.spring.mycareer.jwt.JWTFilter;
import com.lec.spring.mycareer.jwt.JWTUtil;
import com.lec.spring.mycareer.jwt.LoginFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    //OAuth2 Client
//    @Autowired
//    private PrincipalOauth2UserService principalOauth2UserService;

    private final AuthenticationConfiguration authenticationConfiguration;

    private final JWTUtil jwtUtil;
    private final AuthenticationConfiguration authenticationConfiguration;

    public SecurityConfig(AuthenticationConfiguration authenticationConfiguration, JWTUtil jwtUtil) {
        this.authenticationConfiguration = authenticationConfiguration;
        this.jwtUtil = jwtUtil;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http

                .csrf(csrf -> csrf.disable())   // CSRF(Cross-site Request Forgery: 사이트 간 요청 위조)

                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()
                        .requestMatchers("/member").hasAnyRole("MEMBER")
                        .anyRequest().permitAll()
                )

                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .addFilterBefore(new JWTFilter(jwtUtil), LogoutFilter.class)

//                .addFilterAt(new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil))
                .build();
    }

}
