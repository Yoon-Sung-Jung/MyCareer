import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TestType = () => {
    const navigate = useNavigate();

    const [q, setQ] = useState('');

    const changeValue = (e) => {
        setQ(e.target.value);
    };

    const selectTest = (e) => {
        e.preventDefault();

        navigate('/test', {
            state: {
                q: e.target.value   // 선택된 value 값 전달
            }
        });
    };

    return (
        <>
            <div>
                <h3>중・고등학생용 심리검사</h3>
                <Button value="30" onClick={selectTest}>
                    직업흥미검사(K) – 중학생
                </Button>
                <Button value="20" onClick={selectTest}>
                    직업적성검사 - 중학생
                </Button>
                <Button value="22" onClick={selectTest}>
                    진로성숙도검사 - 중학생
                </Button>
                <Button value="24" onClick={selectTest}>
                    직업가치관검사 - 중학생
                </Button>
                <Button value="26" onClick={selectTest}>
                    진로개발역량검사 - 중학생
                </Button>
                <Button value="31" onClick={selectTest}>
                    직업흥미검사(K) – 고등학생
                </Button>
                <Button value="21" onClick={selectTest}>
                    직업적성검사 - 고등학생
                </Button>
                <Button value="23" onClick={selectTest}>
                    진로성숙도검사 - 고등학생
                </Button>
                <Button value="25" onClick={selectTest}>
                    직업가치관검사 - 고등학생
                </Button>
                <Button value="27" onClick={selectTest}>
                    진로개발역량검사 - 고등학생
                </Button>
            </div>

            <div>
                <h3>일반∙대학생용 심리검사</h3>
                <Button value="8" onClick={selectTest}>
                    진로개발준비도검사
                </Button>
                <Button value="9" onClick={selectTest}>
                    이공계전공적합도검사
                </Button>
                <Button value="10" onClick={selectTest}>
                    주요능력효능감검사
                </Button>
                <Button value="19" onClick={selectTest}>
                    진로흥미탐색
                </Button>
                <Button value="6" onClick={selectTest}>
                    직업가치관검사 
                </Button>
            </div>
            {/* <Form onSubmit={selectTest}>
                <Form.Group controlId="formBasicTest" className="mt-3">
                    <Form.Label><h5>검사 유형</h5></Form.Label>
                    <Form.Select name="q" id="q" onChange={changeValue}>
                        <option value="">-- 검사 유형을 선택해 주세요 --</option>
                        <option value="30">직업흥미검사(K) – 중학생</option>
                        <option value="31">직업흥미검사(K) – 고등학생</option>
                        <option value="8">진로개발준비도검사</option>
                        <option value="9">이공계전공적합도검사</option>
                        <option value="10">주요능력효능감검사</option>
                        <option value="19">진로흥미탐색</option>
                        <option value="32">진로개발역량 - 초등학생</option>
                        <option value="20">직업적성검사 - 중학생</option>
                        <option value="21">직업적성검사 - 고등학생</option>
                        <option value="22">진로성숙도검사 - 중학생</option>
                        <option value="23">진로성숙도검사 - 고등학생</option>
                        <option value="24">직업가치관검사 - 중학생</option>
                        <option value="25">직업가치관검사 - 고등학생</option>
                        <option value="6">직업가치관검사 - 일반,대학생</option>
                        <option value="26">진로개발역량검사 - 중학생</option>
                        <option value="27">진로개발역량검사 - 고등학생</option>
                    </Form.Select>
                </Form.Group>
                <Button type="submit">검사하러 가기</Button>
            </Form> */}
        </>
    );
};

export default TestType;
