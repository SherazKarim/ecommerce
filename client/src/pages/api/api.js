import React, { useState, useEffect, useContext } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the Auth Context
const AuthContext = createContext({
    user: null,
    profile: null,
    login: () => { },
    logOut: () => { },
});

// Define the custom hook
function useAuth() {
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);
    const navigate = useNavigate()
    const clientId = "1049557792860-j3nbo2dumlt621jbj22i6cf5u8juto1t.apps.googleusercontent.com"
    // google auth code 
    const handleGoogleAuth = async (credential) => {
        try {
            const response = await axios.post('http://localhost:8000/api/auth/google', {
                credential, client_id: clientId,
            });
            localStorage.setItem("profileData", JSON.stringify(response.data))
            navigate("/")
        } catch (error) {
            // Handle error
            console.error('Error authenticating with Google:', error);
        }
    };

    const logOut = () => {
        localStorage.removeItem("profileData")
        navigate("/")
    };

    return { user , logOut, handleGoogleAuth };
}

export { AuthContext, useAuth };
