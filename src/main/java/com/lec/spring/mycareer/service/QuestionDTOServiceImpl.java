package com.lec.spring.mycareer.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lec.spring.mycareer.domain.QuestionDTO;
import com.lec.spring.mycareer.repository.QuestionDTORepository;
import com.lec.spring.mycareer.repository.TestRepository;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Service
public class QuestionDTOServiceImpl implements QuestionDTOService {

    private String apiKey = "9f936b2680d7a09e5fe0d0bd0ed402f4";
    private String baseUrl = "http://www.career.go.kr/inspct/openapi/test/questions";

    private QuestionDTORepository questionDTORepository;

    private QuestionDTOServiceImpl(QuestionDTORepository questionDTORepository) {
        this.questionDTORepository = questionDTORepository;
    }

    private TestRepository testRepository;

    @Override
    public int save() {

        String url =
                baseUrl +
                        "?apikey=" + apiKey +
                        "&q=" + "27";


        String result = "";

        try {
            HttpURLConnection conn = (HttpURLConnection) new URL(url).openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-Type", "application/json");

            BufferedReader br;
            if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
                br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            } else {
                br = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
            }

            result = br.readLine();

            JsonNode jsonNode = new ObjectMapper().readTree(result);

            JsonNode questions = jsonNode.get("RESULT");

//            System.out.println(questions.toString());

            for (JsonNode question : questions) {
                QuestionDTO q = QuestionDTO.builder()
                        .qitemNo(question.get("qitemNo").asInt())
                        .question(question.get("question").asText())
                        .answer01(question.get("answer01").asText())
                        .answer02(question.get("answer02").asText())
                        .answer03(question.get("answer03").asText())
                        .answer04(question.get("answer04").asText())
                        .answer05(question.get("answer05").asText())
                        .answer06(question.get("answer06").asText())
                        .answer07(question.get("answer07").asText())
                        .answer08(question.get("answer08").asText())
                        .answer09(question.get("answer09").asText())
                        .answer10(question.get("answer10").asText())
                        .answerScore01(question.get("answerScore01").asText())
                        .answerScore02(question.get("answerScore02").asText())
                        .answerScore03(question.get("answerScore03").asText())
                        .answerScore04(question.get("answerScore04").asText())
                        .answerScore05(question.get("answerScore05").asText())
                        .answerScore06(question.get("answerScore06").asText())
                        .answerScore07(question.get("answerScore07").asText())
                        .answerScore08(question.get("answerScore08").asText())
                        .answerScore09(question.get("answerScore09").asText())
                        .answerScore10(question.get("answerScore10").asText())
                        .tip1Score(question.get("tip1Score").asInt())
                        .tip2Score(question.get("tip2Score").asInt())
                        .tip1Desc(question.get("tip1Desc").asText())
                        .tip2Desc(question.get("tip2Desc").asText())
                        .tip3Desc(question.get("tip3Desc").asText())
                        .build();
                q.setQ(27);
                System.out.println("q = " + q);
                questionDTORepository.save(q);
            }
            System.out.println("요청 URL : " + url);
            System.out.println("저장 완료.");


        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return 1;
    }


    @Override
    public List<QuestionDTO> getQuestionForQ(Integer q) {
        List<QuestionDTO> questionDTOList = new ArrayList<>();
        for (QuestionDTO questionDTO : questionDTORepository.findByQ(q)) {
            questionDTOList.add(questionDTO);
        }

        return questionDTOList;
    }
}
