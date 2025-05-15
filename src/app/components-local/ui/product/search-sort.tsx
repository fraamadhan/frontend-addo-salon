'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, SearchIcon, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useFilterUI } from "./filter-ui-context";

const SearchSort = () => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams()
    const [selected, setSelected] = useState("");
    const { setShowFilterTab } = useFilterUI();
    const [keyword, setKeyword] = useState(searchParams.get('keyword') || "");

    const handleReset = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        const currentParams = new URLSearchParams(searchParams);
        currentParams.delete('sortby');
        currentParams.delete('sorttype');
        currentParams.set('page', '1');
        setSelected("");
        router.replace(`${pathname}?${currentParams.toString()}`);
    }

    const handleOnSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            updateQueryParams((e.target as HTMLInputElement).value)
        }
    }

    const handleOnSelectSort = (value: string) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set('sortby', "price");
        if (value === 'lowestPrice') {
            currentParams.set('sorttype', 'asc');
        }
        else if (value === 'highestPrice') {
            currentParams.set('sorttype', 'desc');
        }
        router.replace(`${pathname}?${currentParams.toString()}`);
    }

    const updateQueryParams = (keyword: string) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set('keyword', keyword);
        currentParams.set('page', '1');
        router.replace(`${pathname}?${currentParams.toString()}`);
    }

    return (
        <section className="flex flex-col w-full lg:flex-row lg:justify-between pt-7 justify-center items-center mr-7">
            <div className="w-full flex max-w-[40em] bg-white border-2 p-1 items-center space-x-2 rounded-lg mx-2 shrink-1 ">
                <input
                    type="text" name="keyword" id="keyword" aria-label="Kolom Pencarian" placeholder="Cari layanan"
                    className="w-full h-full placeholder:text-gray-300 border-0 p-2 focus:outline-none"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={handleOnSearch}
                />
                <div className="p-1" onClick={() => updateQueryParams(keyword)}>
                    <SearchIcon className="mr-2" />
                </div>
            </div>
            {/* filter and sort chip */}
            <div className="flex items-center justify-center lg:justify-end min-w-[10em] sm:min-w-[12em]">
                <div className="flex w-[12em] p-2 rounded-xl space-x-1 md:mx-7">
                    <Select value={selected} onValueChange={(value) => {
                        setSelected(value);
                        handleOnSelectSort(value);
                    }}>
                        <SelectTrigger className="w-full focus:outline-none">
                            <SelectValue placeholder="Urutkan" />
                        </SelectTrigger>
                        <SelectContent className="w-[11em] flex flex-col space-y-3 text-gray-400 border rounded-xl p-2 ">
                            <SelectItem className="p-1" value="lowestPrice" >Harga Terendah</SelectItem>
                            <SelectItem className="p-1" value="highestPrice" >Harga Tertinggi</SelectItem>
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
                <div className="flex w-[7em] p-1.5 rounded-lg space-x-1 border justify-between items-center lg:hidden"
                    onClick={() => setShowFilterTab(true)}>
                    <p className="text-gray-400 opacity-65">Filter</p>
                    <ChevronDown className="w-4 h-4 opacity-60" />
                </div>
            </div>
        </section>
    )
}

export default SearchSort;
