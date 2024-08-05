package com.lec.spring.mycareer.repository;

import com.lec.spring.mycareer.domain.Test;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TestRepository extends JpaRepository<Test, Integer> {
}
