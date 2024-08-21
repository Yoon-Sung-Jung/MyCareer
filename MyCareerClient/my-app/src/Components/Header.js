import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Header.css";


const Header = () => {

    const [showLinks, setShowLinks] = useState(false);

    const toggleAuth = () => {
        setShowLinks(!showLinks);
    };

    return (
        <>

            <Navbar className='navbar navbar-expand-lg navbar-light bg-light'>
                <Nav className='nav-home'>
                    <Link to="/" className="navbar-link">홈</Link>
                </Nav>
                <Nav className='nav-item'>
                    <Link to="/test-type" className="navbar-link">진로 심리 검사</Link>
                </Nav>
                <Nav className='nav-item'>
                    <Link to="/consultation" className="navbar-link">진로상담</Link>
                </Nav>
                <Nav className='nav-item'>
                    <Link to="/jobinfo" className="navbar-link">직업 정보</Link>
                </Nav>

                <Nav className='nav-item nav-auth'>
                    <span className='navbar-link navbar-auth' onClick={toggleAuth} style={{ cursor: 'pointer' }}>
                        회원가입 / 로그인
                    </span>
                    {showLinks && (
                        <div className='toggleLink'>
                            <Link to="/register" className="navbar-link">회원가입</Link>
                            <br />
                            <Link to="/login" className="navbar-link">로그인</Link>
                        </div>
                    )}
                </Nav>
            </Navbar>
            <hr />
        </>
    );
};

export default Header;