'use client'

import { createContext, useContext, useState } from "react";

type FilterUIContextType = {
    showFilterTab: boolean;
    setShowFilterTab: (state: boolean) => void;
}

const FilterUIContext = createContext<FilterUIContextType | undefined>(undefined);

export const FilterUIProvider = ({ children }: { children: React.ReactNode }) => {
    const [showFilterTab, setShowFilterTab] = useState(false);

    return (
        <FilterUIContext.Provider value={{ showFilterTab, setShowFilterTab }}>
            {children}
        </FilterUIContext.Provider>
    )
}

export const useFilterUI = () => {
    const context = useContext(FilterUIContext);

    if (!context) throw new Error("useFilterUI must be used within FilterUIProvider")

    return context;
}