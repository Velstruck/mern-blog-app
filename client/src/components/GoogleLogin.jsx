import React from 'react'
import { Button } from './ui/button'
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/helpers/firebase';
import { RouteIndex } from '@/helpers/RouteName';
import { showToast } from '@/helpers/showToast';
import { getEnv } from '@/helpers/getEnv';
import { useNavigate } from 'react-router-dom';

const GoogleLogin = () => {
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const googleResponse = await signInWithPopup(auth, provider);
            const user = googleResponse.user;
            const bodyData = {
                name: user.displayName,
                email: user.email,
                avatar: user.photoURL
            }
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/auth/google-login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(bodyData)
            })
            const data = await response.json()
            if (!response.ok) {
                //toastify
                return showToast('error', data.message)
            }

            navigate(RouteIndex)
            showToast('success', data.message)
        }
        catch (err) {
            showToast('error', err.message)
        }

    }
    return (
        // Google login button
        <Button variant="outline" className="w-full" onClick={handleLogin}>
            <FcGoogle />Continue with Google
        </Button>
    )
}

export default GoogleLogin