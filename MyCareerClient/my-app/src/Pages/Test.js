import React, { useEffect, useRef, useState } from 'react';
import TestType from './TestType';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

const Test = () => {
    const location = useLocation();
    const api_key = '9f936b2680d7a09e5fe0d0bd0ed402f4';
    const q = location.state?.q; 
    const name = location.state?.name;
    const gender = location.state?.gender;
    const trgetSe = location.state?.trgetSe;
    const email = location.state?.email;
    const grade = location.state?.grade;
    const qId = parseInt(q);


    console.log(`${email}, ${name}, ${gender}, ${trgetSe}, ${q}, ${grade}`);

    const [data, setData] = useState([]); // 초기 상태를 빈 배열로 설정
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [curPage, setCurPage] = useState(1);
    const itemsPerPage = 10;

    const [answers, setAnswers] = useState({});

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

    // 선택한 답 처리
    const chageValue = (e) => {
        const { name, value } = e.target;
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [name]: value
        }));
    }


    const testResult = (e) => {
        e.preventDefault();

        let formattedAnswers = "";

        for (const [key, value] of Object.entries(answers)) {

            // q가 30, 31일 경우, answer 값은 A1=3 A2=2 ...
            if (qId === 30 || qId === 31) {
                formattedAnswers += `A${key}=${value} `;
            }

            // q가 8, 9, 10 일 경우, answer 값은 2,2,2,3,...
            if (qId >= 8 && qId <= 10) {
                formattedAnswers += `${value},`;
            }

            // q가 19, 20, 21, 22, 23, 24, 25, 26, 27 일 경우, answer 값은 1=5 2=4 3=4 ...
            if (qId >= 19 && qId <= 27) {
                formattedAnswers += `${key}=${value} `;
            }

            // q가 6 일 경우, answer 값은 B1=1 B2=4
            if (qId === 6) {
                formattedAnswers += `B${key}=${value} `;
            }

        }

        formattedAnswers = formattedAnswers.trimEnd(); 

        console.log("답안:" + formattedAnswers);
        axios({
            method: "post",
            url: "http://www.career.go.kr/inspct/openapi/test/report",
            data: {
                "apikey": api_key,
                "qestrnSeq": q,
                "trgetSe": trgetSe,
                "name": name,
                "gender": gender,
                "school": "",
                "grade": grade,
                "email": email,
                "startDtm": 1550466291034,
                "answers": formattedAnswers 
            }
        })
            .then((response) => {
                const url = response.data.RESULT.url;
                window.location.href = url;
            })

    }

    const nextPage = () => {
        setCurPage(prev => Math.min(prev + 1, totalPages))
    }

    const prevPage = () => {
        setCurPage(prev => Math.max(prev - 1, 1)) 
    }
    return (
        <>
            <Form onSubmit={testResult}>

                {curItems.map((item) => (
                    <div key={item.qitemNo}>
                        <h4>{item.qitemNo}</h4>
                        <h4>{item.question}</h4>
                        <ul>
                            {item.answer01 !== "null" && (
                                <li>
                                    <label>
                                        <input type="radio"
                                            name={`${item.qitemNo}`}
                                            value={item.answerScore01}
                                            checked={answers[item.qitemNo] === item.answerScore01}
                                            onChange={chageValue} />
                                        {item.answer01}
                                    </label>
                                </li>
                            )}
                            {item.answer02 !== "null" && (
                                <li>
                                    <label>
                                        <input type="radio"
                                            name={`${item.qitemNo}`}
                                            value={item.answerScore02}
                                            checked={answers[item.qitemNo] === item.answerScore02}
                                            onChange={chageValue} />
                                        {item.answer02}
                                    </label>
                                </li>
                            )}
                            {item.answer03 !== "null" && (
                                <li>
                                    <label>
                                        <input type="radio"
                                            name={`${item.qitemNo}`}
                                            value={item.answerScore03}
                                            checked={answers[item.qitemNo] === item.answerScore03}
                                            onChange={chageValue} />
                                        {item.answer03}
                                    </label>
                                </li>
                            )}
                            {item.answer04 !== "null" && (
                                <li>
                                    <label>
                                        <input type="radio"
                                            name={`${item.qitemNo}`}
                                            value={item.answerScore04}
                                            checked={answers[item.qitemNo] === item.answerScore04}
                                            onChange={chageValue} />
                                        {item.answer04}
                                    </label>
                                </li>
                            )}
                            {item.answer05 !== "null" && (
                                <li>
                                    <label>
                                        <input type="radio"
                                            name={`${item.qitemNo}`}
                                            value={item.answerScore05}
                                            checked={answers[item.qitemNo] === item.answerScore05}
                                            onChange={chageValue} />
                                        {item.answer05}
                                    </label>
                                </li>
                            )}
                            {item.answer06 !== "null" && (
                                <li>
                                    <label>
                                        <input type="radio"
                                            name={`${item.qitemNo}`}
                                            value={item.answerScore06}
                                            checked={answers[item.qitemNo] === item.answerScore06}
                                            onChange={chageValue} />
                                        {item.answer06}
                                    </label>
                                </li>
                            )}
                            {item.answer07 !== "null" && (
                                <li>
                                    <label>
                                        <input type="radio"
                                            name={`${item.qitemNo}`}
                                            value={item.answerScore07}
                                            checked={answers[item.qitemNo] === item.answerScore07}
                                            onChange={chageValue} />
                                        {item.answer07}
                                    </label>
                                </li>
                            )}
                        </ul>
                    </div>
                ))}

                {/* Pagination 설정 */}
                <div>
                    {curPage === 1 ||   // 1 페이지일 경우, 버튼 숨김
                        (<Button onClick={prevPage}>이전</Button>)
                    }
                    {curPage} / {totalPages}
                    {curPage === totalPages ||  // 마지막 페이지일 경우, 버튼 숨김
                        <Button onClick={nextPage}>다음</Button>

                    }
                </div>
                {curPage === totalPages &&  // 마지막 페이지에, 버튼 노출
                    <Button type="submit">제출</Button>
                }
            </Form>
        </>
    );
};

export default Test;