package com.lec.spring.mycareer.controller;

import com.lec.spring.mycareer.domain.QuestionDTO;
import com.lec.spring.mycareer.service.QuestionDTOService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class MainController {

    @Autowired
    private QuestionDTOService questionDTOService;

    @GetMapping("/getTest/{q}")
    public List<QuestionDTO> test(@PathVariable Integer q) {
        return questionDTOService.getQuestionForQ(q);
    }
}
