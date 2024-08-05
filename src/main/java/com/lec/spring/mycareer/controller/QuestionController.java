package com.lec.spring.mycareer.controller;

import com.lec.spring.mycareer.service.QuestionDTOService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class QuestionController {
    @Autowired
    private QuestionDTOService questionDTOService;

    @GetMapping("/saveQuestion")
    public int saveQuestion() {
        System.out.println("문제 저장 시작");
        return questionDTOService.save();
    }
}
