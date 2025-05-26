import { CartResponse } from "@/app/types/cart-response";
import SummaryOrderItem from "./summary-order-item";
import { totalEstimation, totalPriceCount } from "@/lib/general";
import { rupiahFormatter } from "@/lib/rupiah-formatter";
import Button from "../button/button";

const SummaryOrder = ({ selectedCarts }: { selectedCarts: CartResponse[] }) => {
    let totalPrice = 0;
    let accumEstimation = 0;

    if (selectedCarts) {
        if (selectedCarts.length !== 0) {
            totalPrice = totalPriceCount(selectedCarts);
            accumEstimation = totalEstimation(selectedCarts);
        }
    }
    return (
        <div className="w-full p-4 flex flex-col gap-y-5">
            <p className="font-semibold text-lg leading-none">Ringkasan Belanja</p>
            <div className="w-full flex flex-col gap-y-1">
                {
                    selectedCarts && selectedCarts.length !== 0 && selectedCarts.map((item, idx) => (
                        <SummaryOrderItem idx={idx + 1} key={idx} item={item} />
                    ))
                }
            </div>
            <div className="flex md:flex-col lg:flex-row justify-between w-full gap-y-2">
                <p className="leading-none font-semibold">Total Estimasi</p>
                <p className="leading-none font-semibold">{accumEstimation} jam</p>
            </div>
            <div className="flex md:flex-col lg:flex-row justify-between w-full text-sm xl:text-base gap-y-2">
                <p className="leading-none text-lg font-semibold">Total Harga</p>
                <p className="leading-none text-lg font-semibold">{rupiahFormatter(totalPrice)}</p>
            </div>
            <Button className={`p-2 w-full ${selectedCarts.length === 0 ? 'bg-white border-1 border-gray-300 text-gray-300' : 'bg-gold-500 text-white'} rounded-lg`} disabled={selectedCarts.length === 0}>
                Beli
            </Button>
        </div>
    )
}

export default SummaryOrder;
