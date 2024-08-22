import React from 'react';
import { Button, Form } from 'react-bootstrap';


const registerUser = (e) => {
    e.preventDefault();

}

const Register = () => {
    return (
        <>
            <Form onSubmit={registerUser}>
                <label htmlFor='username'>아이디</label>
                <input type="text" name="username" id="username"/>
                <Button>중복 확인</Button>
                <label htmlFor='name'>이름</label>
                <input type="text" name="name" id="name"/>
                <label>이메일</label>
                <input type="text" name="emailID" id="emailID"/>
                @
                <input type="text" name="emailDomain" id="emailDomain"/>

                <Button type="submit">회원가입</Button>

            </Form>
        </>
    );
};

export default Register;