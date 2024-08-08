import React, { useEffect, useState } from 'react';
import TestType from './TestType';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

const Test = () => {
    const location = useLocation();
    const url = "https://www.career.go.kr/inspct/openapi/test/questions";
    const api_key = '9f936b2680d7a09e5fe0d0bd0ed402f4';
    const q = location.state?.q; // 안전하게 q값 가져오기

    console.log('q값 받아옴', q);

    const [data, setData] = useState([]); // 초기 상태를 빈 배열로 설정
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/getTest/${q}`);
                const { data, status } = response;

                if (status === 200) {
                    console.log('불러오기', data);
                    setData(data);
                } else {
                    alert('불러오기 실패');
                }
            } catch (error) {
                console.error('API 요청 오류:', error);
                setError('불러오는 중 오류 발생');
            } finally {
                setLoading(false); // 요청이 끝나면 로딩 상태를 false로 변경
            }
        };

        if (q) { // q가 존재할 때만 fetchData 호출
            fetchData(); // 데이터 가져오기 호출
        }
    }, [q]); // q가 변경될 때마다 호출

    if (loading) {
        return <p>데이터를 불러오는 중...</p>; // 로딩 상태 표시
    }

    if (error) {
        return <p>{error}</p>; // 오류 메시지 표시
    }

    return (
        <>
        <Form onSubmit = "">
            
            {data.map((item) => (
                <div key={item.qitemNo}>
                    <h4>{item.qitemNo}.</h4>
                    <h4>{item.question}</h4>
                    <ul>
                        {item.answer01 && (
                            <li>
                                <label>
                                    <input type="radio" name={`answer-${item.qitemNo}`} value={item.answer01} />
                                    {item.answer01}
                                </label>
                            </li>
                        )}
                        {item.answer02 && (
                            <li>
                                <label>
                                    <input type="radio" name={`answer-${item.qitemNo}`} value={item.answer02} />
                                    {item.answer02}
                                </label>
                            </li>
                        )}
                        {item.answer03 && (
                            <li>
                                <label>
                                    <input type="radio" name={`answer-${item.qitemNo}`} value={item.answer03} />
                                    {item.answer03} 
                                </label>
                            </li>
                        )}
                        {item.answer04 && (
                            <li>
                                <label>
                                    <input type="radio" name={`answer-${item.qitemNo}`} value={item.answer04} />
                                    {item.answer04} 
                                </label>
                            </li>
                        )}
                        {item.answer05 !== "null" && (
                            <li>
                                <label>
                                    <input type="radio" name={`answer-${item.qitemNo}`} value={item.answer05} />
                                    {item.answer05} 
                                </label>
                            </li>
                        )}
                        {item.answer06 != "null" && (
                            <li>
                                <label>
                                    <input type="radio" name={`answer-${item.qitemNo}`} value={item.answer06} />
                                    {item.answer06} 
                                </label>
                            </li>
                        )}
                        {item.answer07 != "null" && (
                            <li>
                                <label>
                                    <input type="radio" name={`answer-${item.qitemNo}`} value={item.answer07} />
                                    {item.answer07} 
                                </label>
                            </li>
                        )}
                    </ul>
                </div>
            ))}
            <Button type="submit">제출</Button>
            </Form>
        </>
    );
};

export default Test;