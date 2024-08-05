package com.lec.spring.mycareer.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lec.spring.mycareer.domain.QuestionDTO;
import com.lec.spring.mycareer.domain.Test;
import com.lec.spring.mycareer.repository.QuestionDTORepository;
import com.lec.spring.mycareer.repository.TestRepository;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;
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
    private TestRepository testRepository;

    @Override
    public int save() {

        String url =
                baseUrl +
                        "?apikey=" + apiKey +
                        "&q=" + "30";

        System.out.println("요청 URL : " + url);

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

            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObject = (JSONObject) jsonParser.parse(result);

            JSONObject parseResponse = (JSONObject) jsonObject.get("response");

            JSONObject parseBody = (JSONObject) parseResponse.get("body");

            JSONObject parseItems = (JSONObject) parseBody.get("items");

            JSONArray array = (JSONArray) parseItems.get("item");

            for (int i = 0; i < array.size(); i++) {
                JSONObject item = (JSONObject) array.get(i);
                QuestionDTO questionDTO = new QuestionDTO(

                );
            }





        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

        return 1;
    }


    @Override
    public List<QuestionDTO> getAllQuestion(Integer q) {
        return List.of();
    }
}
