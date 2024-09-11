// src/hooks/useAuth.js
import { useDispatch } from 'react-redux';
import { login as loginService, signup as signupService } from '../services/authService';
import { setUser } from '../store/slices/userSlice';
import useLocalStorage from './useLocalStorage';

export const useAuth = () => {
    const dispatch = useDispatch();
    const [getUser, setUserStorage, clearUserStorage] = useLocalStorage('user');

    const login = async (email, password) => {
        try {
            const user = await loginService(email, password);
            setUserStorage(user); // Save to session storage
            dispatch(setUser(user)); // Save to Redux store
            return user;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const signup = async (name, email, password) => {
        try {
            const user = await signupService(name, email, password);
            setUserStorage(user); // Save to session storage
            dispatch(setUser(user)); // Save to Redux store
            return user;
        } catch (error) {
            console.error('Signup failed:', error);
            throw error;
        }
    };

    const logout = () => {
        clearUserStorage(); // Clear from session storage
        dispatch(setUser(null)); // Clear from Redux store
    };

    return {
        login,
        signup,
        logout,
        user: getUser,
    };
};
