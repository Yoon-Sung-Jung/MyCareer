package com.lec.spring.mycareer.service;

import com.lec.spring.mycareer.domain.QuestionDTO;

import java.util.List;

public interface QuestionDTOService {

    int save();
    List<QuestionDTO> getAllQuestion(Integer q);
}
