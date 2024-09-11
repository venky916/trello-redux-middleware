// src/components/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
    return (
        <div className="App">
            <Header username="User" />
            <main>
                <Outlet /> {/* This is where the nested routes will render */}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
