import React, { useEffect, useState } from 'react';
import TestType from './TestType';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Test = () => {
    const location = useLocation();

    const url = "https://www.career.go.kr/inspct/openapi/test/questions";
    const api_key = '9f936b2680d7a09e5fe0d0bd0ed402f4';
    const q = location.state.q;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios({
            method: "get",
            url: `${url}?apikey=${api_key}&q=${q}`
        })
        .then(response => {
            const {data, status} = response;
            if(data.SUCC_YN === "Y") {
                setData(data.RESULT);
            } else {
                setError(data.ERROR_REASON);
            }
        }

        )

        

    }, []);

    if (loading) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>오류 발생: {error}</div>;
    }


    return (
        <>
            {data.map((item) => (
                <div key={item.qitemNo}>
                    <h4>{item.question}</h4>
                    <ul>
                        <li>{item.answer01} (점수: {item.answerScore01})</li>
                        <li>{item.answer02} (점수: {item.answerScore02})</li>
                        <li>{item.answer03} (점수: {item.answerScore03})</li>
                        <li>{item.answer04} (점수: {item.answerScore04})</li>
                        <li>{item.answer05} (점수: {item.answerScore05})</li>
                        <li>{item.answer06} (점수: {item.answerScore06})</li>
                        <li>{item.answer07} (점수: {item.answerScore07})</li>
                    </ul>
                    <div>
                        <h5>팁:</h5>
                        {item.tip1Desc && <p>{item.tip1Desc} (점수: {item.tip1Score})</p>}
                        {item.tip2Desc && <p>{item.tip2Desc} (점수: {item.tip2Score})</p>}
                    </div>
                </div>
            ))}
        </>
    )
}



export default Test;
