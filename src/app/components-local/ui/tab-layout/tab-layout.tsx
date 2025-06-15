'use client'

import { useState } from "react";
import Button from "../button/button";
import ReviewSection from "../review/review-section";
import { ServiceDetailProps } from "@/app/types/general";
import SectionServiceSchedule from "../product/section-service-schedule";

export const TabLayout = ({ product }: { product: ServiceDetailProps }) => {
    const [activeTab, setActiveTab] = useState("description");
    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    }
    return (
        <div className="w-full flex flex-col">
            <div className="flex items-center justify-start gap-x-3">
                <Button role="tab" className={`${activeTab === "description" ? "bg-gold-500" : "bg-white"} text-gray-70 cursor-pointer rounded-md p-2 hover:bg-gold-100`} onClick={() => handleTabClick("description")}>
                    Deskripsi
                </Button>
                <Button role="tab" className={`${activeTab === "review" ? "bg-gold-500" : "bg-white"} text-gray-70 cursor-pointer rounded-md p-2 hover:bg-gold-100`} onClick={() => handleTabClick("review")}>
                    Ulasan
                </Button>
                <Button role="tab" className={`${activeTab === "schedule" ? "bg-gold-500" : "bg-white"} text-gray-70 cursor-pointer rounded-md p-2 hover:bg-gold-100`} onClick={() => handleTabClick("schedule")}>
                    Jadwal Pesanan
                </Button>
            </div>
            <hr className="w-full border-2 mt-1" />
            {
                activeTab === "description" && (
                    <div className="mt-3">
                        <p className="text-base">{product?.description}</p>
                    </div>
                )
            }
            {
                activeTab === "review" && (
                    <ReviewSection />
                )
            }
            {
                activeTab === 'schedule' && (
                    <SectionServiceSchedule />
                )
            }
        </div>
    )
}

export default TabLayout;
