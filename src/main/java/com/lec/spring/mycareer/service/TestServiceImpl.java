package com.lec.spring.mycareer.service;

import com.lec.spring.mycareer.domain.Test;
import com.lec.spring.mycareer.repository.TestRepository;

public class TestServiceImpl implements TestService {

    TestRepository testRepository;

    @Override
    public int save(Test test) {
        testRepository.save(test);
        return 1;
    }
}
