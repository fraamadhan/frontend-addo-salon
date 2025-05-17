'use client';

import Image from "next/image";
import Button from "../button/button";
import { PlusIcon } from "lucide-react";
import { ServiceDetailSkeleton } from "../skeleton";
import { rupiahFormatter } from "@/lib/rupiah-formatter";
import { CategoryItem, ServiceDetailProps } from "@/app/types/general";

const ServiceDetail = ({ product, isLoading, isError }: { product: ServiceDetailProps, isLoading: boolean, isError: boolean }) => {

    return (
        <section className="flex flex-col gap-y-3 lg:flex-row gap-x-10 justify-center items-center">
            {
                isError && (
                    <div className="flex items-center mt-7">
                        <p className="bg-red-200 text-red-500 p-2">Gagal memuat data produk</p>
                    </div>
                )
            }
            {
                !isError && (isLoading ? (
                    <ServiceDetailSkeleton />
                ) :
                    (
                        <>
                            <div className="w-[15rem] h-[23rem] md:w-[20rem] md:h-[28rem] bg-gray-100 flex items-center justify-center lg:justify-start rounded shadow-2xl">
                                <Image
                                    src={product?.assetRef || "/si.jpeg"}
                                    alt="Contoh gambar layanan jasa Addo Salon"
                                    width={320}
                                    height={350}
                                    className="w-full h-full object-cover rounded"
                                    priority
                                />
                            </div>
                            <div className="flex flex-col gap-y-3">
                                <div className="text-lg font-medium">
                                    {product?.name}
                                </div>
                                <div className="text-xl font-bold">
                                    {rupiahFormatter(product?.price)}
                                </div>
                                <div className="font-medium p-2 rounded-sm bg-gray-50 w-fit">
                                    {product?.type}
                                </div>
                                {/* category can be more than one */}
                                <div className="flex gap-x-2 text-sm w-full">
                                    {
                                        product?.category?.map((value: CategoryItem) => (
                                            <div key={value._id} className="bg-gray-100 p-2 rounded-sm"> Haircut</div>
                                        ))
                                    }
                                </div>
                                <hr className="w-full border-1" />
                                <div className="flex flex-col gap-y-2">
                                    <div className="flex flex-col gap-y-2">
                                        {/* TODO integrate the add to cart feature */}
                                        <label htmlFor="schedule">Pilih jadwal</label>
                                        <input type="datetime-local" name="schedule" id="schedule" className="max-w-[12rem] border p-1 bg-white rounded-md" />
                                    </div>
                                    <div className="p-2 bg-warning-200 rounded-md">
                                        <p className="font-light w-fit lg:w-[15rem]">Untuk memilih jadwal dapat melihat jadwal pesanan di bawah agar tidak terjadi bentrok. Perhatikan estimasi waktu di hari kamu memesan</p>
                                    </div>
                                </div>
                                {/* add to cart button */}
                                <div className="w-full mt-4">
                                    <Button className="flex w-full items-center justify-center gap-x-1 border-2 p-2 cursor-pointer border-gold-500 bg-gold-500 text-white hover:bg-gold-600 rounded-md  ">
                                        <PlusIcon stroke="#ffffff" className="w-5 h-5" />
                                        <span className="leading-none">Keranjang</span>
                                    </Button>
                                </div>
                            </div>
                        </>
                    ))
            }

        </section>
    )
}

export default ServiceDetail;
