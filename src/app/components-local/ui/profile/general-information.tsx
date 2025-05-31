'use client'

import Image from "next/image";
import Button from "../button/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getAccessToken, getUserIdFromToken } from "@/lib/token";
import { toast } from "sonner";
import { useGetUser, useUpdateUser } from "@/services/userService";
import { ProfileFormSkeleton } from "../skeleton";
import { birthDateFormater } from "@/lib/date-formatter";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { UpdateProfileSchema } from "@/lib/validation/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";

const GeneralInformation = () => {

    const [token, setToken] = useState("")
    const [userId, setUserId] = useState("")
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const queryClient = useQueryClient()
    const [isUserLoaded, setIsUserLoaded] = useState(false);


    const { control, register, handleSubmit, formState: { errors }, reset, setValue } = useForm<z.infer<typeof UpdateProfileSchema>>({
        resolver: zodResolver(UpdateProfileSchema),
        defaultValues: {
            username: "",
            email: "",
            gender: "",
            phone_number: "",
            birth_date: "",
            address: "",
            file: undefined
        }
    })

    const { data, isLoading, isError } = useGetUser(token, userId)

    const user = data?.data?.data

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setValue("file", file);
            setImagePreview(previewUrl);
        }
    }

    const onSubmit = (body: z.infer<typeof UpdateProfileSchema>) => {
        // Create a copy without the file for logging
        const formData = new FormData();
        const { file } = body;
        if (file) {
            formData.append('file', file)
        }
        formData.append('name', body.username)
        formData.append('gender', body.gender)
        formData.append('phone_number', body.phone_number);
        formData.append('address', body.address);
        formData.append('birth_date', body.birth_date)

        mutation.mutate({ userId, token, body: formData })
    }

    const onCancel = () => {
        reset({
            username: user.name || "",
            email: user.email || "",
            gender: user.gender || "",
            phone_number: user.phone_number || "",
            birth_date: birthDateFormater(user.birth_date) || "",
            address: user.address || ""
        });
        setImagePreview(user.asset.publicUrl)
    }

    const mutation = useUpdateUser({
        onSuccess: (data) => {
            if (data.status !== 200) {
                toast.error(data.message || "Gagal memperbarui data");
                return;
            }
            else if (data.status === 200) {
                queryClient.invalidateQueries({ queryKey: ["getUserById"] })
                toast.success("Berhasil memperbarui data");
            }
        },
        onError: (error) => {
            toast.error(error.message || "Gagal memperbarui data");
            console.error('Error updating profile:', error);
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


    useEffect(() => {
        if (user) {
            reset({
                username: user.name || "",
                email: user.email || "",
                gender: user.gender ?? "",
                phone_number: user.phone_number || "",
                birth_date: birthDateFormater(user.birth_date) || "",
                address: user.address || ""
            });
            setIsUserLoaded(true)
        }
    }, [user, reset]);

    useEffect(() => {
        return () => {
            if (imagePreview) URL.revokeObjectURL(imagePreview);
        }
    }, [imagePreview]);

    return (
        <section className="flex flex-col w-full lg:w-[45rem] xl:w-[65rem] items-center justify-center md:justify-start p-3 border shadow-xl rounded-xl gap-y-7">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-y-7">
                {Object.keys(errors).length > 0 && (
                    <div className="text-red-500">
                        Form has errors: {JSON.stringify(errors)}
                    </div>
                )}
                {
                    !isError && isLoading ? (<ProfileFormSkeleton />) : (
                        <>
                            {/* upload image */}
                            <div className="flex flex-col items-center justify-center w-full gap-y-4">
                                <div className="w-48 h-48 rounded-full overflow-hidden flex-shrink-0">
                                    <Image src={imagePreview || user?.asset?.publicUrl || "/si.jpeg"} alt="Foto profil pengguna" width={192} height={192} className="object-cover" priority={false} />
                                </div>
                                <label
                                    htmlFor="file"
                                    className="w-[8rem] bg-gold-500 p-2 rounded-md shadow-lg cursor-pointer hover:-translate-y-1 hover:scale-110 ease-in-out transition delay-150 duration-200 relative text-center">
                                    Pilih Foto
                                </label>
                                <input
                                    {...register("file")}
                                    type="file"
                                    name="file"
                                    id="file"
                                    aria-label="tombol ubah foto profile"
                                    className="w-fit hidden"
                                    onChange={handleImageChange}
                                />
                            </div>
                            {/* general information */}
                            <div className="flex flex-col w-full gap-y-3">
                                {/* name */}
                                <div className="flex items-center gap-x-3">
                                    <label htmlFor="username" className="w-[6rem]">Nama</label>
                                    <input
                                        {...register("username")}
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder="Masukkan nama anda"
                                        className="outline-none p-2 bg-white border-2 rounded-lg w-[18rem]"
                                        // value={name}
                                        // onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                    {errors.username && <p className="text-red-500 text-sm mb-2">{errors.username.message} </p>}
                                </div>
                                {/* email */}
                                <div className="flex items-center gap-x-3">
                                    <label htmlFor="email" className="w-[6rem]">Email</label>
                                    <input
                                        {...register("email")}
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Masukkan email anda"
                                        className="outline-none p-2 bg-white border-2 rounded-lg w-[18rem]"
                                        disabled
                                        // value={email}
                                        // onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message} </p>}
                                </div>
                                {/* telepon */}
                                <div className="flex items-center gap-x-3">
                                    <label htmlFor="phone_number" className="w-[6rem]">No telepon</label>
                                    <input
                                        {...register("phone_number")}
                                        type="tel"
                                        name="phone_number"
                                        id="phone_number"
                                        placeholder="08787281929"
                                        className="outline-none p-2 bg-white border-2 rounded-lg w-[18rem]"
                                        pattern="^(\+62|0)8[1-9][0-9]{6,10}$"
                                        // value={phoneNumber}
                                        // onChange={(e) => setPhoneNumber(e.target.value)}
                                        required
                                    />
                                    {errors.phone_number && <p className="text-red-500 text-sm mb-2">{errors.phone_number.message} </p>}
                                </div>
                                {/* jenis kelamin */}
                                <div className="flex items-center gap-x-3">
                                    <label htmlFor="gender" className="w-[6rem]">Jenis Kelamin</label>
                                    {
                                        !isLoading ? (
                                            <Controller
                                                key={isUserLoaded ? 'loaded' : 'loading'}
                                                control={control}
                                                name="gender"
                                                render={({ field }) => (
                                                    <Select
                                                        value={field.value}
                                                        onValueChange={field.onChange}
                                                    >
                                                        <SelectTrigger className="w-[18rem] focus:outline-none">
                                                            <SelectValue placeholder="Jenis Kelamin" />
                                                        </SelectTrigger>
                                                        <SelectContent className="w-[18rem] flex flex-col space-y-3 text-gray-400 border rounded-xl p-2">
                                                            <SelectItem className="p-1" value="male">Laki-laki</SelectItem>
                                                            <SelectItem className="p-1" value="female">Perempuan</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                        ) : (
                                            <input type="text" className="outline-none p-2 bg-white border-2 rounded-lg w-[18rem]" placeholder="Jenis Kelamin" aria-label="jenis kelamin skeleton" disabled />
                                        )
                                    }
                                </div>
                                {/* tanggal lahir */}
                                <div className="flex items-center gap-x-3">
                                    <label htmlFor="birth_date" className="w-[6rem]">Tanggal Lahir</label>
                                    <input
                                        {...register("birth_date")}
                                        type="date"
                                        name="birth_date"
                                        id="birth_date"
                                        className="outline-none p-2 bg-white border-2 rounded-lg w-[18rem]"
                                        required
                                    // value={birthDateFormater(birthDate)}
                                    // onChange={(e) => setBirthDate(e.target.value)}
                                    />
                                </div>
                                {/* alamat */}
                                <div className="flex items-start gap-x-3">
                                    <label htmlFor="address" className="w-[6rem]">Alamat</label>
                                    <textarea
                                        {...register("address")}
                                        name="address"
                                        id="address"
                                        cols={30}
                                        rows={3}
                                        className="outline-none p-2 bg-white border-2 rounded-lg w-[18rem]"
                                        required
                                        // value={address}
                                        // onChange={(e) => setAddress(e.target.value)}
                                        placeholder="Jl. Neverland Raya No. 07 Blok C RT 07 RW 07">
                                    </textarea>
                                </div>
                            </div>
                        </>
                    )
                }
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
        </section >
    )
}

export default GeneralInformation;
