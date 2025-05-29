'use client'

import { CopyIcon } from "lucide-react";
import Button from "../button/button";
import { useRef } from "react";
import { toast } from "sonner";
import { rupiahFormatter } from "@/lib/rupiah-formatter";
import Image from "next/image";

const PaymentInfo = ({ payment_type, bank, va_number, url, total_price, orderCode }: { payment_type: string | null, bank: string | null, va_number: string | null, url: string[] | null, total_price: number | null, orderCode: string | null }) => {

    const textRef = useRef<HTMLParagraphElement>(null);
    const handleCopy = async (type: string | null = '') => {
        try {
            if (textRef.current) {
                await navigator.clipboard.writeText(textRef.current.textContent || "");
            }
            else if (type === 'deeplink' && url && url[1] !== null) {
                await navigator.clipboard.writeText(url[1])
            }
            else if (url && url[0] !== null) {
                await navigator.clipboard.writeText(url[0])
            }
            toast.info("Copied!")
        } catch (error) {
            console.error("Failed to copy:", error);
        }
    };
    return (
        <div className="w-[20rem] md:w-[35rem] md:w-max-[60rem] relative flex flex-col items-center justify-center gap-y-2">
            {
                (payment_type === 'qris' || payment_type === 'gopay') && (
                    <>
                        <Image src={url?.[0] || ''} width={200} height={200} alt="Gambar QR Code" />
                        <Button onClick={() => handleCopy()} className="p-2 bg-success-400 rounded-md">Salin link QR Code</Button>
                    </>
                )
            }
            <table className="w-full border-2 border-gold-500 rounded-xl text-sm">
                <thead>
                    <tr className=" border-gold-500 rounded-tr-md border-1 bg-gold-100">
                        {
                            payment_type === 'bank_transfer' && bank && (
                                <th colSpan={2} className="text-left font-semibold p-2">
                                    <span>{bank.toUpperCase()}</span> Virtual Account
                                </th>
                            )
                        }
                        {
                            payment_type === 'qris' && (
                                <th colSpan={2} className="text-left font-semibold p-2">
                                    Pembayaran QRIS
                                </th>
                            )
                        }
                        {
                            payment_type === 'gopay' && (
                                <th colSpan={2} className="text-left font-semibold p-2">
                                    Pembayaran GoPay
                                </th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        payment_type === 'bank_transfer' && (
                            <tr className="border-t border-gold-500">
                                <td className="p-2 font-medium">Nomor Virtual Account</td>
                                <td className="p-2 text-right select-text flex items-center justify-end gap-x-1">
                                    <p ref={textRef}>{va_number || "xxxxxx"}</p>
                                    <Button className="ml-2 text-gray-500 hover:text-blue-600 transition flex gap-x-1"
                                        title="Copy to clipboard" onClick={() => handleCopy()}>
                                        <CopyIcon size={18} />
                                        <div>Salin</div>
                                    </Button>
                                </td>
                            </tr>
                        )
                    }
                    {
                        payment_type === 'gopay' && (
                            <tr className="border-t border-gold-500">
                                <td colSpan={2} className="p-2 text-right select-text flex items-center justify-start gap-x-1">
                                    <p>Bayar</p>
                                    <Button className="ml-2 text-gray-500 hover:text-blue-600 transition flex gap-x-1 items-center justify-center"
                                        title="Copy to clipboard" onClick={() => handleCopy("deeplink")}>
                                        <CopyIcon size={18} />
                                        <div>Salin</div>
                                    </Button>
                                </td>
                            </tr>
                        )
                    }
                    <tr className="border-t border-gold-500">
                        <td className="p-2 font-medium">Total Harga</td>
                        {
                            total_price && (
                                <td className="p-2 text-right">{rupiahFormatter(total_price) || 0}</td>
                            )
                        }
                    </tr>
                    {
                        orderCode && (
                            <tr className="border-t border-gold-500">
                                <td className="p-2 font-medium">Kode Pesanan</td>
                                <td className="p-2 text-right">MK-123</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default PaymentInfo;