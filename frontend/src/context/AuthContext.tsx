"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    role: string;
    profilePicture?: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    gender?: string;
    bio?: string;
    headline?: string;
    locationDetails?: {
        country?: string;
        state?: string;
        city?: string;
        postalCode?: string;
        address?: string;
    };
    skills?: string[];
    currentRole?: string;
    yearsOfExperience?: number;
    resumeUrl?: string;
    portfolioWebsite?: string;
    socialLinks?: {
        linkedin?: string;
        github?: string;
        twitter?: string;
        website?: string;
    };
    workPreferences?: {
        availableForWork?: boolean;
        workType?: string[];
        hourlyRate?: number;
    };
    recoveryEmail?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (token: string, userData: User) => void;
    logout: () => void;
    updateUser: (updatedUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await api.get('/auth/me');
                    if (res.data.success) {
                        setUser(res.data.data);
                    } else {
                        localStorage.removeItem('token');
                    }
                } catch (err) {
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };

        checkUser();
    }, []);

    const login = async (token: string, userData: User) => {
        localStorage.setItem('token', token);
        // Fetch full user profile (not just the minimal token payload)
        try {
            const res = await api.get('/auth/me');
            if (res.data.success) {
                setUser(res.data.data);
            } else {
                setUser(userData);
            }
        } catch {
            setUser(userData);
        }
        toast.success(`Welcome back, ${userData.name}!`);
        router.push('/dashboard');
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        toast.success('Logged out successfully');
        router.push('/');
    };

    const updateUser = (updatedUser: User) => {
        setUser(updatedUser);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
