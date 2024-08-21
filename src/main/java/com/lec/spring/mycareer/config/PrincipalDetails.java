package com.lec.spring.mycareer.config;

import com.lec.spring.mycareer.domain.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

public class PrincipalDetails implements UserDetails {

    private User user;

    public User getUser() {
        return this.user;
    }

    public PrincipalDetails(User user) {
        System.out.println("UserDetails(user) 생성: " + user);
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        System.out.println("getAuthorities() 호출");
        Collection<GrantedAuthority> collect = new ArrayList<>();

        if (user.getRole() == null) return collect;

        Arrays.stream(user.getRole().split(","))
                .forEach(auth -> collect.add(new GrantedAuthority() {
                    @Override
                    public String getAuthority() {
                        return auth.trim();
                    }

                    @Override
                    public String toString() {
                        return auth.trim();
                    }
                }));
        return collect;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}
