'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import Cookies from 'js-cookie'

const OAuthSuccessPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        if (token) {
            const expirationTime = Number(process.env.NEXT_PUBLIC_TOKEN_EXPIRES_IN);
            Cookies.set("access_token", token, {
                expires: expirationTime,
                secure: !!process.env.NEXT_PUBLIC_TOKEN_SECURE,
                sameSite: "strict",
            }); localStorage.setItem('token', token);
            router.replace('/home');
        }
        else {
            router.replace('/auth/login');
        }
    }, [token, router]);

    return <div>Redirecting...</div>;
}

export default OAuthSuccessPage