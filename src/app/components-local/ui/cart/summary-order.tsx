'use client';

import { CartResponse, CheckoutResponse } from "@/app/types/cart-response";
import SummaryOrderItem from "./summary-order-item";
import { totalPriceCount } from "@/lib/general";
import { rupiahFormatter } from "@/lib/rupiah-formatter";
import Button from "../button/button";
import { useCheckoutCart } from "@/services/cartService";
import { toast } from "sonner";
import { useCollectBill } from "@/services/transactionService";
import { getAccessToken } from "@/lib/token";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { CollectBillItem } from "@/app/types/checkout-payment-response";

const SummaryOrder = ({ selectedCarts, cartNotes }: { selectedCarts: CartResponse[], cartNotes: Record<string, string> }) => {

    const router = useRouter();
    const totalPrice = useMemo(() => totalPriceCount(selectedCarts), [selectedCarts]);

    const handleCheckoutCart = () => {
        const token = getAccessToken();
        if (!token) {
            toast.error("Anda harus login terlebih dahulu");
            return;
        }
        const body = {
            items: selectedCarts.map((cart) => ({
                cartId: cart._id,
                productId: cart.product._id,
                reservationDate: cart.reservationDate,
                estimation: cart.product.estimation,
            }))
        }

        // checkout
        mutationCheckout.mutate({
            token,
            items: body.items
        });
    }
    const mutationCheckout = useCheckoutCart({
        onSuccess: (data) => {
            if (data.status !== 200) {
                toast.error(data.message || "Checkout gagal")
            }
            else {
                const token = getAccessToken();
                if (!token) {
                    toast.error("Anda harus login terlebih dahulu");
                    return;
                }
                mutationCollectBill.mutate({
                    token,
                    items: data.data.map((cart: CheckoutResponse) => ({
                        note: cart.note || cartNotes[cart.cartId] || "",
                        productId: cart.productId,
                        reservationDate: cart.reservationDate,
                        price: cart.price,
                    }))
                })
            }
        },
        onError: (error) => {
            console.error("Checkout failed:", error);
            toast.error(error.message || "Gagal checkout keranjang");
        }
    })

    const mutationCollectBill = useCollectBill({
        onSuccess: (data) => {
            if (data.status !== 201) {
                toast.error(data.message || "Gagal mengumpulkan tagihan")
            }
            else {
                const estimationMap = new Map(
                    selectedCarts.map((cart) => [cart.product._id, cart.product.estimation])
                );
                const items = data.data.items.map((item: CollectBillItem) => ({
                    transactionId: item.transactionId,
                    productId: item.productId,
                    reservationDate: item.reservationDate,
                    price: item.price,
                    estimation: estimationMap.get(item.productId) || 0,
                }))
                const body = {
                    transactionId: data.data.transaction._id,
                    totalPrice: data.data.transaction.total_price,
                    items: items
                }
                localStorage.setItem('checkoutItems', JSON.stringify(body));
                toast.success("Anda akan diarahkan ke halaman pembayaran", {
                    action: {
                        label: "Atau klik di sini",
                        onClick: () => {
                            router.push("/payment");
                        }
                    }
                });
                router.push("/payment");
            }
        },
        onError: (error) => {
            console.error("Collect bill failed:", error);
            toast.error(error.message || "Gagal menyimpan data checkout");
        }
    })

    return (
        <div className="w-full p-4 flex flex-col gap-y-5">
            <p className="font-semibold text-lg leading-none">Ringkasan Belanja</p>
            <div className="w-full flex flex-col gap-y-1">
                {
                    selectedCarts && selectedCarts.length !== 0 && selectedCarts.map((item, idx) => (
                        <SummaryOrderItem idx={idx + 1} key={item._id} item={item} />
                    ))
                }
            </div>
            <div className="flex md:flex-col lg:flex-row justify-between w-full text-sm xl:text-base gap-y-2">
                <p className="leading-none text-lg font-semibold">Total Harga</p>
                <p className="leading-none text-lg font-semibold">{rupiahFormatter(totalPrice)}</p>
            </div>
            <Button className={`p-2 w-full ${selectedCarts.length === 0 ? 'bg-white border-1 border-gray-300 text-gray-300' : 'bg-gold-500 text-white'} rounded-lg`} disabled={selectedCarts.length === 0} onClick={handleCheckoutCart}>
                Beli
            </Button>
        </div>
    )
}

export default SummaryOrder;
