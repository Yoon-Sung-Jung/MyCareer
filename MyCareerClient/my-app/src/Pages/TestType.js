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

        navigate('/testprofile', {
            state: {
                q: e.target.value   // 선택된 value 값 전달
            }
        });
    }

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
        </>
    );
};

export default TestType;
