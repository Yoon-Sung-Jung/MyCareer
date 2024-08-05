package com.lec.spring.mycareer.repository;

import com.lec.spring.mycareer.domain.QuestionDTO;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionDTORepository extends JpaRepository<QuestionDTO, Integer> {
}
