"use client"

import { useState } from "react";
import Button from "../button/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ResetPasswordSchema } from "@/lib/validation";
import { useResetPassword } from "@/services/authService";
import { useRouter } from "next/navigation";

const Form = (props: {
  showPassword: boolean;
  showConfirmPassword: boolean;
  handleShowPasswordToggle: () => void;
  handleShowConfirmPasswordToggle: () => void;
  token: string;
}) => {

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const showPassword = props.showPassword ? "text" : "password";
  const showConfirmPassword = props.showConfirmPassword ? "text" : "password";
  const handleShowPasswordToggle = props.handleShowPasswordToggle;
  const handleShowConfirmPassword = props.handleShowConfirmPasswordToggle;
  const IconA = props.showPassword ? EyeOffIcon : EyeIcon;
  const IconB = props.showConfirmPassword ? EyeOffIcon : EyeIcon;
  const token = props.token;

  const { register, handleSubmit, formState: { errors }, resetField } = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  })

  const onSubmit = async (body: z.infer<typeof ResetPasswordSchema>) => {

    setError("")
    setSuccess("")

    mutation.mutate(body);

    resetField('password');
    resetField('confirmPassword');
  }

  const mutation = useResetPassword(token as string, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (data: any) => {
      if (data.data.status !== 200) {
        setError(data.data.message)
      }
      else {
        setSuccess(data.data.message)
        router.replace('/auth/login')
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.log(error)
      setError(error.message)
    }
  })

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full mb-2 relative">
        <label htmlFor="password" className="font-federo font-semibold">
          Kata Sandi Baru
        </label>
        <input {...register("password")} type={showPassword} name="password" required id="password" className="peer rounded-xl p-2 w-full bg-white border border-gray-200 pr-10" placeholder="Masukkan kata sandi baru" />
        <span className="absolute top-1/2 right-3 -translate-y-[-1/2] cursor-pointer text-gray-400">
          <IconA onClick={handleShowPasswordToggle} />
        </span>
        {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>}
      </div>
      <div className="w-full mb-2 relative">
        <label htmlFor="confirmPassword" className="font-federo font-semibold">
          Konfirmasi Kata Sandi Baru
        </label>
        <input {...register("confirmPassword")} type={showConfirmPassword} name="confirmPassword" required id="confirmPassword" className="peer rounded-xl p-2 w-full bg-white border border-gray-200 pr-10" placeholder="Konfirmasi kata sandi baru" />
        <span className="absolute top-1/2 right-3 -translate-y-[-1/2] cursor-pointer text-gray-400">
          <IconB onClick={handleShowConfirmPassword} />
        </span>
        {errors.confirmPassword && <p className="text-red-500 text-sm mb-2">{errors.confirmPassword.message}</p>}
      </div>
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
      {mutation.isSuccess && success.length !== 0 && <p className='w-full text-base text-success-400 bg-success-300 p-2 rounded-lg font-federo'> {success} </p>}
      {mutation.isSuccess && error.length !== 0 && <p className='w-full text-base text-error-400 bg-error-300 p-2 rounded-lg font-federo'> {error} </p>}
      {mutation.isError && <p className='w-full text-base text-error-400 bg-error-300 p-2 rounded-lg font-federo'> {error} </p>}
    </form>
  )
}

export default Form;
