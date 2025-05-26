'use client'

import Button from "@/app/components-local/ui/button/button";
import CartList from "@/app/components-local/ui/cart/cart-list";
import SummaryOrder from "@/app/components-local/ui/cart/summary-order";
import { CartResponse } from "@/app/types/cart-response";
import { getAccessToken } from "@/lib/token";
import { useGetCarts } from "@/services/cartService";
import { useEffect, useRef, useState } from "react";

const CartPage = () => {
    const [selectedCartIds, setSelectedCartIds] = useState<string[]>([]);
    const [isHidden, setIsHidden] = useState<boolean>(true);
    const [token, setToken] = useState<string>("");
    const [selectedCarts, setSelectedCarts] = useState<CartResponse[]>([]);
    const summaryRef = useRef<HTMLElement | null>(null);

    const scrollToSummary = () => {
        summaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const handleCheckboxCart = (cartId: string) => {
        setSelectedCartIds((prev: string[]) => {
            return prev.includes(cartId) ? prev.filter((id) => id !== cartId) : [...prev, cartId]
        })
    }
    const { data: carts, isLoading, isError } = useGetCarts(token);

    useEffect(() => {

        const token = getAccessToken()
        if (token) {
            setToken(token);
        }
    }, [])

    useEffect(() => {
        if (!carts?.data) return;
        const selectedCarts = carts.data.filter((cart: CartResponse) => selectedCartIds.includes(cart._id));
        setIsHidden(selectedCarts.length === 0);
        setSelectedCarts(selectedCarts)

    }, [carts, selectedCartIds]);

    return (
        <main className="w-full px-4 md:px-15 lg:px-40 py-10 flex flex-col">
            <p className="font-bold text-2xl mb-7 leading-none">Keranjang</p>

            <Button onClick={scrollToSummary} className={`${isHidden ? 'hidden' : 'block'} md:hidden w-full md:w-[20rem] mb-5 p-2 bg-transparent border-gold-500 border-1 text-gold-500 rounded`}>
                Lihat Ringkasan Belanja
            </Button>
            <div className="w-full flex flex-col sm:items-center md:flex-row md:items-start justify-between gap-x-20">
                {/* cart item list */}
                <section className="w-full md:w-4/6 xl:w-2/3">
                    {
                        isError && (
                            <p className="text-red-500 bg-red-200 p-2 rounded-lg text-center">
                                Gagal memuat data keranjang
                            </p>
                        )
                    }
                    <CartList carts={carts?.data || []} isLoading={isLoading} isError={isError} selectedCartIds={selectedCartIds} onCheckboxCart={handleCheckboxCart} />
                </section>
                {/* overview order */}
                <section ref={summaryRef} className="scroll-mt-52 w-full md:w-2/6 xl:w-1/3 relative mt-10 sm:mt-0 bg-white border-1 shadow-xl rounded-md">
                    <SummaryOrder selectedCarts={selectedCarts} />
                </section>
            </div>
        </main >
    )
}

export default CartPage;
