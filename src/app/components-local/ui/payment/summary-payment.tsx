'use client';

import { rupiahFormatter } from "@/lib/rupiah-formatter";
import Button from "../button/button";
import SummaryOrderItem from "../cart/summary-order-item";
import { CalculateBillResponse, CollectBillResponse } from "@/app/types/checkout-payment-response";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { usePaymentTransaction } from "@/services/transactionService";
import { Loader2Icon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const SummaryPayment = ({ token, bank, transactionInfo, paymentMethod, checkoutItems }: { token: string, bank: string, transactionInfo: CalculateBillResponse | null, paymentMethod: string, checkoutItems: CollectBillResponse | null }) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const onHandlePaymentTransaction = () => {

        const estimationMap = new Map(
            checkoutItems?.items.map(item => [item.productId, item.estimation])
        );

        const body = {
            transactionId: checkoutItems?.transactionId || '',
            paymentMethod: paymentMethod,
            bank: bank ?? undefined,
            transactionFee: transactionInfo?.transactionFee || 0,
            items: transactionInfo?.items.map(item => ({
                productId: item.productId,
                price: item.price,
                reservationDate: item.reservationDate,
                estimation: estimationMap.get(item.productId) || 0,
            })) || []
        }
        mutation.mutate({ token, body })
    }

    const mutation = usePaymentTransaction({
        onSuccess: (data) => {
            if (data.status !== 200) {
                console.error(data.message);
                toast.error(data.message || "Gagal membuat tagihan");
                return;
            }
            else if (data.status === 200) {
                queryClient.invalidateQueries({ queryKey: ["getCarts"] })
                localStorage.removeItem('checkoutItems')
                toast.success("Berhasil membuat tagihan");
                router.replace(`payment/confirm/${data.data.order_id}`);
                return;
            }
        },
        onError: (error) => {
            console.error(error);
            toast.error(error.message || "Terjadi kesalahan saat membuat tagihan");
            console.error('Error processing payment:', error);
        }
    });
    return (
        <div className="w-full p-4 flex flex-col gap-y-5">
            <p className="font-semibold text-lg leading-none">Ringkasan Belanja</p>
            <div className="w-full flex flex-col gap-y-1">
                {
                    checkoutItems && checkoutItems.items.length !== 0 && checkoutItems.items.map((item, idx) => (
                        <SummaryOrderItem idx={idx + 1} key={`${item.productId}-${idx}`} item={item} />
                    ))
                }
            </div>
            <div className="flex md:flex-col lg:flex-row justify-between w-full gap-y-2">
                <p className="leading-none font-medium text-sm">Biaya transaksi metode pembayaran</p>
                <p className="leading-none font-medium text-sm">{rupiahFormatter(transactionInfo?.transactionFee || 0)}</p>
            </div>
            {
                transactionInfo?.grandTotalPrice && (
                    <div className="flex md:flex-col lg:flex-row justify-between w-full text-sm xl:text-base gap-y-2">
                        <p className="leading-none text-lg font-semibold">Total Harga</p>
                        <p className="leading-none text-lg font-semibold">{rupiahFormatter(transactionInfo.grandTotalPrice)}</p>
                    </div>
                )
            }
            {
                mutation.isPending ? (
                    <Button className={`flex items-center justify-center p-2 w-full bg-transparent border-1 border-gold-500 text-gold-500 rounded-lg`} disabled onClick={onHandlePaymentTransaction}>
                        <Loader2Icon className="animate-spin" />
                    </Button>
                ) : (
                    <Button className={`p-2 w-full ${!paymentMethod ? 'bg-white border-1 border-gray-300 text-gray-300' : 'bg-gold-500 text-white'} rounded-lg`} disabled={!paymentMethod} onClick={onHandlePaymentTransaction}>
                        Bayar
                    </Button>
                )
            }
        </div >
    )
}

export default SummaryPayment;
