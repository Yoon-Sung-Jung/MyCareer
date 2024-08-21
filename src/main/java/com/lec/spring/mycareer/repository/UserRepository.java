package com.lec.spring.mycareer.repository;

import com.lec.spring.mycareer.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    User findByUsername(String username);
}
