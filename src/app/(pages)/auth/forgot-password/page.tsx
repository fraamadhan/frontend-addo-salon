import Link from "next/link";
import Form from "@/app/components-local/ui/form/forgot-password-form";

const ForgotPasswordPage = () => {

    return (
        <main className="flex justify-center items-center min-h-screen p-4">
            <div className="flex flex-col w-[30em] bg-white rounded-lg shadow-xl p-8 gap-4">
                <h1 className="text-lg md:text-3xl font-lora text-center">LUPA KATA SANDI?</h1>
                <p className="font-federo text-center text-lg font-normal opacity-75">Harap masukkan email Anda dan kami akan kirimkan instruksi reset kata sandi melalui email tersebut</p>
                <Form />
                <Link href="/auth/login" className="text-center text-blue-400">Kembali ke halaman masuk</Link>
            </div>
        </main>
    )
}

export default ForgotPasswordPage;
