'use client'

import Form from "@/app/components-local/ui/form/reset-password-form";
import { ResetPasswordSkeleton } from "@/app/components-local/ui/skeleton";
import { useVerifyToken } from "@/services/authService";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ResetPasswordPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isTokenVerified, setIsTokenVerified] = useState(false);
    const params = useParams()
    const token = params.token?.toString() ?? "";
    const router = useRouter();

    const { status, data, isLoading } = useVerifyToken(token);

    useEffect(() => {
        if (status === 'success' && data?.data.status === 200) {
            setIsTokenVerified(true); // Set verification status to true
        } else if (status === 'success' && data?.data.status !== 200) {
            router.replace('/auth/login'); // Redirect if token is invalid or expired
        }
    }, [status, data, router])

    const handleShowPasswordToggle = () => {
        setShowPassword((prev) => !prev);
    }
    const handleShowConfirmPasswordToggle = () => {
        setShowConfirmPassword((prev) => !prev);
    }

    if (isLoading) {

        return (
            <main className="flex flex-col justify-center items-center min-h-screen">
                <ResetPasswordSkeleton />
            </main>
        );
    }

    if (!isTokenVerified) {

        return null;
    }

    return (
        <main className="flex flex-col justify-center items-center min-h-screen">
            <div className="flex flex-col shadow-lg w-[20em] md:w-[28em] items-center p-5 space-y-2">
                <h1 className="font-lora text-2xl">UBAH KATA SANDI</h1>
                <p className="font-federo text-base mt-1">Masukkan kata sandi baru</p>
                <div className="flex flex-row gap-4 mt-12 bg-warning-50 p-3 rounded-xl items-center mb-5">
                    <ExclamationCircleIcon className="w-[3em] bg-warning-300 rounded-full p-0" />
                    <p className="text-sm font-federo font-normal text-gray-500">Pastikan kata sandi baru Anda memiliki minimal 8 karakter, dengan huruf besar, huruf kecil, angka, dan simbol</p>
                </div>
                <Form showPassword={showPassword} showConfirmPassword={showConfirmPassword} handleShowPasswordToggle={handleShowPasswordToggle} handleShowConfirmPasswordToggle={handleShowConfirmPasswordToggle} token={token} />
            </div>
        </main>
    )
}

export default ResetPasswordPage;
