'use client'

import SummaryPayment from "@/app/components-local/ui/payment/summary-payment";
import { CalculateBillResponse, CollectBillResponse } from "@/app/types/checkout-payment-response";
import { paymentBankTransfer, paymentEWallet, paymentQRIS } from "@/lib/payment-method-content";
import { getAccessToken } from "@/lib/token";
import { useCalculateBill } from "@/services/transactionService";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const PaymentPage = () => {
    const [checkoutItems, setCheckoutItems] = useState<CollectBillResponse | null>(null);
    const [transactionInfo, setTransactionInfo] = useState<CalculateBillResponse | null>(null);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [bank, setBank] = useState('');
    const [token, setToken] = useState('');
    const router = useRouter();

    const onChangePaymentMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedMethod = e.target.value;
        const bank_transfer = ['bca', 'bni', 'bri', 'permata'];
        const paymentMethod = bank_transfer.includes(selectedMethod)
            ? 'bank_transfer'
            : selectedMethod;
        const bank = bank_transfer.includes(selectedMethod)
            ? selectedMethod
            : ''
        setBank(bank)
        setPaymentMethod(paymentMethod);

        mutationCalculateBill.mutate(
            {
                token,
                body: {
                    transactionId: checkoutItems?.transactionId || '',
                    paymentMethod: paymentMethod
                }
            }
        )
    }

    const mutationCalculateBill = useCalculateBill({
        onSuccess: (data) => {
            if (data.status !== 200) {
                toast.error(data.message || "Gagal menghitung tagihan");
                return;
            }
            else if (data.status === 200) {
                toast.success("Berhasil menghitung tagihan");
                setTransactionInfo(data.data);
            }
        },
        onError: (error) => {
            toast.error(error.message || "Terjadi kesalahan saat menghitung tagihan");
            console.error('Error calculating bill:', error);
        }
    })

    useEffect(() => {
        const token = getAccessToken();
        if (!token) {
            toast.error("Token tidak ditemukan, silakan login kembali");
            return;
        }
        setToken(token);
    }, [])

    useEffect(() => {
        const localItems = localStorage.getItem('checkoutItems');
        if (localItems) {
            setCheckoutItems(JSON.parse(localItems));
        }
        else {
            router.replace('/cart')
        }
    }, [router])

    return (
        <main className="w-full px-4 md:px-15 lg:px-40 py-10 flex flex-col gap-y-7">
            <p className="leading-none font-bold text-2xl">Pembayaran <span className="leading-none text-red-500 text-sm bg-red-200 py-1 px-2 rounded-lg">wajib</span></p>
            <p className="leading-none font-bold text-lg">Metode Pembayaran</p>
            <div className="w-full flex flex-col items-center md:flex-row md:items-start gap-x-10">
                <div className="w-full lg:w-4/6 xl:w-2/3">
                    <div className="w-full">
                        <p className="leading-none font-semibold">Virtual Account</p>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-4">
                            {
                                paymentBankTransfer.map((item, idx) => (
                                    <div key={`${item.id}-${idx}`} className="flex items-center gap-x-3 p-2 border-1 rounded-md bg-gold-100 shadow-sm max-h-[3rem] max-w-[23rem]">
                                        <input type="radio" name="paymentMethod" aria-label={item.label} id={`bank-${item.id}`} className="w-5 h-5 cursor-pointer" onChange={onChangePaymentMethod} value={item.value} />
                                        <div className="relative w-[80px] h-[30px]">
                                            <Image
                                                src={item.src}
                                                alt={item.alt}
                                                fill
                                                className="object-contain"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>
                                        <p className="leading-none lg:hidden">{item.label}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="w-full">
                        <p className="leading-none font-semibold">Dompet Digital</p>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-4">
                            {
                                paymentEWallet.map((item) => (
                                    <div key={item.id} className="flex items-center gap-x-3 p-2 border-1 rounded-md bg-gold-100 shadow-sm max-h-[3rem] max-w-[23rem]">
                                        <input type="radio" name="paymentMethod" aria-label={item.label} id={`ewallet-${item.id}`} className="w-5 h-5 cursor-pointer" onChange={onChangePaymentMethod} value={item.value} />
                                        <div className="relative w-[80px] h-[30px]">
                                            <Image
                                                src={item.src}
                                                alt={item.alt}
                                                fill
                                                className="object-contain"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>
                                        <p className="leading-none lg:hidden">{item.label}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="w-full">
                        <p className="leading-none font-semibold">QRIS</p>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-4">
                            {
                                paymentQRIS.map((item) => (
                                    <div key={item.id} className="flex items-center gap-x-3 p-2 border-1 rounded-md bg-gold-100 shadow-sm max-h-[3rem] max-w-[23rem]">
                                        <input type="radio" name="paymentMethod" aria-label={item.label} id={`qris-${item.id}`} className="w-5 h-5 cursor-pointer" onChange={onChangePaymentMethod} value={item.value} />
                                        <div className="relative w-[80px] h-[30px]">
                                            <Image
                                                src={item.src}
                                                alt={item.alt}
                                                fill
                                                className="object-contain"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>
                                        <p className="leading-none lg:hidden">{item.label}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-2/6 xl:w-1/3 relative mt-10 sm:mt-0 bg-white border-1 shadow-xl rounded-md">
                    <SummaryPayment token={token} bank={bank} transactionInfo={transactionInfo} checkoutItems={checkoutItems} paymentMethod={paymentMethod} />
                </div>
            </div>
        </main>
    )
}

export default PaymentPage;
