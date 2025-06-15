'use client'

import Button from "@/app/components-local/ui/button/button";
import { ReviewItemProps } from "@/app/types/general";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import ReviewItem from "./review-item";
import { ReviewItemSkeleton } from "../skeleton";

const SectionReview = ({ reviews }: { reviews: ReviewItemProps[] }) => {

    const scrollRef = useRef<HTMLDivElement>(null);
    const itemRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)

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
    }, [])

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

    const isSingleReview = Array.isArray(reviews) && reviews.length === 1
    const isLessThanFour = Array.isArray(reviews) && reviews.length < 4;


    return (
        <section className="w-full flex flex-col justify-center items-center lg:px-8">
            <div className="w-full flex justify-between items-center">
                <h2 className="font-lora text-lg md:text-2xl font-semibold text-black">Ulasan Pengguna</h2>
            </div>
            <div className="relative w-full mt-4 ">
                {!isSingleReview &&
                    (<div className="absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />)
                }

                {!isSingleReview && canScrollLeft && reviews && reviews.length !== 0 && (
                    <Button
                        onClick={() => scroll("left")}
                        className="absolute left-2 top-1/2 z-20 translate-y-1/2 bg-white shadow-md rounded-full p-2 cursor-pointer"
                    >
                        <ChevronLeft />
                    </Button>
                )}
                <div
                    ref={scrollRef}
                    className="flex flex-row space-x-4 overflow-x-auto w-full px-2 no-scrollbar snap-x snap-mandatory"
                >
                    {reviews && reviews.length !== 0 ? (

                        reviews.map((review, index) => (
                            review ? (
                                <div ref={index === 0 ? itemRef : null} key={review._id} className="flex items-stretch flex-shrink-0 px-3 w-[13em] sm:w-[16em] md:w-[18em] lg:w-[25em] ">
                                    <ReviewItem review={review} />
                                </div>
                            ) : <ReviewItemSkeleton key={index} />
                        ))
                    ) : (
                        <p className="text-lg">Belum ada ulasan</p>
                    )
                    }
                </div>
                <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
                {!isSingleReview && canScrollRight && reviews && reviews.length !== 0 && !isLessThanFour && (
                    <Button
                        onClick={() => scroll("right")}
                        className="absolute right-2 top-1/2 z-20 translate-y-1/2 bg-white shadow-md rounded-full p-2 cursor-pointer"
                    >
                        <ChevronRight />
                    </Button>
                )}
            </div>
        </section>
    )
}


export default SectionReview;