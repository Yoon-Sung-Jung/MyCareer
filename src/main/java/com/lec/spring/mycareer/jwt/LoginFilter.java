package com.lec.spring.mycareer.jwt;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    private final JWTUtil jwtUtil;

    public LoginFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletRequest response) throws AuthenticationException {
        String username = obtainUsername(request);
        String password = obtainPassword(request);

        Authentication token = new UsernamePasswordAuthenticationToken(username.toUpperCase(), password, null);

        return authenticationManager.authenticate(token);
    }
}
