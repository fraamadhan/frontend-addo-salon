import Link from "next/link";

const AuthButton = () => {
    return (
        <div className="flex flex-col md:flex-row gap-4 px-2 py-1 items-center justify-center text-center">
            <Link href='/auth/register' className="bg-gold-100 w-[75%] p-1 md:p-2 md:w-[8em] rounded-xl">
                Daftar
            </Link>
            <Link href='/auth/login' className="bg-gold-100 w-[75%] p-1 md:p-2 md:w-[8em] rounded-xl">
                Masuk
            </Link>
        </div>
    )
}

export default AuthButton;