package com.lec.spring.mycareer.controller;

import com.lec.spring.mycareer.domain.QuestionDTO;
import com.lec.spring.mycareer.domain.User;
import com.lec.spring.mycareer.domain.UserJoinDTO;
import com.lec.spring.mycareer.service.QuestionDTOService;
import com.lec.spring.mycareer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class MainController {

    private final UserService userService;

    public MainController(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    private QuestionDTOService questionDTOService;

    @PostMapping("/register")
    public String join(@RequestBody UserJoinDTO joinDTO) {
        User user = User.builder()
                .username(joinDTO.getUsername())
                .name(joinDTO.getName())
                .password(joinDTO.getPassword())
                .email(joinDTO.getEmail())
                .identity(joinDTO.getIdentity())
                .build();
        user = userService.join(user);
        if(user == null) return "Join Failed";
        return "Join Ok: " + user;
    }

    @PostMapping("/checkUsername")
    public Boolean checkUsername(@RequestBody UserJoinDTO joinDTO) {
        return userService.findByUsername(joinDTO.getUsername()) != null ;
    }

    @GetMapping("/getTest/{q}")
    public List<QuestionDTO> test(@PathVariable Integer q) {
        return questionDTOService.getQuestionForQ(q);
    }
}
