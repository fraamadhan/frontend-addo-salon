'use client'

import { useGetProducts } from "@/services/productService";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useLayoutEffect, useMemo } from "react";
import Button from "../button/button";
import ProductItem from "./product-item";
import { ProductItemSkeleton } from "../skeleton";
import { ProductItemProps } from "@/app/types/general";

const SectionSimilarProducts = ({ slug }: { slug: string }) => {

    const scrollRef = useRef<HTMLDivElement>(null);
    const itemRef = useRef<HTMLAnchorElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)

    const { data, isLoading, isError } = useGetProducts({ category: slug, page: "1" })

    const products = useMemo(() => data?.data?.products || [], [data]);

    const updateScrollButtons = () => {
        const temp = scrollRef.current;
        if (!temp) return;

        const scrollLeft = temp.scrollLeft;
        const clientWidth = temp.clientWidth;
        const scrollWidth = temp.scrollWidth;

        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }

    useLayoutEffect(() => {
        updateScrollButtons();
        const handleResize = () => updateScrollButtons();

        window.addEventListener('resize', handleResize);
        const currentScrollRef = scrollRef.current;
        currentScrollRef?.addEventListener("scroll", updateScrollButtons);

        return () => {
            window.removeEventListener('resize', handleResize);
            currentScrollRef?.removeEventListener("scroll", updateScrollButtons);
        }
    }, [products])

    const scroll = (direction: "left" | "right") => {
        const scrollContainer = scrollRef.current;
        const itemElement = itemRef.current;

        if (!scrollContainer || !itemElement) return;

        const scrollAmount = itemElement.clientWidth + 16;
        if (direction === "left") {
            scrollContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        } else {
            scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    const isSingleReview = Array.isArray(products) && products.length === 1
    const isLessThanFour = Array.isArray(products) && products.length < 4;

    return (
        <section className="w-full flex flex-col justify-center items-center">
            <div className="w-full flex justify-between items-center">
                <h2 className="font-lora text-lg md:text-2xl font-semibold text-black">Layanan dengan kategori serupa</h2>
                <Link href={`/service?page=1&limit=10&category=${slug}`} className="flex items-center lg:space-x-1 cursor-pointer">
                    <p className="font-medium text-sm md:text-base">Lihat semua</p>
                    <ChevronRight />
                </Link>
            </div>
            <div className="relative w-full mt-4 overflow-hidden">
                {!isSingleReview &&
                    (<div className="absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />)
                }

                {!isSingleReview && canScrollLeft && products && products.length !== 0 && (
                    <Button
                        onClick={() => scroll("left")}
                        className="absolute left-2 top-1/4 sm:top-1/2 z-20 translate-y-1/2 bg-white shadow-md rounded-full p-2 cursor-pointer"
                    >
                        <ChevronLeft />
                    </Button>
                )}
                <div
                    ref={scrollRef}
                    className="flex flex-row space-x-3 overflow-x-auto w-full no-scrollbar snap-x snap-mandatory min-w-0"
                >
                    {!isError && !isLoading && products && products.length !== 0 && (

                        products.map((product: ProductItemProps, index: number) => (
                            product ? (
                                <Link href={`/service/${product.name.split(' ').join('-')}/${product._id}`} ref={index === 0 ? itemRef : null} key={product._id} className="flex items-stretch w-[8rem] sm:w-[8rem] md:w-[8rem] lg:w-[15rem] shrink-0 snap-start">
                                    <ProductItem product={product} />
                                </Link>
                            ) : <ProductItemSkeleton key={index} />
                        )))
                    }
                </div>
                {!isLoading && !isError && products.length === 0 && (
                    <p className="text-center w-full py-6 text-gray-500">
                        Tidak ada data produk serupa
                    </p>
                )}
                <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
                {!isSingleReview && canScrollRight && products && products.length !== 0 && !isLessThanFour && (
                    <Button
                        onClick={() => scroll("right")}
                        className="absolute right-2 top-1/4 sm:top-1/2 z-20 translate-y-1/2 bg-white shadow-md rounded-full p-2 cursor-pointer"
                    >
                        <ChevronRight />
                    </Button>
                )}
            </div>

        </section >
    )
}

export default SectionSimilarProducts;
