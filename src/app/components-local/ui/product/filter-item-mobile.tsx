'use client'

import { CategoryGroup } from "@/app/types/general";
import { useGetCategories } from "@/services/productService";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Button from "../button/button";

const FilterItemMobile = ({ handleResetFilter }: { handleResetFilter: (state: boolean) => void }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()
  const [lowestPrice, setLowestPrice] = useState(searchParams.get('lowestPrice') || '');
  const [highestPrice, setHighestPrice] = useState(searchParams.get('highestPrice') || '');
  const [categoryOpt, setCategoryOpt] = useState(searchParams.get('category') || '');
  const [rating, setRating] = useState(searchParams.get('rating') || undefined);

  // response
  const { data, isLoading, isError } = useGetCategories();
  const categories = data?.data || [];

  const handleApplyFilter = () => {
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set('highestPrice', highestPrice);
    currentParams.set('lowestPrice', lowestPrice);
    currentParams.set('category', categoryOpt);
    currentParams.set('rating', rating || '');
    currentParams.set('page', '1');
    handleResetFilter(false);
    router.replace(`${pathname}?${currentParams.toString()}`);
  }
  const handleReset = () => {
    const currentParams = new URLSearchParams(searchParams);
    currentParams.delete('category');
    currentParams.delete('highestPrice');
    currentParams.delete('lowestPrice');
    setLowestPrice('');
    setHighestPrice('');
    currentParams.delete('rating');
    currentParams.set('page', '1');
    currentParams.set('limit', '10');
    handleResetFilter(false);
    setCategoryOpt('');
    setRating(undefined);
    router.replace(`${pathname}?${currentParams.toString()}`);
  }

  const onCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryOpt(e.target.value);
  }

  const onRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(e.target.checked ? '4' : undefined);
  }

  return (
    <div className="lg:hidden flex flex-col w-full grow space-y-4 p-4">
      {/* Body filter by category */}
      <div className="flex flex-col bg-white-50 border-2 border-gray-100 p-2 space-y-3 rounded-md">
        <div className="flex items-center py-3">
          <h4 className="font-lora leading-2 font-semibold">Kategori</h4>
        </div>
        <div className="flex flex-col items-center space-y-3">
          {isLoading && <p className="text-gray-400">Loading...</p>}

          {isError && <p className="text-gray-400">Gagal memuat kategori</p>}

          {!isLoading && !isError && categories.length === 0 && (
            <p className="text-gray-400">Tidak ada kategori</p>
          )}
          {
            !isLoading && categories.map((category: CategoryGroup) => (
              <div key={category.parent._id} className="flex items-center w-full space-x-3">
                <input type="radio" name="category" id={category.parent.name} className="w-5 h-5 accent-gold-500" onChange={onCategoryChange} value={category.parent.slug}
                  checked={categoryOpt === category.parent.slug} />
                <label htmlFor={category.parent.name}>
                  {category.parent.name}
                </label>
              </div>
            ))
          }
        </div>
      </div>
      {/* Body filter by price range*/}
      <div className="flex flex-col bg-white-50 border-2 border-gray-100 p-2 space-y-3 rounded-md">
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
                  (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.replace(/\D/g, '');
                }}
                onChange={(e) => {
                  setLowestPrice(e.target.value);
                }}
                value={lowestPrice} />
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="highestPrice">Harga Tertinggi</label>
            <div className="flex">
              <span className="p-2 inline-flex items-center text-sm bg-gray-100 border rounded-l-lg border-r-0 text-gray-300">Rp</span>
              <input type="text" id="highestPrice" name="highestPrice" placeholder="Contoh: 20000" className="focus:outline-none bg-transparent placeholder:text-gray-200 overflow-hidden px-2 border rounded-r-lg" pattern="^[0-9]*$"
                onInput={(e) => {
                  (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.replace(/\D/g, '');
                }}
                onChange={(e) => {
                  setHighestPrice(e.target.value);
                }}
                value={highestPrice} />
            </div>
          </div>
        </div>
      </div>
      {/* Body filter by rating */}
      <div className="flex flex-col bg-white-50 border-2 border-gray-100 p-2 space-y-3 w-full rounded-md pb-7">
        <div className="flex items-center py-3">
          <h4 className="font-lora leading-2 font-semibold">Rating</h4>
        </div>
        <div className="flex items-center space-x-3">
          <input type="checkbox" name="rating_filter" id="rating_filter" className="w-5 h-5 accent-gold-500"
            checked={rating === '4'}
            onChange={onRatingChange} />
          <label htmlFor="rating_filter">
            4 ke atas
          </label>
        </div>
      </div>
      {/* Button */}
      <div className="flex items-center sm:justify-end bg-white p-4 border-t space-x-2">
        <Button className="w-full bg-gold-500 text-white rounded-lg p-3 font-semibold border-gold-500 border-1 sm:w-[8em]"
          onClick={handleApplyFilter}>
          Terapkan
        </Button>
        <Button className="w-full bg-white-500 text-gold-500 rounded-lg p-3 font-semibold border-gold-500 border-1 sm:w-[8em]" onClick={() => handleReset()}>
          Reset
        </Button>
      </div>
    </div>
  )
}

export default FilterItemMobile;
