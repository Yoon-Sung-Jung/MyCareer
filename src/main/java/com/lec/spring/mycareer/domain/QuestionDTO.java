package com.lec.spring.mycareer.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(QuestionId.class)
@Entity(name = "Question")
public class QuestionDTO {
    @Id
    private Integer qitemNo;

    @Id
    @Column
    private Integer q;

    private String question;

    private String answer01;
    private String answer02;
    private String answer03;
    private String answer04;
    private String answer05;
    private String answer06;
    private String answer07;
    private String answer08;
    private String answer09;
    private String answer10;

    private String answerScore01;
    private String answerScore02;
    private String answerScore03;
    private String answerScore04;
    private String answerScore05;
    private String answerScore06;
    private String answerScore07;
    private String answerScore08;
    private String answerScore09;
    private String answerScore10;

    private Integer tip1Score;
    private Integer tip2Score;
    private Integer tip3Score;

    private String tip1Desc;
    private String tip2Desc;
    private String tip3Desc;

}
