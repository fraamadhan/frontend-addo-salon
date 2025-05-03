'use client'

import Button from "../button/button";
import { useVerifyEmailForgotPassword } from "@/services/authService";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ForgotPasswordSchema } from "@/lib/validation";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

const Form = () => {

    const [success, setSuccess] = useState<string>("")
    const [error, setError] = useState<string>("")


    const { register, handleSubmit, formState: { errors }, resetField } = useForm<z.infer<typeof ForgotPasswordSchema>>({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            email: ""
        },
    })

    const onSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
        setError("")
        setSuccess("")

        mutation.mutate(data);

        resetField("email")
    }

    const mutation = useVerifyEmailForgotPassword({
        onSuccess: (data: any) => {
            if (data.data.status !== 200) {
                setError(data.data.message);
            } else {
                setSuccess(data.data.message)
            }
        },
        onError: (error: any) => {
            console.log(error)
            setError(error.message)
            console.log(error.message);
        }
    })


    return (
        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email" id="email" className="ml-[-7]">Email</label>
            <div className="input">
                <input
                    {...register("email")}
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Masukkan email"
                    required
                    minLength={7}
                    className="peer rounded-xl p-2 mt-1 w-full bg-white border border-gray-200 mb-4"
                />
                {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>}
                {!mutation.isPending ? (
                    <Button type="submit" className="w-full mb-4 rounded-xl p-2 mt-1 bg-gray-200 border border-gray-200  disabled aria-disabled:true hover:cursor-pointer active:translate-y-2">
                        Reset Kata Sandi
                    </Button>
                ) : (<div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white text-center"
                    role="status">
                    <span
                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading...</span
                    >
                </div>)
                }
            </div>
            {mutation.isSuccess && success.length !== 0 && <p className='w-full text-base text-success-400 bg-success-300 p-2 rounded-lg font-federo'> {success} </p>}
            {mutation.isSuccess && error.length !== 0 && <p className='w-full text-base text-error-400 bg-error-300 p-2 rounded-lg font-federo'> {error} </p>}
            {mutation.isError && <p className='w-full text-base text-error-400 bg-error-300 p-2 rounded-lg font-federo'> {error} </p>}
        </form>
    )
}

export default Form;
