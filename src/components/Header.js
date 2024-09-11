// src/components/Header.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearUser } from '../store/slices/userSlice';

const Header = ({ username }) => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        // Clear user data from Redux store and handle redirection if needed
        dispatch(clearUser());
        window.location.href = '/login'; // Redirect to login page after logout
    };

    return (
        <header className="bg-orange text-white p-4">
            <nav className="flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">MyApp</Link>
                <div>
                    {user ? (
                        <>
                            <span className="mr-4">Welcome, {user.name || username}</span>
                            <button onClick={handleLogout} className="text-white px-4 py-2 rounded">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="bg-blue-500 px-4 py-2 rounded">Login</Link>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
