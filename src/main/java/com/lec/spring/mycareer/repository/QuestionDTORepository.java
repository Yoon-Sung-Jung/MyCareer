package com.lec.spring.mycareer.repository;

import com.lec.spring.mycareer.domain.QuestionDTO;
import com.lec.spring.mycareer.domain.QuestionId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionDTORepository extends JpaRepository<QuestionDTO, QuestionId> {
    List<QuestionDTO> findByQ(Integer q);
}
