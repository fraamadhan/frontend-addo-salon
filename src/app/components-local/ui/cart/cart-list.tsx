import { CartResponse } from "@/app/types/cart-response";
import CartItem from "./cart-item";
import { CartListSkeleton } from "../skeleton";

const CartList = ({ carts, cartNotes, isLoading, isError, selectedCartIds, onCheckboxCart, onNoteChange }: { carts: CartResponse[], cartNotes: Record<string, string>, isLoading: boolean, isError: boolean, selectedCartIds: string[], onCheckboxCart: (value: string) => void, onNoteChange: (cartId: string, value: string) => void }) => {
    return (
        <div className="w-full flex flex-col gap-6">
            {
                isLoading ? <CartListSkeleton /> : (
                    carts.map((cart) => (
                        <CartItem key={cart._id} note={cartNotes[cart._id] || ""} onNoteChange={onNoteChange} cart={cart} checked={selectedCartIds.includes(cart._id)} onCheckboxCart={onCheckboxCart} />
                    ))
                )
            }
            {
                !isLoading && !isError && carts?.length === 0 && (
                    <div className="flex items-center justify-center w-full min-h-[20rem]">
                        <p className="text-gray-400 text-center text-lg">Belum ada layanan di keranjang</p>
                    </div>
                )
            }
        </div>
    )
}

export default CartList;
