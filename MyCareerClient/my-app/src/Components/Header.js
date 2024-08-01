import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>

            <div>
                <Link to="/test-type">진로 심리 검사</Link>
            </div>
            <div>
                <Link to="/consultation">진로상담</Link>
            </div>
            <div>
                <Link to="/jobinfo">직업 정보</Link>
            </div>
            <div>
                <Link to="/register">회원가입</Link>
            </div>
            <div>
                <Link to="/login">로그인</Link>
            </div>
        </>
    );
};

export default Header;