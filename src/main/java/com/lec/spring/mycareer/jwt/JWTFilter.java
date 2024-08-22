package com.lec.spring.mycareer.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;

    public JWTFilter(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String authorization = request.getHeader("Authorization");

        if(authorization == null || !authorization.startsWith("Bearer ")) {
            System.out.println("\tJWT 없음");
            return;
        }

        String token = authorization.split(" ")[1];
        System.out.println("\t 현재 token: " + token);

        // 토큰 만료
        if(jwtUtil.isExpired(token)) {
            System.out.println("\t token 만료.");
            filterChain.doFilter(request, response);
            return;
        }

        Long id = jwtUtil.getId(token);
        String username = jwtUtil.getUsername(token);
        String role = jwtUtil.getRole(token);

    }
}
