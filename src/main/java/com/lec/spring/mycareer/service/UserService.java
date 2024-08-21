package com.lec.spring.mycareer.service;

import com.lec.spring.mycareer.domain.User;
import com.lec.spring.mycareer.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User join(User user) {
        String username = user.getUsername();
        String name = user.getName();
        String password = user.getPassword();
        String email = user.getEmail();
        String identity = user.getIdentity();

        if(userRepository.existsByUsername(username)) {
            System.out.println("이미 사용중인 아이디");
            return null;
        } else if (userRepository.existsByEmail(email)) {
            System.out.println("이미 존재하는 이메일");
            return null;
        }

        user.setUsername(user.getUsername().toUpperCase());
        user.setPassword(passwordEncoder.encode(password));
        user.setName(name);
        user.setEmail(email);
        user.setIdentity(identity);
        user.setRole("ROLE_MEMBER");

        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username.toUpperCase());
    }

}
