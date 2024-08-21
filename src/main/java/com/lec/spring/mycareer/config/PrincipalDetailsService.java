package com.lec.spring.mycareer.config;

import com.lec.spring.mycareer.domain.User;
import com.lec.spring.mycareer.service.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class PrincipalDetailsService implements UserDetailsService {

    private final UserService userService;

    public PrincipalDetailsService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("loadUserByUsername(" + username + ") 호출");

        User user = userService.findByUsername(username);

        if(user != null) {
            return new PrincipalDetails(user);
        }

        throw new UsernameNotFoundException(username);
    }
}
