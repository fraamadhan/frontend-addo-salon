'use client'

import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import Button from "../button/button";
import { useForm } from "react-hook-form";
import { ProfileResetPasswordSchema, ResetPasswordSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { EyeIcon, EyeOffIcon, LoaderIcon } from "lucide-react";
import { z } from 'zod';
import { deleteAccessToken, getAccessToken, getUserIdFromToken } from "@/lib/token";
import { toast } from "sonner";
import { useUpdateUser } from "@/services/userService";
import { useRouter } from "next/navigation";

const ProfileResetPassword = () => {

    const [token, setToken] = useState("")
    const [userId, setUserId] = useState("")
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    const isShowPassword = showPassword ? "text" : "password";
    const isShowConfirmPassword = showConfirmPassword ? "text" : "password";
    const isShowOldPassword = showOldPassword ? "text" : "password";
    const IconA = showPassword ? EyeOffIcon : EyeIcon;
    const IconB = showConfirmPassword ? EyeOffIcon : EyeIcon;
    const IconC = showOldPassword ? EyeOffIcon : EyeIcon;

    const { register, handleSubmit, formState: { errors }, resetField } = useForm<z.infer<typeof ProfileResetPasswordSchema>>({
        resolver: zodResolver(ProfileResetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
            oldPassword: "",
        }
    })

    const handleShowOldPasswordToggle = () => {
        setShowOldPassword((prev) => !prev);
    }
    const handleShowPasswordToggle = () => {
        setShowPassword((prev) => !prev);
    }
    const handleShowConfirmPasswordToggle = () => {
        setShowConfirmPassword((prev) => !prev);
    }

    const onSubmit = async (body: z.infer<typeof ResetPasswordSchema>) => {

        mutation.mutate({ userId, token, body })

        resetField('oldPassword')
        resetField('password');
        resetField('confirmPassword');

    }

    const onCancel = async () => {

        resetField('oldPassword')
        resetField('password');
        resetField('confirmPassword');
    }

    const mutation = useUpdateUser({
        onSuccess: (data) => {
            if (data.status !== 200) {
                toast.error(data.message || "Gagal memperbarui kata sandi");
                return;
            }
            else if (data.status === 200) {
                deleteAccessToken()
                router.replace('/auth/login')
                toast.success("Berhasil memperbarui kata sandi");
            }
        },
        onError: (error) => {
            toast.error(error.message || "Gagal memperbarui kata sandi");
            console.error('Error updating password:', error);
        }
    })

    useEffect(() => {
        const token = getAccessToken();
        const userId = getUserIdFromToken()
        if (!token || !userId) {
            toast.error("Sesi anda sudah habis, silakan login terlebih dahulu")
            return;
        }
        setToken(token)
        setUserId(userId)
    }, [])

    return (
        <section className="flex flex-col w-full lg:w-[45rem] xl:w-[65rem] items-center md:items-start justify-center md:justify-start p-3 md:p-10 border shadow-xl rounded-xl gap-y-7">
            <div className="flex flex-row gap-4 bg-warning-50 p-3 items-center rounded-xl">
                <ExclamationCircleIcon className="w-[3em] bg-warning-300 rounded-full p-0" />
                <p className="text-sm font-federo font-normal text-gray-500">Pastikan kata sandi baru Anda memiliki minimal 8 karakter, dengan huruf besar, huruf kecil, angka, dan simbol</p>
            </div>
            <form action="" className="w-full flex flex-col gap-y-2 items-center md:items-start" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-2 relative w-[16rem] sm:w-[18rem]">
                    <label htmlFor="oldPassword" className="font-federo font-semibold">
                        Kata Sandi Lama
                    </label>
                    <input {...register("oldPassword")} type={isShowOldPassword} name="oldPassword" required id="oldPassword" className="peer rounded-xl p-2 bg-white border border-gray-200 pr-10 w-[16rem] sm:w-[18rem]" placeholder="Masukkan kata sandi lama" />
                    <span className="absolute top-1/2 right-3 -translate-y-[-1/2] cursor-pointer text-gray-400">
                        <IconC onClick={handleShowOldPasswordToggle} />
                    </span>
                </div>
                {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>}
                <div className="mb-2 relative w-[16rem] sm:w-[18rem]">
                    <label htmlFor="password" className="font-federo font-semibold">
                        Kata Sandi Baru
                    </label>
                    <input {...register("password")} type={isShowPassword} name="password" required id="password" className="peer rounded-xl p-2 bg-white border border-gray-200 pr-10 w-[16rem] sm:w-[18rem]" placeholder="Masukkan kata sandi baru" />
                    <span className="absolute top-1/2 right-3 -translate-y-[-1/2] cursor-pointer text-gray-400">
                        <IconA onClick={handleShowPasswordToggle} />
                    </span>
                </div>
                {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>}
                <div className="mb-2 relative w-[16rem] sm:w-[18rem]">
                    <label htmlFor="confirmPassword" className="font-federo font-semibold">
                        Konfirmasi Kata Sandi Baru
                    </label>
                    <input {...register("confirmPassword")} type={isShowConfirmPassword} name="confirmPassword" required id="confirmPassword" className="peer rounded-xl p-2 bg-white border border-gray-200 pr-10 w-[16rem] sm:w-[18rem]" placeholder="Konfirmasi kata sandi baru" />
                    <span className="absolute top-1/2 right-3 -translate-y-[-1/2] cursor-pointer text-gray-400">
                        <IconB onClick={handleShowConfirmPasswordToggle} />
                    </span>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm mb-2">{errors.confirmPassword.message}</p>}
                {/* button */}
                <div className="w-full flex justify-center md:justify-end items-center gap-x-3">
                    <Button type="button" className="w-[8rem] border border-gold-500 bg-transparent p-2 rounded-md shadow-lg cursor-pointer hover:-translate-y-1 hover:scale-110 ease-in-out transition delay-150 duration-200 relative text-center" onClick={onCancel}>
                        Batal
                    </Button>
                    {
                        mutation.isPending ? (
                            <Button type="submit" className="w-[8rem] flex items-center justify-center gap-x-1 bg-gray-500 p-2 rounded-md shadow-lg relative text-center text-white" disabled>
                                <LoaderIcon className="animate-spin w-5 h-5" />
                                <span className="leading-none">Simpan</span>
                            </Button>
                        ) : (
                            <Button type="submit" className="w-[8rem] bg-gold-500 p-2 rounded-md shadow-lg cursor-pointer hover:-translate-y-1 hover:scale-110 ease-in-out transition delay-150 duration-200 relative text-center">
                                Simpan
                            </Button>
                        )
                    }
                </div>
            </form>
            {/* {mutation.isSuccess && success.length !== 0 && <p className='w-full text-base text-success-400 bg-success-300 p-2 rounded-lg font-federo'> {success} </p>}
            {mutation.isSuccess && error.length !== 0 && <p className='w-full text-base text-error-400 bg-error-300 p-2 rounded-lg font-federo'> {error} </p>}
            {mutation.isError && <p className='w-full text-base text-error-400 bg-error-300 p-2 rounded-lg font-federo'> {error} </p>} */}
        </section>
    )
}

export default ProfileResetPassword;