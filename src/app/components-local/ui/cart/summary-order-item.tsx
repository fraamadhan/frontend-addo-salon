import { CartResponse } from "@/app/types/cart-response";
import { rupiahFormatter } from "@/lib/rupiah-formatter";

const SummaryOrderItem = (props: { idx: number, item: CartResponse }) => {
    return (
        <article className="w-full flex flex-col gap-y-1 border-b-2 border-gold-500 p-2 shadow-lg">
            <p className="font-semibold">Pesanan ke {props.idx}</p>
            <div className="flex md:flex-col lg:flex-row justify-between gap-y-1">
                <p className="leading-none">Total pesanan</p>
                <p className="leading-none">{rupiahFormatter(props.item.price)}</p>
            </div>
        </article>
    )
}

export default SummaryOrderItem;