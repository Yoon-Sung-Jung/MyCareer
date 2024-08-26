package com.lec.spring.mycareer.jwt;

import com.lec.spring.mycareer.config.PrincipalDetails;
import io.jsonwebtoken.io.IOException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.Collection;
import java.util.stream.Collectors;

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

    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult)
//            throws IOException, ServletException
            {
                System.out.println("successfulAuthentication() 호출: 인증 성공");
                System.out.println("\tAuthentication: " + authResult);

                PrincipalDetails userDetails = (PrincipalDetails) authResult.getPrincipal();

                Long id = userDetails.getUser().getId();
                String username = userDetails.getUsername();

                Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();
                String role = authorities.stream()
                        .map(grantedAuthority -> grantedAuthority.getAuthority())
                        .collect(Collectors.joining(","));

                String token = jwtUtil.createJwt(id, username, role, 30 * 60 * 1000L);

                response.addHeader("Authorization", "Bearer" + token);
    }

    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        System.out.println("LoginFilter.unsuceesfulAuthentication() 호출: 인증 실패");

        response.setStatus(401);
    }
}
