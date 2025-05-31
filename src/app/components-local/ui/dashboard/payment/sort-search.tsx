'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TransactionStatus } from "@/lib/enum/transaction-status";
import { SearchIcon, X } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../../button/button";

const SortSearch = () => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams()
    const [keyword, setKeyword] = useState(searchParams.get('keyword') || "");
    const [selected, setSelected] = useState("");

    const handleOnSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            updateQueryParams((e.target as HTMLInputElement).value)
        }
    }

    const updateQueryParams = (keyword: string) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set('keyword', keyword);
        currentParams.set('page', '1');
        router.replace(`${pathname}?${currentParams.toString()}`);
    }

    const handleOnSelectSort = (value: string) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set('paymentStatus', value);
        currentParams.set('page', '1')
        router.replace(`${pathname}?${currentParams.toString()}`);
    }

    const handleReset = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        const currentParams = new URLSearchParams(searchParams);
        currentParams.delete('paymentStatus');
        currentParams.set('page', '1');
        setSelected("");
        router.replace(`${pathname}?${currentParams.toString()}`);
    }

    const handleResetAll = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        const currentParams = new URLSearchParams(searchParams);
        currentParams.delete('paymentStatus');
        currentParams.set('page', '1');
        currentParams.delete('keyword')
        setSelected("");
        setKeyword("")
        router.replace(`${pathname}?${currentParams.toString()}`);
    }

    return (
        <div className="w-full flex flex-col md:flex-row items-end justify-center md:justify-start gap-4">
            <div className="w-full md:w-2/5 flex flex-col gap-y-2 min-w-[15em] sm:min-w-[12em]">
                <div className="font-bold leading-none">
                    Kode Pesanan
                </div>
                <div className="w-full flex md:max-w-[25rem] bg-white border-2 items-center rounded-lg shrink-1 ">
                    <input
                        type="text" name="keyword" id="keyword" aria-label="Kolom Pencarian" placeholder="Cari kode pesanan"
                        className="w-full h-full placeholder:text-gray-300 border-0 p-2 focus:outline-none"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={handleOnSearch}
                    />
                    <div className="p-1" onClick={() => updateQueryParams(keyword)}>
                        <SearchIcon className="mr-2" />
                    </div>
                </div>
            </div>
            <div className="w-full md:w-2/5 flex flex-col gap-y-2 min-w-[15em] sm:min-w-[12em]">
                <div className="font-bold leading-none">
                    Status Pembayaran
                </div>
                <div className="flex w-full md:w-[16rem] lg:w-[18rem] rounded-xl">
                    <Select value={selected} onValueChange={(value) => {
                        setSelected(value);
                        handleOnSelectSort(value);
                    }}>
                        <SelectTrigger className="w-full focus:outline-none">
                            <SelectValue placeholder="Pilih" />
                        </SelectTrigger>
                        <SelectContent className="w-[11em] flex flex-col space-y-3 text-gray-400 border rounded-xl p-2 ">
                            <SelectItem className="p-1" value={TransactionStatus.SCHEDULED}>Sudah Bayar</SelectItem>
                            <SelectItem className="p-1" value={TransactionStatus.UNPAID}>Belum Bayar</SelectItem>
                            <SelectItem className="p-1" value={TransactionStatus.EXPIRED}>Kedaluwarsa</SelectItem>
                        </SelectContent>
                    </Select>
                    {selected && (
                        <div className="flex flex-row items-center">
                            <X
                                className="text-gray-400 hover:text-red-500 cursor-pointer w-5 h-5"
                                onClick={handleReset}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full md:w-1/5 flex flex-col items-center mb-1 gap-y-2 min-w-[10em] sm:min-w-[12em]">
                <Button className="p2 bg-gold-500 w-[10rem] h-[2rem] rounded-md text-white" onClick={handleResetAll}>
                    Hapus Filter
                </Button>
            </div>
        </div>
    )
}

export default SortSearch;