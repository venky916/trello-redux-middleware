// src/pages/AuthPage.js
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { login, signup } = useAuth();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (isLogin) {
                response = await login(email, password);
            } else {
                response = await signup(name, email, password);
            }
            // Assuming response contains user data
            const user = response;
            dispatch(setUser(user)); // Dispatch user data to Redux store
            window.location.href = '/'; // Redirect after successful login/signup
        } catch (error) {
            console.error(`${isLogin ? 'Login' : 'Signup'} failed:`, error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="mb-8 text-3xl font-bold text-center">{isLogin ? 'Login' : 'Sign Up'}</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-sm p-8 space-y-4 bg-white shadow-lg">
                {!isLogin && (
                    <div>
                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="name">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                )}
                <div>
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>
            </form>
            <button
                onClick={() => setIsLogin(!isLogin)}
                className="mt-4 text-blue-500 hover:underline"
            >
                {isLogin ? 'Don\'t have an account? Sign up' : 'Already have an account? Login'}
            </button>
        </div>
    );
};

export default AuthPage;
