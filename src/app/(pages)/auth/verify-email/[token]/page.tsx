'use client'

import { useVerifyEmail } from "@/services/authService";
import Link from "next/link";
import { useParams } from "next/navigation";

const EmailVerificationPage = () => {

    const params = useParams();
    const token = params.token?.toString();
    const { status, data, isLoading, error } = useVerifyEmail(token, "register");

    return (
        <main className="flex justify-center items-center min-h-screen p-4">
            <div className="flex flex-col w-[25em] p-7 justify-center items-center bg-white rounded-lg shadow-xl">
                <h1 className="font-lora text-xl">Verifikasi Email Anda</h1>
                <p className="font-federo text-lg mt-3 text-center">Tolong verifikasi email anda untuk menikmati layanan aplikasi kami</p>
                {isLoading && <div
                    className="inline-block h-8 w-8 mt-4 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white text-center"
                    role="status">
                    <span
                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading...</span
                    >
                </div>}

                {status === "success" && data.data.status !== 200 && data?.data?.message && (
                    <p className="mt-4 text-error-600">{data.data.message}</p>
                )}

                {status === "success" && data.data.status === 200 && data?.data?.message && (
                    <p className="mt-4 text-success-500">{data.data.message}</p>
                )}

                {status === "error" && (
                    <p className="mt-4 text-error-600">
                        {error?.message || "Terjadi kesalahan saat verifikasi email."}
                    </p>
                )}
                <Link href="/auth/login" className="text-center text-gold-600 mt-4 bg-gray-400 p-3 rounded-lg">Kembali ke halaman masuk</Link>
            </div>
        </main>
    )
}


export default EmailVerificationPage;
