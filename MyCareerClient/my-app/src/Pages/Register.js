import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const Register = () => {

    const navigate = useNavigate();

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const repasswordRef = useRef(null);
    const pwCheckRef = useRef(null);

    const [isClicked, setClicked] = useState(false);
    const [usernameChecked, setChecked] = useState(false);

    const [user, setUser] = useState({
        username: '',
        name: '',
        password: '',
        emailID: '',
        emailDomain: '',
        identity: '',
    });

    const checkUsername = (e) => {
        e.preventDefault();
        if (user.username.length === 0) {
            alert('아이디를 입력해주세요');
            usernameRef.current.focus();
        } else {
            axios({
                method: "post",
                url: "http://localhost:8080/checkUsername",
                data: {
                    "username": user.username
                }
            })
                .then((response) => {
                    const { data, status } = response;
                    if (data == false) {
                        alert('사용 가능한 닉네임입니다');
                        setChecked(true);
                    } else {
                        alert('이미 사용중인 닉네임입니다');
                        usernameRef.current.focus();

                    }
                })
        }
    }

    const [rePassword, setRePassword] = useState('');

    const handleRePW = (e) => {
        setRePassword(e.target.value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const checkPassword = () => {

        if (user.password.length == 0) {
            alert('먼저 비밀번호를 입력해주세요');
            passwordRef.current.focus();
        } else if (user.password === rePassword) {
            setClicked(true);
            alert('비밀번호 확인이 완료 되었습니다');
        } else {
            alert('비밀번호가 맞지 않습니다');
            repasswordRef.current.focus();
        }
    };

    const registerUser = (e) => {
        e.preventDefault();
        if (usernameChecked === false) {
            alert('아이디 중복 확인이 필요합니다');
        }
        else if (isClicked === false) {
            alert('비밀번호 확인 먼저 확인해주세요');
        } else {
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


    }
    return (
        <>
            <Form onSubmit={registerUser}>
                <div>
                    <label htmlFor='username'>아이디</label>
                    <input type="text"
                        name="username"
                        id="username"
                        value={user.username}
                        onChange={handleChange}
                        ref={usernameRef} />
                    <Button onClick={checkUsername}>중복 확인</Button>
                </div>

                <div>
                    <label htmlFor='name'>이름</label>
                    <input type="text"
                        name="name"
                        id="name"
                        value={user.name}
                        onChange={handleChange} />
                </div>

                <div>
                    <label>비밀번호</label>
                    <input type="password"
                        name="password"
                        id="password"
                        value={user.password}
                        ref={passwordRef}
                        onChange={handleChange} />
                </div>

                <div>
                    <label>
                        <input type="password"
                            name="rePassword"
                            id="rePassword"
                            value={rePassword}
                            ref={repasswordRef}
                            onChange={handleRePW} />
                    </label>
                    <Button onClick={checkPassword} ref={pwCheckRef}>비밀번호 확인</Button>
                </div>


                <div>
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
                </div>

                <div>
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
                </div>
                <Button type="submit">회원가입</Button>

            </Form>
        </>
    );
};

export default Register;