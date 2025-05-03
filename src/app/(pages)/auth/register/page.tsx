'use client'

import Form from '@/app/components-local/ui/form/register-form';
import Link from 'next/link';
import React, { useState } from 'react'

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPasswordToggle = () => {
        setShowPassword((prev) => !prev);
    }

    return (
        <main className="flex px-6 justify-center items-center min-h-screen w-full bg-gold-100 ">
            <div className="flex max-w-5xl w-full justify-center items-center gap-x-7">
                <div className="hidden md:flex md:flex-col justify-center items-center space-y-3 md:w-1/2 p-7">
                    <h1 className='font-lora text-3xl font-semibold'>Mulai Perjalanan Rambut Sehatmu Bersama Addo Salon</h1>
                    <p className='text-base font-federo'>Daftar sekarang dan nikmati kemudahan reservasi salon. Temukan layanan terbaik yang sesuai dengan kebutuhanmu</p>
                </div>
                <div className="flex flex-col w-full md:w-1/2 justify-start p-7 rounded-lg shadow-lg space-y-3 bg-white">
                    <h1 className="font-lora text-2xl font-semibold mb-6">Daftar</h1>
                    <Form showPassword={showPassword} handleShowPasswordToggle={handleShowPasswordToggle} />
                    <Link href="/auth/login">Sudah punya akun? <span className="font-federo text-base text-gold-500 hover:text-blue-400">Masuk</span></Link>
                </div>
            </div>
        </main>
    )
}

export default RegisterPage;
