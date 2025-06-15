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
    const [paymentStatus, setPaymentStatus] = useState<'completed' | 'pending' | 'expired' | 'failed' | null>(null);
    const params = useParams<{ transactionId: string }>();

    const { data, isLoading, isError } = useGetPaymentConfirm({ token, transactionId: params.transactionId })
    const { data: order, refetch } = useGetStatusOrder({ token, transactionId: params.transactionId })

    const paymentConfirm: PaymentConfirmType = data?.data ?? null;

    const handleCheckOrderStatus = async () => {
        const result = await refetch();
        const transaction_status = result.data.transaction_status;
        if (transaction_status === 'settlement') {
            setPaymentStatus('completed')
        }
        else if (transaction_status === 'pending') {
            setPaymentStatus('pending')
        }
        else if (transaction_status === 'expire') {
            setPaymentStatus('expired')
        }
        else {
            setPaymentStatus('failed')
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
        if (paymentConfirm?.status === 'PAID') {
            setPaymentStatus('completed')
        }
        else if (paymentConfirm?.status === 'EXPIRED') {
            setPaymentStatus('expired')
        }
        else if (paymentConfirm?.status === 'FAILED') {
            setPaymentStatus('failed')
        }
    }, [params.transactionId, paymentConfirm?.status]);

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
                            paymentStatus !== 'completed' && paymentConfirm.expiry_time_midtrans && (
                                <CountdownTimer eventDateProps={paymentConfirm?.expiry_time_midtrans} />
                            )
                        }
                        {
                            paymentStatus === 'completed' && (
                                <div className="w-full p-4 bg-white shadow rounded-md text-center items-center justify-center flex flex-col gap-y-1">
                                    <div className="text-xl font-semibold mb-2">Status Pembayaran</div>
                                    <div className={`w-[12rem] rounded-md text-center my-3 text-2xl font-medium bg-success-500 text-white`}>
                                        Pembayaran berhasil!
                                    </div>
                                </div>
                            )
                        }
                        {
                            paymentStatus === 'pending' && (
                                <div className="w-full p-4 bg-white shadow rounded-md text-center items-center justify-center flex flex-col gap-y-1">
                                    <div className="text-xl font-semibold mb-2">Status Pembayaran</div>
                                    <div className={`w-[12rem] rounded-md text-center my-3 text-2xl font-medium bg-blue-500 text-white`}>
                                        Bayar dulu yuk tagihannya
                                    </div>
                                </div>
                            )
                        }
                        {
                            paymentStatus === 'expired' && (
                                <div className="w-full p-4 bg-white shadow rounded-md text-center items-center justify-center flex flex-col gap-y-1">
                                    <div className="text-xl font-semibold mb-2">Status Pembayaran</div>
                                    <div className={`w-[12rem] rounded-md text-center my-3 text-2xl font-medium bg-red-500 text-white`}>
                                        Pembayaran Kedaluwarsa
                                    </div>
                                </div>
                            )
                        }
                        {
                            paymentStatus === 'failed' && (
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
                            paymentStatus !== 'completed' && (
                                <Button className="p-2 w-[15rem] md:w-[20rem] max-w-[35rem] bg-gold-500 text-white rounded-lg" onClick={handleCheckOrderStatus}>
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
