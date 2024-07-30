import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';

const MainApp = () => {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>

                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    );
};

export default MainApp;