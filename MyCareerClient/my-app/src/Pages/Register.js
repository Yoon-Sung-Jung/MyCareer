import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const Register = () => {

    const navigate = useNavigate();


    const [identity, setIdentity] = useState('');

    const [user, setUser] = useState({
        username: '',
        name: '',
        password: '',
        emailID: '',
        emailDomain: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleId = (e) => {
        setIdentity(e.target.value);
    }


    const registerUser = (e) => {
        e.preventDefault();

        axios({
            method: "post",
            url: "http://localhost:8080/register",
            data: {
                "username": user.username,
                "name": user.name,
                "password": user.password,
                "email": `${user.emailID}@${user.emailDomain}`,
                "identity": user.identity
            }
        })
            .then((response) => {
                const { data, status } = response;
                if (status === 200) {
                    alert('가입 완료');
                    navigate(`/login`)
                } else {
                    alert('가입에 실패하였습니다.')
                    // todo
                }

            })

    }
    return (
        <>
            <Form onSubmit={registerUser}>
                <label htmlFor='username'>아이디</label>
                <input type="text"
                    name="username"
                    id="username"
                    value={user.username}
                    onChange={handleChange} />
                <Button onClick="">중복 확인</Button>

                <label htmlFor='name'>이름</label>
                <input type="text"
                    name="name"
                    id="name"
                    value={user.name}
                    onChange={handleChange} />

                <label>비밀번호</label>
                <input type="password"
                    name="password"
                    id="password"
                    value={user.password}
                    onChange={handleChange} />

                <label>이메일</label>
                <input type="text"
                    name="emailID"
                    id="emailID"
                    value={user.emailID}
                    onChange={handleChange} />
                @
                <input type="text"
                    name="emailDomain"
                    id="emailDomain"
                    value={user.emailDomain}
                    onChange={handleChange} />

                <label>신분</label>
                <label>
                    학생<input
                        type="radio"
                        id="identityS"
                        name="identity"
                        value="학생"
                        onChange={handleChange} />
                </label>
                <label>
                    일반<input
                        type="radio"
                        id="identityG"
                        name="identity"
                        value="일반"
                        onChange={handleChange} />

                </label>
                <label>
                    교사<input
                        type="radio"
                        id="identityT"
                        name="identity"
                        value="교사"
                        onChange={handleChange} />
                </label>
                <Button type="submit">회원가입</Button>

            </Form>
        </>
    );
};

export default Register;