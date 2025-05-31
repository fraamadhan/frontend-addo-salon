'use client'

import Button from "@/app/components-local/ui/button/button";
import CountdownTimer from "@/app/components-local/ui/confirm-payment/countdown-timer";
import HowToPayBank from "@/app/components-local/ui/confirm-payment/how-to-pay-bank";
import HowToPayGopay from "@/app/components-local/ui/confirm-payment/how-to-pay-gopay";
import HowToPayQris from "@/app/components-local/ui/confirm-payment/how-to-pay-qris";
import PaymentInfo from "@/app/components-local/ui/confirm-payment/payment-info";
import { PaymentConfirmType } from "@/app/types/transaction-type";
import { getAccessToken } from "@/lib/token";
import { useGetPaymentConfirm, useGetStatusOrder } from "@/services/transactionService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ConfirmPayment = () => {
    const [token, setToken] = useState('')
    const [isCompleted, setIsCompleted] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [isExpired, setIsExpired] = useState(false);
    const params = useParams<{ transactionId: string }>();

    const { data, isLoading, isError } = useGetPaymentConfirm({ token, transactionId: params.transactionId })
    const { data: order, refetch } = useGetStatusOrder({ token, transactionId: params.transactionId })

    const paymentConfirm: PaymentConfirmType = data?.data ?? null;

    const handleCheckOrderStatus = async () => {
        const result = await refetch();
        console.log(order?.data?.transaction_status);
        const transaction_status = result.data.transaction_status;
        if (transaction_status === 'settlement') {
            setIsCompleted(true)
            setIsPending(false);
            setIsFailed(false);
            setIsExpired(false);
        }
        else if (transaction_status === 'pending') {
            setIsPending(true);
            setIsCompleted(false);
            setIsFailed(false);
            setIsExpired(false);
        }
        else if (transaction_status === 'expire') {
            setIsExpired(true);
            setIsPending(false);
            setIsCompleted(false);
            setIsFailed(false);
        }
        else {
            setIsFailed(true)
            setIsPending(false);
            setIsCompleted(false);
            setIsExpired(false);
        }
    }

    useEffect(() => {
        const token = getAccessToken();
        if (!token) {
            toast.error("Sesi anda sudah habis, silakan login kembali")
            return;
        }

        setToken(token)
    }, [])

    useEffect(() => {
        setIsCompleted(false);
        setIsPending(false);
        setIsFailed(false);
    }, [params.transactionId]);

    if (isLoading || !data) {
        return (
            <div className="flex justify-center items-center w-full min-h-[20rem]">
                <p className="text-gray-500">Memuat data pembayaran...</p>
            </div>
        );
    }
    return (
        <main className="flex flex-col relative justify-center items-center gap-y-3 w-full">
            {
                isError && (
                    <div className="flex items-center justify-center w-full min-h-[20rem]">
                        <p className="text-red-500 text-center text-lg">Tidak dapat mendapatkan data. Mohon hubungi admin</p>
                    </div>
                )
            }
            {
                !isLoading && !isError && (
                    <div className="flex flex-col justify-center items-center w-full gap-y-4">
                        {
                            !isCompleted && paymentConfirm.expiry_time_midtrans && (
                                <CountdownTimer eventDateProps={paymentConfirm.expiry_time_midtrans} />
                            )
                        }
                        {
                            !isPending && !isFailed && isCompleted && (
                                <div className="w-full p-4 bg-white shadow rounded-md text-center items-center justify-center flex flex-col gap-y-1">
                                    <div className="text-xl font-semibold mb-2">Status Pembayaran</div>
                                    <div className={`w-[12rem] rounded-md text-center my-3 text-2xl font-medium bg-success-500 text-white`}>
                                        Pembayaran berhasil!
                                    </div>
                                </div>
                            )
                        }
                        {
                            !isCompleted && isPending && (
                                <div className="w-full p-4 bg-white shadow rounded-md text-center items-center justify-center flex flex-col gap-y-1">
                                    <div className="text-xl font-semibold mb-2">Status Pembayaran</div>
                                    <div className={`w-[12rem] rounded-md text-center my-3 text-2xl font-medium bg-blue-500 text-white`}>
                                        Bayar dulu yuk tagihannya
                                    </div>
                                </div>
                            )
                        }
                        {
                            isExpired && (
                                <div className="w-full p-4 bg-white shadow rounded-md text-center items-center justify-center flex flex-col gap-y-1">
                                    <div className="text-xl font-semibold mb-2">Status Pembayaran</div>
                                    <div className={`w-[12rem] rounded-md text-center my-3 text-2xl font-medium bg-red-500 text-white`}>
                                        Pembayaran Kedaluwarsa
                                    </div>
                                </div>
                            )
                        }
                        {
                            !isCompleted && !isPending && isFailed && (
                                <div className="w-full p-4 bg-white shadow rounded-md text-center items-center justify-center flex flex-col gap-y-1">
                                    <div className="text-xl font-semibold mb-2">Status Pembayaran</div>
                                    <div className={`w-[12rem] rounded-md text-center my-3 text-2xl font-medium bg-red-500 text-white`}>
                                        Pembayaran gagal
                                    </div>
                                </div>
                            )
                        }
                        <PaymentInfo payment_type={paymentConfirm.payment_type_midtrans || null} bank={paymentConfirm.bank} va_number={paymentConfirm.va_number || null} url={paymentConfirm.url || null} total_price={paymentConfirm.total_price} orderCode={paymentConfirm.orderCode || null} />
                        {
                            !isCompleted && (
                                <Button className="p-2 w-[15rem] md:w-[20rem] md:w-max-[35rem] bg-gold-500 text-white rounded-lg" onClick={handleCheckOrderStatus}>
                                    Cek Status Pesanan
                                </Button>
                            )
                        }
                        {
                            paymentConfirm.payment_type_midtrans === 'gopay' && (
                                <HowToPayGopay />
                            )
                        }
                        {
                            paymentConfirm.payment_type_midtrans === 'qris' && (
                                <HowToPayQris />
                            )
                        }
                        {
                            paymentConfirm.payment_type_midtrans === 'bank_transfer' && (
                                <HowToPayBank />
                            )
                        }
                    </div>
                )
            }
        </main>
    )
}

export default ConfirmPayment;
