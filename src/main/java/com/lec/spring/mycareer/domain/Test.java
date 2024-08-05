package com.lec.spring.mycareer.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Test {

    @Id
    private Integer q;

    @OneToMany
    @JoinColumn(name = "q")
    @ToString.Exclude
    private List<QuestionDTO> questions = new ArrayList<>();

    private String test_type;
}
