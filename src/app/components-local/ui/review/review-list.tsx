import { Paginator, ReviewItemProps } from "@/app/types/general";
import ReviewItemSection from "./review-item";
import { Pagination } from "../pagination/pagination";


const ReviewList = ({ reviews, isLoading, isError, paginator, handlePageChange }: { reviews: ReviewItemProps[], isLoading: boolean, isError: boolean, paginator: Paginator, handlePageChange: (value: number) => void }) => {

    return (
        <div className="max-w-[52rem] flex flex-col">
            {
                !isError && !isLoading && reviews.map((review) => (
                    <div key={review._id} >
                        <ReviewItemSection review={review} />
                    </div>
                ))
            }
            {
                !isLoading && !isError && (
                    <Pagination
                        totalPage={reviews.length === 0 ? 0 : paginator?.pageCount}
                        currentPage={paginator?.page}
                        handlePageChange={handlePageChange}
                        paginator={paginator}
                    />
                )
            }
            {
                isError && (
                    <div className="flex items-center mt-7">
                        <p className="bg-red-200 text-red-500 p-2">Gagal memuat data ulasan</p>
                    </div>
                )
            }
            {
                !isError && !isLoading && reviews.length === 0 && (
                    <div className="flex items-center mt-7">
                        <p className="text-black font-medium">Belum ada ulasan untuk produk ini</p>
                    </div>
                )
            }
        </div>
    )
}

export default ReviewList;
