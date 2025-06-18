'use client'

import { CartResponse } from "@/app/types/cart-response";
import { dateFormatter } from "@/lib/date-formatter";
import { rupiahFormatter } from "@/lib/rupiah-formatter";
import { getAccessToken } from "@/lib/token";
import { useDeleteCart } from "@/services/cartService";
import { useQueryClient } from "@tanstack/react-query";
import { LoaderCircleIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

const CartItem = ({ cart, note, checked, onCheckboxCart, onNoteChange }: { cart: CartResponse, note: string, checked: boolean, onCheckboxCart: (value: string) => void, onNoteChange: (cartId: string, value: string) => void }) => {

    const queryClient = useQueryClient();
    const handleDeleteCart = (cartId: string) => {
        const token = getAccessToken();
        if (!token) {
            toast.error("Silakan login terlebih dahulu");
            return;
        }
        mutation.mutate({
            token,
            cartId,
        })
    }

    const mutation = useDeleteCart({
        onSuccess: (data) => {
            if (data.status !== 200 || data.statusCode === 400) {
                toast.error(data.message || data.message[0]);
            } else {
                queryClient.invalidateQueries({ queryKey: ["getCarts"] });
                toast.success("Cart deleted successfully");
            }
        },
        onError: (error) => {
            console.error("Error deleting cart:", error);
            toast.error(error.message || "Failed to delete cart");
        }
    })
    return (
        <article className="flex flex-col gap-4 w-full p-4 items-center justify-evenly border-b-4 relative">
            <div className="flex items-center justify-evenly gap-x-3 shrink-0 w-full">
                <div className="pt-2">
                    <input type="checkbox" checked={checked} name="pick" id="pick" aria-label="checkout item" className="w-4 h-4" onChange={() => onCheckboxCart(cart._id)} disabled={mutation.isPending} />
                </div>
                <Image src={cart.assetRef || '/si.svg'} width={80} height={80} alt="foto produk" className="object-cover rounded-md" />
                <Link className="w-full flex flex-col gap-y-2" href={`/service/${cart.product.name.split(' ').join('-')}/${cart.product._id}`}>
                    <p className="leading-none text-xl font-bold">{cart.product.name}</p>
                    <p className="leading-none text-xl font-bold">{rupiahFormatter(cart.price)}</p>
                    <p className="text-sm font-normal leading-none">Jadwal Pesanan: <span className="text-sm font-normal">{dateFormatter(cart.reservationDate)}</span></p>
                </Link>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch justify-between w-full p-2 gap-y-7">
                <input type="text" aria-label="catatan pesanan" value={note} placeholder="Catatan untuk pegawai" name="note" id={`note-${cart._id}`} className="mt-1 w-full md:w-3/4 px-2 py-2 border rounded-md outline-none" onChange={(e) => onNoteChange(cart._id, e.target.value)} />
                <div className="flex items-end justify-end ml-3" onClick={() => handleDeleteCart(cart._id)}>
                    {mutation.isPending ? (
                        <LoaderCircleIcon size={24} className="animate-spin text-gold-500" />
                    ) : (<TrashIcon size={24} />)
                    }
                </div>
            </div>
        </article>
    )
}

export default CartItem;
