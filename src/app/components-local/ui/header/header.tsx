'use client'

import { getAccessToken, getUserIdFromToken } from "@/lib/token";
import DesktopHeader from "./desktop-header";
import MobileHeader from "./mobile-header";
import { useEffect, useState } from "react";
import { useGetUser } from "@/services/userService";

export const Header = () => {
    const [isLogin, setIsLogin] = useState(false)
    const [userId, setUserId] = useState('');
    const [token, setToken] = useState<string>('');
    const [user, setUser] = useState(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const token = getAccessToken()
        const id = getUserIdFromToken()

        if (token) {
            setToken(token);
            setIsLogin(true);
        }
        if (id) {
            setUserId(id)
        }

        setIsReady(true);
    }, [])

    const { data, isLoading } = useGetUser(token, userId)

    useEffect(() => {
        if (data) {
            setUser(data.data.data);
        }
    }, [data]);

    if (!isReady || (isLogin && isLoading)) {
        return null;
    }

    return (
        <header className="sticky top-0 flex flex-col w-full items-center justify-center bg-gray-600 z-50 h-[7em] px-7 md:px-17">
            <DesktopHeader isLogin={isLogin} user={user} />
            <MobileHeader isLogin={isLogin} user={user} />
        </header>
    )
}

export default Header;
