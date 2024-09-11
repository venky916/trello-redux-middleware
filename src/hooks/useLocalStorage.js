import { useEffect, useState } from "react";

const useLocalStorage = (key) => {

    const getInitialValue = () => {
        const localStorageValue = localStorage.getItem(key);
        try {
            return localStorageValue ? JSON.parse(localStorageValue) : null;
        } catch (e) {
            console.error("Error parsing localStorage value:", e);
            return null;
        }
    };

    const [getLocalStorageValue, setLocalStorageValue] = useState(getInitialValue);

    useEffect(() => {
        const handleStorageChange = () => {
            const localStorageValue = localStorage.getItem(key);
            try {
                setLocalStorageValue(localStorageValue ? JSON.parse(localStorageValue) : null);
            } catch (e) {
                console.error("Error parsing localStorage value:", e);
                setLocalStorageValue(null);
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [key]);

    const setLocalStorage = (value) => {
        localStorage.setItem(key, JSON.stringify(value));
        setLocalStorageValue(value);
    };

    const clearLocalstorage = () => {
        localStorage.removeItem(key);
        setLocalStorageValue(null);
    };

    return [getLocalStorageValue, setLocalStorage, clearLocalstorage];
};

export default useLocalStorage;
