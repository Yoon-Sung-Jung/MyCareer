import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>

            <Navbar>
                <Nav>
                    <Link to="/" className="navbar-link">홈</Link>
                </Nav>
                <Nav>
                    <Link to="/test-type" className="navbar-link">진로 심리 검사</Link>
                </Nav>
                <Nav>
                    <Link to="/consultation" className="navbar-link">진로상담</Link>
                </Nav>
                <Nav>
                    <Link to="/jobinfo" className="navbar-link">직업 정보</Link>
                </Nav>
                <Nav>
                    <Link to="/register" className="navbar-link">회원가입</Link>
                </Nav>
                <Nav>
                    <Link to="/login" className="navbar-link">로그인</Link>
                </Nav>
            </Navbar>
            <hr />
        </>
    );
};

export default Header;