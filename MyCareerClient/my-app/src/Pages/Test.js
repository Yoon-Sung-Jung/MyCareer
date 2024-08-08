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

    const [curPage, setCurPage] = useState(1);
    const itemsPerPage = 10;

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

    const indexOfLastItem = curPage * itemsPerPage; // 현재 페이지의 첫 번째 항목 인덱스
    const indexofFirstItem = indexOfLastItem - itemsPerPage;    // 현재 페이지의 첫 번째 항목 인덱스
    const curItems = data.slice(indexofFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(data.length / itemsPerPage);


    const testResult = (e) => {
        e.preventDefault();

        axios({
            method: "post",
            
        })

    }

    return (
        <>
        <Form onSubmit = {testResult}>
            
            {curItems.map((item) => (
                <div key={item.qitemNo}>
                    <h4>{item.qitemNo}.</h4>
                    <h4>{item.question}</h4>
                    <ul>
                        {item.answer01 !== "null" && (
                            <li>
                                <label>
                                    <input type="radio" name={`answer-${item.qitemNo}`} value={item.answer01} />
                                    {item.answer01}
                                </label>
                            </li>
                        )}
                        {item.answer02 !== "null" && (
                            <li>
                                <label>
                                    <input type="radio" name={`answer-${item.qitemNo}`} value={item.answer02} />
                                    {item.answer02}
                                </label>
                            </li>
                        )}
                        {item.answer03 !== "null" && (
                            <li>
                                <label>
                                    <input type="radio" name={`answer-${item.qitemNo}`} value={item.answer03} />
                                    {item.answer03} 
                                </label>
                            </li>
                        )}
                        {item.answer04 !== "null" && (
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
                        {item.answer06 !== "null" && (
                            <li>
                                <label>
                                    <input type="radio" name={`answer-${item.qitemNo}`} value={item.answer06} />
                                    {item.answer06} 
                                </label>
                            </li>
                        )}
                        {item.answer07 !== "null" && (
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
            
            {/* Pagination 설정 */}
            <div>
                { curPage === 1 ||
                    (<Button onClick = {() => setCurPage(prev => Math.max(prev - 1, 1))}>이전</Button>)
                }
                {curPage} / {totalPages}
                {   curPage === totalPages ||
                <Button onClick = {() => setCurPage(prev => Math.min(prev + 1, totalPages))} disabled = {curPage === totalPages}>다음</Button>
                
            }
            </div>
            {   curPage === totalPages &&
                <Button type="submit">제출</Button>
            }
            </Form>
        </>
    );
};

export default Test;