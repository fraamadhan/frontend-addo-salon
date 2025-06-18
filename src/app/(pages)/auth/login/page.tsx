'use client'

import { OAuthGoogle } from "@/app/components-local/ui/button/oauth-provider";
import Form from "@/app/components-local/ui/form/login-form";
import { getAccessToken, getUserRoleFromToken } from "@/lib/token";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginPage = () => {

    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [checkAuth, setCheckAuth] = useState(true);
    const handleShowPasswordToggle = () => {
        setShowPassword((prev) => !prev);
    }
    useEffect(() => {

        const token = getAccessToken();
        const role = getUserRoleFromToken();

        if (!token || role !== 'USER') {
            router.replace('/auth/login');
        }
        else {
            router.replace('/home');
        }

        setCheckAuth(false)
    }, [router])

    if (checkAuth) return null;

    return (
        <main className="flex px-6 justify-center items-center min-h-screen w-full bg-gold-100 ">
            <div className="flex max-w-5xl w-full justify-center items-center gap-x-7">
                <div className="hidden md:flex justify-center items-center space-y-3 md:w-1/2 p-7">
                    <Image src="/landing-page/salon1.jpg" alt="Gambar Salon" width={700} height={700} className="rounded-xl object-cover" />
                </div>
                <div className="flex flex-col w-full md:w-1/2 justify-start p-7 rounded-lg shadow-lg space-y-2 bg-white">
                    <h1 className="font-lora text-2xl font-semibold mb-6">Masuk</h1>
                    <Form showPassword={showPassword} handleShowPasswordToggle={handleShowPasswordToggle} />
                    <div className="flex items-center justify-center">
                        <hr className="w-full border-1" />
                        <div className="w-full text-center">atau</div>
                        <hr className="w-full border-1" />
                    </div>
                    <OAuthGoogle label="Masuk dengan google" />
                    <Link href="/auth/forgot-password" className="font-federo text-base">Lupa kata sandi? <span className="font-federo text-base text-gold-500 hover:text-blue-400">Atur ulang kata sandi</span></Link>
                    <Link href="/auth/register">Belum punya akun? <span className="font-federo text-base text-gold-500 hover:text-blue-400">Daftar sekarang</span></Link>
                </div>
            </div>
        </main>
    )
}

export default LoginPage;
