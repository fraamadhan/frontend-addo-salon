'use client';

import RatingOverview from "../product/rating-overview";
import ReviewList from "./review-list";
import { useEffect, useRef, useState } from "react";
import { useGetReviews } from "@/services/reviewService";
import { useParams } from "next/navigation";
import { ReviewSectionSkeleton } from "../skeleton";

const ReviewSection = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const reviewListRef = useRef<HTMLDivElement>(null);


    const params = useParams<{ name: string; id: string }>();

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    const { data, isLoading, isError } = useGetReviews(params.id, currentPage); //params.id here is productId

    const reviews = data?.data?.reviews || [];
    const paginator = data?.data?.paginator || null;
    const totalReviews = data?.data?.totalReviews || 0;
    const arrayStarCount = data?.data?.arrayStarCount || [];
    const ratingAverage = data?.data?.ratingAverage || 0;

    useEffect(() => {
        if (!paginator) return;

        const backendPage = paginator.page ?? 1;
        const backendPageCount = paginator.pageCount ?? 1;

        if (totalPage !== backendPageCount) {
            setTotalPage(backendPageCount);
        }

        if (currentPage !== backendPage) {
            setCurrentPage(backendPage);
        }
    }, [paginator, currentPage, totalPage]);

    useEffect(() => {
        if (reviewListRef.current) {
            reviewListRef.current?.scrollIntoView({ behavior: "auto" })
        }
    }, [paginator?.page])

    return (
        <div ref={reviewListRef} className="w-full flex flex-col gap-y-3 scroll-mt-50">
            {
                !isError && isLoading ? (<ReviewSectionSkeleton />) :
                    <>
                        <RatingOverview totalReviews={totalReviews} arrayStarCount={arrayStarCount} ratingAverage={ratingAverage} />
                        {paginator && (
                            <ReviewList reviews={reviews} paginator={paginator} handlePageChange={handlePageChange} isLoading={isLoading} isError={isError} />)
                        }
                    </>
            }
        </div>
    )
}

export default ReviewSection;
