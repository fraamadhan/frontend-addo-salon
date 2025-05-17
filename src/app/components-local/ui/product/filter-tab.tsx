'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';
import Button from "../button/button";
import { useGetCategories } from "@/services/productService";
import { CategoryGroup } from "@/app/types/general";
import { Suspense, useState } from "react";
import CategoryLink from "./category-link";

const FilterTab = () => {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams()
    const [lowestPrice, setLowestPrice] = useState(searchParams.get('lowestPrice') || '');
    const [highestPrice, setHighestPrice] = useState(searchParams.get('highestPrice') || '');
    const [type, setType] = useState(searchParams.get('type') || undefined)

    // response
    const { data, isLoading, isError } = useGetCategories();
    const categories = data?.data || [];

    const handleOnCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentParams = new URLSearchParams(searchParams);
        const isChecked = e.target.checked;
        if (isChecked) {
            currentParams.set('rating', '4');
            router.replace(`${pathname}?${currentParams.toString()}`);
        }
        else {
            currentParams.delete('rating');
            router.replace(`${pathname}?${currentParams.toString()}`);
        }
    }

    const handleOnHighestPriceChange = useDebouncedCallback((value: string) => {
        const currentParams = new URLSearchParams(searchParams);
        const price = value
        currentParams.set('highestPrice', price);
        router.replace(`${pathname}?${currentParams.toString()}`);
    }, 500)

    const handleOnLowestPriceChange = useDebouncedCallback((value: string) => {
        const currentParams = new URLSearchParams(searchParams);
        const price = value
        currentParams.set('lowestPrice', price);
        router.replace(`${pathname}?${currentParams.toString()}`);
    }, 500)

    const onTypeProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setType(e.target.value)
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set('type', e.target.value);
        router.replace(`${pathname}?${currentParams.toString()}`);
    }

    const handleOnResetFilter = () => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.delete('category');
        currentParams.delete('highestPrice');
        currentParams.delete('lowestPrice');
        setLowestPrice('');
        setHighestPrice('');
        currentParams.delete('rating');
        currentParams.set('page', '1')
        currentParams.set('limit', '10')
        currentParams.delete('type')
        setType(undefined)
        router.replace(`${pathname}?${currentParams.toString()}`);
    }

    return (
        <aside className="hidden lg:block flex-none md:w-[15em] px-2 pt-7">
            {/* Title tab */}
            <div className="font-lora font-bold text-lg text-gray-900 bg-gray-100 shadow-lg rounded-tl-lg rounded-tr-lg p-2 border-l-1 border-r-1 border-t-1">
                <h3>Filter</h3>
            </div>
            {/* Body filter by category */}
            <div className="flex flex-col bg-white-50 border-2 border-gray-100 p-2 space-y-3">
                <div className="flex items-center py-3">
                    <h4 className="font-lora leading-2 font-semibold">Kategori</h4>
                </div>
                <Suspense fallback={<p className="text-gray-400">Loading...</p>}>
                    <div className="flex flex-col items-center space-y-3">
                        {isLoading && <p className="text-gray-400">Loading...</p>}

                        {isError && <p className="text-gray-400">Gagal memuat kategori</p>}

                        {!isLoading && !isError && categories.length === 0 && (
                            <p className="text-gray-400">Tidak ada kategori</p>
                        )}

                        {!isLoading && categories.map((category: CategoryGroup) => (
                            <CategoryLink
                                key={category.parent._id}
                                category={category}
                            />

                        ))}
                    </div>
                </Suspense>
            </div >
            <div className="flex flex-col bg-white-50 border-2 border-gray-100 p-2 space-y-3 rounded-md">
                <div className="flex items-center py-3">
                    <h4 className="font-lora leading-2 font-semibold">Tipe</h4>
                </div>
                <div className="flex flex-col items-center space-y-3">
                    <div className="flex items-center w-full space-x-3">
                        <input type="radio" name="gender-desk" id="female" className="w-5 h-5 accent-gold-500" onChange={onTypeProductChange} value='female'
                            checked={type === 'female'} />
                        <label htmlFor="female">
                            Perempuan
                        </label>
                    </div>
                    <div className="flex items-center w-full space-x-3">
                        <input type="radio" name="gender-desk" id="male" className="w-5 h-5 accent-gold-500" onChange={onTypeProductChange} value='male'
                            checked={type === 'male'} />
                        <label htmlFor="male">
                            Laki-laki
                        </label>
                    </div>
                    <div className="flex items-center w-full space-x-3">
                        <input type="radio" name="gender-desk" id="unisex" className="w-5 h-5 accent-gold-500" onChange={onTypeProductChange} value='unisex'
                            checked={type === 'unisex'} />
                        <label htmlFor="unisex">
                            Unisex
                        </label>
                    </div>
                </div>
            </div>
            {/* Body filter by price range*/}
            <div className="flex flex-col bg-white-50 border-r-2 border-l-2 border-b-2 border-gray-100 p-2 space-y-3" >
                <div className="flex items-center py-3">
                    <h4 className="font-lora leading-2 font-semibold">Rentang Harga</h4>
                </div>
                <div className="flex flex-col items-center space-y-3">
                    <div className="w-full">
                        <label htmlFor="lowestPrice">Harga Terendah</label>
                        <div className="flex">
                            <span className="p-2 inline-flex items-center text-sm bg-gray-100 border rounded-l-lg border-r-0 text-gray-300">Rp</span>
                            <input type="text" id="lowestPrice" name="lowestPrice" placeholder="Contoh: 20000" className="focus:outline-none bg-transparent placeholder:text-gray-200 overflow-hidden px-2 border rounded-r-lg" pattern="^[0-9]*$"
                                onInput={(e) => {
                                    const price = (e.target as HTMLInputElement).value.replace(/\D/g, '');
                                    setLowestPrice(price);
                                }}
                                onChange={(e) => handleOnLowestPriceChange(e.target.value)}
                                value={lowestPrice} />
                        </div>
                    </div>
                    <div className="w-full">
                        <label htmlFor="highestPrice">Harga Tertinggi</label>
                        <div className="flex">
                            <span className="p-2 inline-flex items-center text-sm bg-gray-100 border rounded-l-lg border-r-0 text-gray-300">Rp</span>
                            <input type="text" id="highestPrice" name="highestPrice" placeholder="Contoh: 20000" className="focus:outline-none bg-transparent placeholder:text-gray-200 overflow-hidden px-2 border rounded-r-lg" pattern="^[0-9]*$"
                                onInput={(e) => {
                                    const price = (e.target as HTMLInputElement).value.replace(/\D/g, '');
                                    setHighestPrice(price);
                                }}
                                onChange={(e) => handleOnHighestPriceChange(e.target.value)}
                                value={highestPrice} />
                        </div>
                    </div>
                </div>
            </div >
            {/* Body filter by rating */}
            <div className="flex flex-col bg-white-50 border-r-2 border-l-2 border-b-2 border-gray-100 p-2 space-y-3 w-full rounded-b-lg pb-7" >
                <div className="flex items-center py-3">
                    <h4 className="font-lora leading-2 font-semibold">Rating</h4>
                </div>
                <div className="flex items-center space-x-3">
                    <input type="checkbox" name="rating_filter" id="rating_filter" className="w-5 h-5" onChange={handleOnCheckboxChange} checked={searchParams.get('rating') === '4'} />
                    <label htmlFor="rating_filter">
                        <span>4 ke atas</span>
                    </label>
                </div>
            </div >
            <div className="flex items-center justify-center bg-white py-1">
                <Button className="w-full bg-gold-500 text-white rounded-lg p-2 font-semibold border-gold-500 border-1 sm:w-[8em]" onClick={handleOnResetFilter}>
                    Reset Filter
                </Button>
            </div>
        </aside >
    )
}

export default FilterTab;