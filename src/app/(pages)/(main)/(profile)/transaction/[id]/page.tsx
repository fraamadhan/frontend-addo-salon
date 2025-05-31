'use client'

import OverviewItem from "@/app/components-local/ui/dashboard/transaction/overview-items";
import OverviewTransaction from "@/app/components-local/ui/dashboard/transaction/overview-transaction";
import { SkeletonTransactionDetail } from "@/app/components-local/ui/skeleton";
import { getAccessToken } from "@/lib/token";
import { useGetTransactionDetail } from "@/services/transactionService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const TransactionDetailPage = () => {
    const params = useParams<{ id: string }>();
    const [token, setToken] = useState('');

    const { data: transaction, isLoading, isError } = useGetTransactionDetail(token, params.id);

    useEffect(() => {
        const token = getAccessToken();
        if (!token) {
            toast.error('Sesi anda sudah habis. Silakan login kembali')
            return;
        }
        setToken(token)
    }, [])

    return (
        <main className="w-full p-1">
            <div className="w-full md:p-7 flex flex-col gap-y-5">
                <h1 className="text-2xl font-bold">Rincian Transaksi</h1>
                {
                    !isLoading && !isError ? (
                        <>
                            <div className="w-full p-7 font-semibold text-lg text-gray-500 bg-gold-50 rounded-lg shadow shadow-gold-500">
                                <p className="leading-none">
                                    {{
                                        CANCELED: "Dibatalkan",
                                        COMPLETED: "Selesai",
                                        EXPIRED: "Kedaluwarsa",
                                        IN_PROGRESS: "Sedang Berlangsung",
                                        PENDING: "Ditunda",
                                        SCHEDULED: "Terjadwal"
                                    }[transaction?.data?.status as string]}
                                </p>
                            </div>
                            {/* overview transaction*/}
                            <OverviewTransaction transaction={transaction?.data} />
                            {/*  overview items */}
                            <OverviewItem transaction={transaction?.data} />
                        </>
                    ) : (
                        <SkeletonTransactionDetail />
                    )
                }
            </div>
        </main>
    )
}

export default TransactionDetailPage;