import React, { useState, useEffect,Dispatch,SetStateAction } from 'react';
import API from './authService';

type User = { id: number; name: string };

type AuthReturn = {
    user: User | null;
    logout: () => Promise<void>;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    loading: boolean;
    error: string;
    checkAuth: () => Promise<void>;
    setError: Dispatch<SetStateAction<string>>;
};

export const useAuth: () => AuthReturn = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        checkAuth();
    }, []);

    const getCSRFToken = async () => {
        await API.get('/sanctum/csrf-cookie');
    };

    const checkAuth = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('auth_token');
            if (token) {
                const response = await API.get('/user');
                setUser(response.data);
            } else {
                setUser(null);
            }
        } catch (error) {
            localStorage.removeItem('auth_token');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError('');
    
        try {
            await getCSRFToken();
            const response = await API.post('/login', { email, password });
            
            if (response.data.token) {
                localStorage.setItem('auth_token', response.data.token);
                setUser(response.data.user);
                return { success: true };
            } else {
                setError('Invalid credentials');
                return { success: false, error: 'Invalid credentials' };
            }
        } catch (err: any) {
            const message = err.response?.data?.message || 'Invalid email or password';
            setError(message);
            return { success: false, error: message };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await API.post('/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('auth_token');
            setUser(null);
        }
    };

    return {
        user,
        loading,
        error,
        login,
        logout,
        checkAuth,
        setError
    };
};