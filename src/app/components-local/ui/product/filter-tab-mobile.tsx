'use client'

import { ArrowLeft } from "lucide-react";
import FilterItemMobile from "./filter-item-mobile";
import { useFilterUI } from "./filter-ui-context";

const FilterTabMobile = () => {
    const { showFilterTab, setShowFilterTab } = useFilterUI()

    const handleResetFilter = () => {
        setShowFilterTab(false);
    }

    return (
        <div className={`
        flex flex-col w-full lg:hidden fixed bottom-0 left-0 h-[85%] bg-white z-50 
        transform transition-all duration-300 ease-in-out
        ${showFilterTab ? 'translate-x-0' : '-translate-x-full'}
      `}>
            {/* Header */}
            <div className="font-lora font-bold text-lg text-gray-900 bg-gray-100 shadow-lg rounded-tl-lg rounded-tr-lg p-2 border-l-1 border-r-1 border-t-1">
                <div className="flex items-center space-x-3">
                    <ArrowLeft onClick={() => setShowFilterTab(false)} className="cursor-pointer" />
                    <h3>Filter</h3>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto h-full">
                <FilterItemMobile handleResetFilter={handleResetFilter} />
            </div>
        </div>
    )
}

export default FilterTabMobile;
