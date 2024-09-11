// src/services/authService.js
import { BASE_URL } from "../utils/constants";
export const login = async (email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const signup = async (name, email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/api/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
            throw new Error('Signup failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during signup:', error);
        throw error;
    }
};
