import React, { useEffect, useState } from 'react';
import TestType from './TestType';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

const Test = () => {
    const location = useLocation();
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

    // Pagination 관련
    const indexOfLastItem = curPage * itemsPerPage; // 현재 페이지의 첫 번째 항목 인덱스
    const indexofFirstItem = indexOfLastItem - itemsPerPage;    // 현재 페이지의 첫 번째 항목 인덱스
    const curItems = data.slice(indexofFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const answers = "";


    const changeValue = (e) => {
        
        // q가 30, 31일 경우, answer 값은 A1=3 A2=2 ...
        if(q == 30 || q == 31) {
            answers += `A{e.target.name}={e.target.value} `
        }

        // q가 8, 9, 10 일 경우, answer 값은 2,2,2,3,...
        if (q == 8 || q == 9 || q == 10) {

        }

        // q가 19, 20, 21, 22, 23, 24, 25, 26, 27 일 경우, answer 값은 1=5 2=4 3=4 ...
        if (q == 19 || q == 20 || q == 21 || q == 22 || 
            q == 23 || q == 24 || q == 25 || q == 26 || 
            q == 27) {

            }

        // q가 6 일 경우, answer 값은 B1=1 B2=4
        if( q == 6) {

        }
        answers = answers.trimEnd();
        
    }

    const testResult = (e) => {
        e.preventDefault(); 
        console.log(answers);
        


        axios({
            method: "post",
            url: "http://www.career.go.kr/inspct/openapi/test/report",
            data: {
                "apikey": api_key,
                "qestrnSeq": q,
                "trgetSe": "100206",
                "name": "홍길동",
                "gender": "100323",
                "school": "율도중학교",
                "grade": "2",
                "email": "",
                "startDtm": 1550466291034,
                "answers": "1=5 2=7 3=3 4=7 5=1 6=2 7=1 8=5 9=5 10=1 11=4 12=4 13=5 14=4 15=4 16=4 17=4 18=5 19=1 20=1 21=1 22=5 23=3 24=6 25=3 26=2 27=2 28=6 29=3 30=2 31=4 32=3 33=5 34=2 35=3 36=2 37=7 38=2 39=5 40=5 41=5 42=1 43=7 44=6 45=5 46=4 47=2 48=5 49=4 50=5 51=5 52=5 53=7 54=2 55=6 56=4 57=6 58=4 59=3 60=5 61=5 62=5 63=7 64=4 65=7 66=5"
            }
        })
        .then((response) => {
            const url = response.data.RESULT.url;
            window.location.href = url;
        })

}

return (
    <>
        <Form onSubmit={testResult}>

            {curItems.map((item) => (
                <div key={item.qitemNo}>
                    <h4>{item.qitemNo}.</h4>
                    <h4>{item.question}</h4>
                    <ul>
                        {item.answer01 !== "null" && (
                            <li>
                                <label>
                                    <input type="radio" name={`${item.qitemNo}`} value={item.answer01} />
                                    {item.answer01}
                                </label>
                            </li>
                        )}
                        {item.answer02 !== "null" && (
                            <li>
                                <label>
                                    <input type="radio" name={`${item.qitemNo}`} value={item.answer02} />
                                    {item.answer02}
                                </label>
                            </li>
                        )}
                        {item.answer03 !== "null" && (
                            <li>
                                <label>
                                    <input type="radio" name={`${item.qitemNo}`} value={item.answer03} />
                                    {item.answer03}
                                </label>
                            </li>
                        )}
                        {item.answer04 !== "null" && (
                            <li>
                                <label>
                                    <input type="radio" name={`${item.qitemNo}`} value={item.answer04} />
                                    {item.answer04}
                                </label>
                            </li>
                        )}
                        {item.answer05 !== "null" && (
                            <li>
                                <label>
                                    <input type="radio" name={`${item.qitemNo}`} value={item.answer05} />
                                    {item.answer05}
                                </label>
                            </li>
                        )}
                        {item.answer06 !== "null" && (
                            <li>
                                <label>
                                    <input type="radio" name={`${item.qitemNo}`} value={item.answer06} />
                                    {item.answer06}
                                </label>
                            </li>
                        )}
                        {item.answer07 !== "null" && (
                            <li>
                                <label>
                                    <input type="radio" name={`${item.qitemNo}`} value={item.answer07} />
                                    {item.answer07}
                                </label>
                            </li>
                        )}
                    </ul>
                </div>
            ))}

            {/* Pagination 설정 */}
            <div>
                {curPage === 1 ||
                    (<Button onClick={() => setCurPage(prev => Math.max(prev - 1, 1))}>이전</Button>)
                }
                {curPage} / {totalPages}
                {curPage === totalPages ||
                    <Button onClick={() => setCurPage(prev => Math.min(prev + 1, totalPages))} disabled={curPage === totalPages}>다음</Button>

                }
            </div>
            {curPage === totalPages &&
                <Button type="submit">제출</Button>
            }
        </Form>
    </>
);
};

export default Test;