package com.lec.spring.mycareer.controller;

import com.lec.spring.mycareer.domain.User;
import com.lec.spring.mycareer.domain.UserJoinDTO;
import com.lec.spring.mycareer.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public String join(@RequestBody UserJoinDTO joinDTO) {
        User user = User.builder()
                .username(joinDTO.getUsername())
                .password(joinDTO.getPassword())
                .email(joinDTO.getEmail())
                .identity(joinDTO.getIdentity())
                .build();
        user = userService.join(user);
        if(user == null) return "Join Failed";
        return "Join Ok: " + user;
    }
}
