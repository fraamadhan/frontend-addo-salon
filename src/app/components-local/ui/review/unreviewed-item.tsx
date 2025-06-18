
'use client'

import { UnreviewedItemType } from "@/app/types/review-response";
import Button from "../button/button";
import { dateFormatter } from "@/lib/date-formatter";
import { rupiahFormatter } from "@/lib/rupiah-formatter";
import Image from "next/image";
import { useState } from "react";
import ModalAddReview from "../modal/modal";
import { toast } from "sonner";
import { useAddReview } from "@/services/reviewService";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const UnreviewedItem = (
    { item, token }: { item: UnreviewedItemType, token: string }
) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const queryClient = useQueryClient();
    const router = useRouter();

    const onSubmit = (data: { rating: number, review: string }) => {
        const body = {
            rating: data.rating,
            review: data.review,
            productId: item.product._id,
            itemId: item._id
        }
        mutation.mutate({ token, body })
    }

    const mutation = useAddReview({
        onSuccess: (data) => {
            if (data.status !== 201) {
                toast.error(data.message)
                setIsModalOpen(false)
                return;
            }
            else {
                queryClient.invalidateQueries({ queryKey: ['getUnreviewedItems'] });
                queryClient.invalidateQueries({ queryKey: ['getReviews'] });
                queryClient.invalidateQueries({ queryKey: ['getRandomReview'] });
                toast.success("Terima kasih! Ulasan berhasil dibuat", {
                    action: {
                        label: "Lihat layanan",
                        onClick: () => {
                            router.push(`/service/${item.product.name.split(' ').join('-')}/${item.product._id}`);
                        }
                    }
                });
            }
        },
        onError: (error) => {
            console.log(error as string || JSON.stringify(error))
            toast.error(error.message || "Gagal membuat ulasan")
        }
    })
    return (
        <div className="w-full flex flex-col gap-y-2 border-2 rounded-xl shadow-xl p-4">
            {/* top */}
            <div className="flex flex-col-reverse md:flex-row md:items-center gap-y-1">
                <div className="flex w-full text-sm items-center gap-x-2">
                    <p className="mr-3">{dateFormatter(item.reservationDate)}</p>
                    <p className="text-gray-400 font-bold">{item.transaction.orderCode}</p>
                </div>
                <div className="w-full flex md:justify-end">
                    <div className={`p-2 bg-blue-300 text-blue-500 font-bold text-[1rem] rounded-lg shadow-sm w-[10rem] max-w-[10rem] h-fit text-center`}>
                        <p className="leading-none">
                            Belum diberi ulasan
                        </p>
                    </div>
                </div>
            </div >
            {/* mid */}
            <div className="w-full flex flex-col md:flex-row md:items-center gap-y-2">
                {/* service information */}
                <div className="w-full flex items-center gap-x-7">
                    <div className="w-[70px] h-[85px] md:w-[100px] md:h-[120px] relative">
                        <Image src={item.product.assetRef || '/si.svg'} fill
                            sizes="(max-width: 100px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            alt={`Gambar layanan`}
                            className="rounded-md object-cover"
                            priority={true} />
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <div className="max-w-[25rem]">
                            <p className="w-[10rem] md:w-[12rem] lg:w-[25rem] leading-none font-bold text-gold-500 line-clamp-3">
                                {item.product.name}
                            </p>
                        </div>
                        <p className="leading-none text-sm">{rupiahFormatter(item.price)}</p>
                    </div>
                </div>
                {/* total price */}
                <div className="w-full flex md:flex-col items-center md:items-start justify-between md:justify-start gap-3">
                    <p className="leading-none">Total Harga</p>
                    <p className="leading-none font-bold text-lg">{rupiahFormatter(item.transaction.total_price)}</p>
                </div>
            </div >
            {/* bottom */}
            <div className="flex items-center justify-end">
                <Button className="font-bold text-gold-500 text-lg bg-gold-50 p-2 rounded-lg shadow-md" onClick={() => setIsModalOpen(true)}>
                    Beri ulasan
                </Button>
            </div>
            {
                isModalOpen && (
                    <ModalAddReview onClose={() => setIsModalOpen(false)} onSubmit={onSubmit} />
                )
            }
        </div >
    )
}

export default UnreviewedItem;
