'use client'

import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Button from '../button/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from '@/lib/validation';
import { useState } from 'react';
import { useCreateUser } from '@/services/authService';

const Form = (props: {
    showPassword: boolean;
    handleShowPasswordToggle: () => void;
}) => {

    const [success, setSuccess] = useState<string>("")
    const [error, setError] = useState<string>("")

    const showPassword = props.showPassword ? ["text", "Sembunyikan kata sandi"] : ["password", "Tampilkan kata sandi"];
    const handleShowPasswordToggle = props.handleShowPasswordToggle;
    const IconA = props.showPassword ? EyeOffIcon : EyeIcon;

    const { register, handleSubmit, formState: { errors }, resetField } = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    })

    const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {

        setError("")
        setSuccess("")

        mutation.mutate(data);

        resetField('name');
        resetField('email');
        resetField('password');
    }

    const mutation = useCreateUser({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (data: any) => {
            if (data.data.status !== 201) {
                setError(data.data.message);
            } else {
                setSuccess(data.data.message)
            }
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            console.log(error)
            setError(error.message)
            console.log(error.message);
        }
    })

    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full mb-2 relative">
                <label htmlFor="nama" className="font-federo font-semibold">
                    Nama
                </label>
                <input {...register("name")} type="text" name="name" id="name" required aria-required="true" className="peer rounded-xl p-2 w-full bg-white border border-gray-200 pr-10" placeholder="Masukkan nama lengkap" />
            </div>
            {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name.message}</p>}
            <div className="w-full mb-2 relative">
                <label htmlFor="email" className="font-federo font-semibold">
                    Email
                </label>
                <input {...register("email")} type="email" name="email" id="email" required aria-required="true" className="peer rounded-xl p-2 w-full bg-white border border-gray-200 pr-10" placeholder="Masukkan email" />
            </div>
            {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>}
            <div className="w-full mb-2 relative">
                <label htmlFor="password" className="font-federo font-semibold">
                    Kata Sandi
                </label>
                <input {...register("password")} type={showPassword[0]} name="password" id="password" required aria-required="true" className="peer rounded-xl p-2 w-full bg-white border border-gray-200 pr-10" placeholder="Masukkan kata sandi" />
                <span className="absolute top-1/2 right-3 -translate-y-[-1/2] cursor-pointer text-gray-400">
                    <IconA onClick={handleShowPasswordToggle} aria-label={showPassword[1]} />
                </span>
            </div>
            {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>}
            {!mutation.isPending ? (
                <Button type="submit" className="w-full mb-4 rounded-xl p-2 mt-1 bg-gray-200 border border-gray-200  disabled aria-disabled:true hover:cursor-pointer active:translate-y-2">
                    Daftar
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
            {mutation.isSuccess && success.length !== 0 && <p className='w-full text-base text-success-400 bg-success-300 p-2 rounded-lg font-federo'> {success} </p>}
            {mutation.isSuccess && error.length !== 0 && <p className='w-full text-base text-error-400 bg-error-300 p-2 rounded-lg font-federo'> {error} </p>}
            {mutation.isError && <p className='w-full text-base text-error-400 bg-error-300 p-2 rounded-lg font-federo'> {error} </p>}
        </form>
    )
}

export default Form;
