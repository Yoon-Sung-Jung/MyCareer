import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const TestProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const q = location.state?.q; // 안전하게 q값 가져오기

    const qId = parseInt(q);

    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [trgetSe, setTrgetSe] = useState('');
    const [eId, setEmailId] = useState('');
    const [eDomain, setEmailDomain] = useState('');
    const [grade, setGrade] = useState('');


    const handleGender = (e) => {
        setGender(e.target.value);
    };

    const handleEDomain = (e) => {
        setEmailDomain(e.target.value);
    };

    const handleTrget = (e) => {
        setTrgetSe(e.target.value);
    };

    const handleGrade = (e) => {
        if(grade === e.target.value)
            setGrade(null);
        else 
            setGrade(e.target.value);
    };

    const setProfile = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const eId = e.target.eId.value;
        const email = `${eId}@${eDomain}`;


        console.log(username);
        console.log(gender);
        console.log(email);
        console.log(trgetSe);

        navigate('/test', {
            state: {
                q: q,
                name: username,
                gender: gender,
                trgetSe: trgetSe,
                email: email,
                grade: grade
            }
        });
    };

    return (
        <>
            <Form onSubmit={setProfile}>

                <label htmlFor="username">
                    이름
                </label>
                <input type="text" id="username" name="username" placeholder='이름을 입력하세요' required />
                {name}
                <br />
                성별 선택
                <label htmlFor="genderM">
                    <input
                        id="genderM"
                        name="gender"
                        type="radio"
                        value="100323"
                        checked={gender === '100323'}
                        onChange={handleGender}
                    />
                    남자
                </label>
                <label>
                    <input
                        id="genderF"
                        name="gender"
                        type="radio"
                        value="100324"
                        checked={gender === '100324'}
                        onChange={handleGender}
                    />
                    여자
                </label>

                <br />
                이메일
                <label htmlFor='eID'>
                    <input
                        type="text"
                        name="eId"
                    >
                    </input>
                </label>
                @
                <input type="text" name="eDomain" value={eDomain} />
                <select name="eDomain" onChange={handleEDomain}>
                    <option>
                        직접입력
                    </option>
                    <option value="naver.com">
                        naver.com
                    </option>
                    <option value="gmail.com">
                        gmail.com
                    </option>
                    <option value="daum.net">
                        daum.net
                    </option>
                </select>
                <br />
                검사 구분
                <label>
                    <select value={trgetSe} onChange={handleTrget}>
                        {trgetSe === '' && <option value="">선택하세요</option>}
                        {
                            (qId == 30 || qId == 31 || (qId >= 20 && qId <= 27))
                            &&
                            (
                                <>
                                    <option value='100206'>
                                        중학생
                                    </option>
                                    <option value='100207'>
                                        고등학생
                                    </option>
                                </>
                            )
                        }
                        {
                            (qId >= 6 && qId <= 10 || qId == 19)
                            &&
                            (
                                <>
                                    <option value='100208'>
                                        대학생
                                    </option>
                                    <option value='100209'>
                                        일반
                                    </option>
                                </>
                            )
                        }
                    </select>
                </label>
                {
                    (trgetSe == 100206 || trgetSe == 100207 || trgetSe == 100208)
                    && (
                        <>
                            <label>
                                <input type="checkbox" value="1" checked={grade == "1"} onChange={handleGrade}/>1학년
                            </label>
                            <label>
                                <input type="checkbox" value="2" checked={grade == "2"} onChange={handleGrade}/>2학년

                            </label>
                            <label>
                                <input type="checkbox" value="3" checked={grade == "3"} onChange={handleGrade}/>3학년
                            </label>
                            {trgetSe == 100208 && (
                                <>
                                    <label>
                                        <input type="checkbox" name="grade" value="4" checked={grade == "4"} onChange={handleGrade}/>4학년
                                    </label>
                                </>
                            )}
                        </>
                    )
                }
                <br />
                <Button type="submit">검사 시작</Button>
            </Form >
        </>
    );
};

export default TestProfile;