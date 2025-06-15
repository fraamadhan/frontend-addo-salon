'use client'

import { getAccessToken } from "@/lib/token";
import { useGetPaymentList } from "@/services/transactionService";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Pagination } from "../../pagination/pagination";
import { PaymentListSkeleton } from "../../skeleton";
import { TransactionListItem } from "@/app/types/transaction-type";
import { rupiahFormatter } from "@/lib/rupiah-formatter";
import { dateFormatter } from "@/lib/date-formatter";
import { ParamsPaymentList } from "@/app/types/query-params";

const PaymentList = (props: ParamsPaymentList) => {

    const { page } = props;
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState<number>(Number(page))
    const [totalPage, setTotalPage] = useState(1);
    const [token, setToken] = useState("");
    const pathname = usePathname();
    const params = useSearchParams();

    const { data, isLoading, isError } = useGetPaymentList(token, props)

    const payments = data?.data?.payments || [];
    const paginator = data?.data?.paginator || null;

    const handlePageChange = (page: number) => {
        const currentParams = new URLSearchParams(params);
        currentParams.set('page', String(page));
        setCurrentPage(page);
        router.push(`${pathname}?${currentParams.toString()}`, { scroll: true })
    }

    useEffect(() => {
        const totalPage = paginator?.pageCount;
        const page = paginator?.page;
        if (totalPage) setTotalPage(totalPage);
        if (page) setCurrentPage(page)
    }, [paginator])

    useEffect(() => {
        const token = getAccessToken();
        if (!token) {
            toast.error("Sesi anda sudah habis. Silakan login kembali");
            return;
        }
        setToken(token)
    }, [])

    return (
        <section className="flex flex-col w-full mt-10">
            <div className="w-full overflow-x-auto">
                {
                    !isError && !isLoading ? (
                        <table className="min-w-[600px] md:min-w-full lg:w-[65rem] table-fixed">
                            <thead>
                                <tr>
                                    <th className="p-2">Layanan</th>
                                    <th className="p-2">Pesanan</th>
                                    <th className="p-2">Total Harga</th>
                                    <th className="p-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    payments.length === 0 && (
                                        <tr>
                                            <td colSpan={4}>
                                                <div className="flex items-center justify-center w-full min-h-[20rem]">
                                                    <p className="text-gray-400 text-center text-lg">Tidak ada data pembayaran</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                                {
                                    payments.map((payment: TransactionListItem, idx: number) => (
                                        <tr className="border" key={`${payment._id}-${idx}`}>
                                            <td className="w-3/8 h-3 overflow-y-auto p-2">
                                                <div className="max-h-32 overflow-y-auto">
                                                    <div className="flex flex-col gap-y-2">
                                                        {payment.items.map((item, i) => (
                                                            <div key={i} className="flex flex-col md:flex-row items-center justify-between">
                                                                <p className="font-medium max-w-[10rem] truncate">{item.product.name}</p>
                                                                <p className="leading-none text-sm text-gray-500">{rupiahFormatter(item.price)}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="w-2/8 text-sm md:text-base p-2">
                                                <div className="flex flex-col gap-y-3 items-center">
                                                    <p className="leading-none">Kode pesanan:</p>
                                                    <p className="leading-none text-sm text-gray-400">{payment.orderCode || ""}</p>
                                                    <p className="leading-none">Tanggal transaksi:</p>
                                                    <p className="leading-none text-sm text-gray-400">{dateFormatter(payment.createdAt)}</p>
                                                </div>
                                            </td>
                                            <td className="w-2/8 text-sm md:text-base">
                                                <div className="flex flex-col md:items-center justify-center p-1">
                                                    <p>{rupiahFormatter(payment.total_price)}</p>
                                                    <p className="truncate w-[7rem] md:w-fit">
                                                        {{
                                                            bank_transfer: `${payment?.bank?.toUpperCase()} Virtual Account`,
                                                            gopay: "Pembayaran GoPay",
                                                            qris: "Pembayaran QRIS",
                                                        }[payment?.payment_type_midtrans as 'bank_transfer' | 'gopay' | 'qris' || payment?.paymentMethod as 'bank_transfer' | 'gopay' | 'qris'] ?? null}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="p-1 text-center text-sm md:text-base w-1/8">
                                                <div className="flex flex-col justify-center items-center gap-y-2">
                                                    <p
                                                        className={`${payment.status === 'PAID' ? 'bg-success-300 text-success-500' : ''} ${payment.status === 'EXPIRED' ? 'bg-error-300 text-error-500' : ''} ${payment.status === 'UNPAID' ? 'bg-gray-300 text-gray-500' : ''} p-1 rounded-md w-[10rem] font-bold`}
                                                    >
                                                        {{
                                                            UNPAID: 'Belum dibayar',
                                                            PAID: 'Sudah dibayar',
                                                            EXPIRED: 'Kedaluwarsa',
                                                            SCHEDULED: 'Terjadwal'
                                                        }[payment.status]}
                                                    </p>
                                                    {
                                                        payment.status === "UNPAID" && (
                                                            <Link href={`/payment/confirm/${payment._id}`} target="_blank" className="bg-blue-500 p-1 rounded-md w-[7rem] text-white">Bayar</Link>
                                                        )
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    ) : (
                        <PaymentListSkeleton />
                    )
                }
            </div>
            <Pagination currentPage={currentPage} totalPage={totalPage} paginator={paginator} handlePageChange={handlePageChange} />
        </section >
    )
}

export default PaymentList;