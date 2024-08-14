import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import JobInfo from './Pages/JobInfo';
import Consultation from './Pages/Consultation';
import Login from './Pages/Login';
import Register from './Pages/Register';
import MyPage from './Pages/MyPage';
import TestType from './Pages/TestType';
import Test from './Pages/Test';

import 'bootstrap/dist/css/bootstrap.min.css';
import TestProfile from './Pages/TestProfile';

const MainApp = () => {
    return (
        <>
            <BrowserRouter>
                <Header /> 
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/jobinfo" element={<JobInfo/>} />
                    <Route path="/consultation" element={<Consultation/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/mypage" element={<MyPage/>} />
                    <Route path="/test-type" element={<TestType/>} />
                    <Route path="/test" element={<Test/>} />
                    <Route path="/testprofile" element={<TestProfile/>} />
                    <Route path="/login" element={<Login/>} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    );
};

export default MainApp;