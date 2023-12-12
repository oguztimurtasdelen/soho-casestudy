import React, { useState, useContext } from 'react';
import { environment } from "../../environments/environment";
import { AuthContext } from "../../contexts/auth-context";


const authService = {
    
    login: async(loginFormData) => {
        const response = await fetch(`${environment.SERVER_URL}/admin/authentication/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginFormData)
        });
    
        const data = await response.json();
        
        if (!data.error) {
            localStorage.setItem('username', loginFormData.username);
            localStorage.setItem('token', data.token);
            localStorage.setItem('expirationDate', new Date( new Date().getTime() + 3600 * 1000));

            
        }
        return data;
    },

    register: async(registerFormData) => {
        
        const response = await fetch(`${environment.SERVER_URL}/admin/authentication/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerFormData)
        });
        
        const data = await response.json();
        return data;
    },

    logout: () => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
    },

    getAuthData: () => {
        try {
            const _username = localStorage.getItem('username');
            const _token = localStorage.getItem('token');
            const _expirationDate = localStorage.getItem('expirationDate');
            if (!_token || !_expirationDate || (_expirationDate - new Date().getTime() <= 0)) {
                return;
            }

            return {
                username: _username,
                token: _token,
                expirationDate: _expirationDate
            }
        } catch (error) {
            return;
        }
        
    },

    isAuthenticated: () => {
        const authData = authService.getAuthData();
        return !!authData;
    }


}

export default authService;