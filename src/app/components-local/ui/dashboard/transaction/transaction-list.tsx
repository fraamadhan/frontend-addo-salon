'use client'

import { ParamsPaymentList } from "@/app/types/query-params";
import TransactionItem from "./transaction-item";
import { useGetTransactionList } from "@/services/transactionService";
import { getAccessToken } from "@/lib/token";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Pagination } from "../../pagination/pagination";
import { TransactionItemSkeleton } from "../../skeleton";
import { TransactionListItem } from "@/app/types/transaction-type";

const TransactionList = (props: ParamsPaymentList) => {

    const { page } = props;
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState<number>(Number(page))
    const [totalPage, setTotalPage] = useState(1);
    const [token, setToken] = useState("");
    const pathname = usePathname();
    const params = useSearchParams();

    const { data, isLoading, isError } = useGetTransactionList(token, props)
    const transactions = data?.data?.orders || [];
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
        <section className="space-y-5 mt-10 md:p-3 w-full">
            {

                !isLoading && transactions.length === 0 && (
                    <div className="flex items-center justify-center w-full min-h-[20rem]">
                        <p className="text-gray-400 text-center text-lg">Tidak ada data transaksi</p>
                    </div>
                )

            }
            {
                !isError && !isLoading ? (
                    transactions.map((transaction: TransactionListItem, idx: number) => (
                        <div key={`${transaction._id}-${idx}`} className="w-full">
                            <TransactionItem transaction={transaction} />
                        </div>
                    ))
                ) :
                    (
                        <TransactionItemSkeleton />
                    )
            }
            <Pagination currentPage={currentPage} totalPage={totalPage} paginator={paginator} handlePageChange={handlePageChange} />
        </section>
    )
}

export default TransactionList;