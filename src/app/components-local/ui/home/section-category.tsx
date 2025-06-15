'use client'

import Button from "@/app/components-local/ui/button/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SectionCategory = ({ categories }: { categories: { src: string; href: string; alt: string }[] }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)

    const updateScrollButtons = () => {
        const temp = scrollRef.current;
        if (!temp) return;

        setCanScrollLeft(temp.scrollLeft > 0);
        setCanScrollRight(temp.scrollLeft + temp.clientWidth < temp.scrollWidth)
    }

    useEffect(() => {
        updateScrollButtons();
        const handleResize = () => updateScrollButtons();

        window.addEventListener('resize', handleResize);
        const currentScrollRef = scrollRef.current;
        currentScrollRef?.addEventListener("scroll", updateScrollButtons);

        return () => {
            window.removeEventListener('resize', handleResize);
            currentScrollRef?.removeEventListener("scroll", updateScrollButtons);
        }
    }, [])

    const scroll = (direction: "left" | "right") => {
        const temp = scrollRef.current;
        if (!temp) return;

        const scrollAmount = 300;
        if (direction === "left") {
            temp.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        } else {
            temp.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };
    return (
        <section className="w-full flex flex-col justify-center items-center lg:px-8">
            <div className="w-full flex justify-between items-center">
                <h2 className="font-lora text-lg md:text-2xl font-semibold text-black">Kategori Layanan</h2>
                <Link href='/service?page=1&limit=10' className="flex items-center lg:space-x-1 cursor-pointer">
                    <p className="font-medium text-sm md:text-base">Lihat semua layanan</p>
                    <ChevronRight />
                </Link>
            </div>
            <div className="relative w-full mt-4">
                <div className="absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                {canScrollLeft && (
                    <Button
                        onClick={() => scroll("left")}
                        className="absolute left-2 top-1/2 z-20 translate-y-1/2 bg-white shadow-md rounded-full p-2"
                    >
                        <ChevronLeft />
                    </Button>
                )}
                <div
                    ref={scrollRef}
                    className="flex flex-row space-x-4 overflow-x-auto px-2 no-scrollbar"
                >
                    {categories.map((category, index) => (
                        <Link key={index} href={category.href} className="flex items-stretch flex-shrink-0 px-3 w-[13em] sm:w-[16em] md:w-[18em] lg:w-[25em]">
                            <Image
                                src={category.src}
                                width={400}
                                height={350}
                                alt={category.alt} className="rounded-lg object-cover"
                            />
                        </Link>
                    ))}
                </div>
                <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
                {canScrollRight && (
                    <Button
                        onClick={() => scroll("right")}
                        className="absolute right-2 top-1/2 z-20 translate-y-1/2 bg-white shadow-md rounded-full p-2"
                    >
                        <ChevronRight />
                    </Button>
                )}
            </div>

        </section>
    )
}


export default SectionCategory;