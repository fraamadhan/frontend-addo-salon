import { CartResponse } from "@/app/types/cart-response";
import CartItem from "./cart-item";
import { CartListSkeleton } from "../skeleton";

const CartList = ({ carts, isLoading, isError, selectedCartIds, onCheckboxCart }: { carts: CartResponse[], isLoading: boolean, isError: boolean, selectedCartIds: string[], onCheckboxCart: (value: string) => void }) => {
    return (
        <div className="w-full flex flex-col gap-6">
            {
                isLoading ? <CartListSkeleton /> : (
                    carts.map((cart) => (
                        <CartItem key={cart._id} cart={cart} checked={selectedCartIds.includes(cart._id)} onCheckboxCart={onCheckboxCart} />
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
