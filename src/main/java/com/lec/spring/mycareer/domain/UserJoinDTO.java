package com.lec.spring.mycareer.domain;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserJoinDTO {
    private String username;
    private String name;
    private String password;
    private String email;
    private String identity;
}
