import React, { useState } from 'react';
import TestType from './TestType';

const Test = () => {
    const [q, setQ] = useState('');

    const handleTestSelect = (value) => {
        setSelectedTest(value);
    };

    return (
        <div>
            {/* <TestType onTestSelect={handleTestSelect} /> prop 전달 확인 */}
            <div>{q}</div>
            <p>선택한 검사 유형: {selectedTest}</p>
        </div>
    );
};

export default Test;
