import { ReviewItemProps } from "@/app/types/general";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export const ReviewItem = ({ review }: { review: ReviewItemProps }) => {
    const roundedRating = Math.round(review.rating * 2) / 2;
    const fullStars = Math.floor(roundedRating);
    const hasHalfStar = roundedRating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    return (
        <article className="flex flex-col w-[13em] sm:w-[16em] md:w-[18em] lg:w-[25em] items-center p-4 justify-between space-y-2 bg-gray-100 rounded-3xl">
            <p className="text-center text-sm md:text-base">{review.review}</p>
            <div className="flex flex-col w-full items-center space-y-4">
                <div className="border-t-2 border-black w-[75%]"></div>
                <div className="flex justify-start items-center w-full space-x-2">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                            src={review.user?.assetRef || '/si.jpeg'}
                            width={48}
                            height={48}
                            alt={`Foto profil pengguna ${review.user?.name}`}
                            className="object-cover"
                            quality={100}
                        />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm md:text-base">{review.user.name}</p>
                        <div className="flex w-[5em] sm:w-[9em] md:w-[12em]">
                            {[...Array(fullStars)].map((_, i) => (
                                <Star key={`full-${i}`} fill="#d4af37" stroke="#d4af37" />
                            ))}
                            {hasHalfStar && (
                                <div className="relative w-5 h-5">
                                    <Star className="absolute top-0 left-0" fill="none" stroke="#d4af37" />
                                    <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
                                        <Star fill="#d4af37" stroke="#d4af37" />
                                    </div>
                                </div>
                            )}
                            {[...Array(emptyStars)].map((_, i) => (
                                <Star key={`empty-${i}`} fill="none" stroke="gold" />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row md:flex-row w-full justify-between px-2 items-center space-y-2">
                    <p className="text-sm md:text-base">{review.product.name}</p>
                    <Link className="p-2 bg-gold-100 rounded-lg w-[8em] text-center" href={`/service/${review.product.name.split(' ').join('-')}/${review.product._id}`}>
                        Lihat produk
                    </Link>
                </div>
            </div>
        </article>
    )
}

export default ReviewItem;
