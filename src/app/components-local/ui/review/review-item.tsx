import { ReviewItemProps } from "@/app/types/general";
import { Star } from "lucide-react";
import Image from "next/image";

const ReviewItemSection = ({ review }: { review: ReviewItemProps }) => {
    const roundedRating = Math.round(review.rating * 2) / 2;
    const fullStars = Math.floor(roundedRating);
    const hasHalfStar = roundedRating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="w-full flex gap-x-2 bg-white rounded-md shadow-sm p-2">
            <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                <Image src={review.user.assetRef || "/si.svg"} alt="Foto profil pengguna" width={36} height={36} className="object-cover" priority={false} />
            </div>
            <div className="flex flex-col w-full gap-y-1">
                <p className="text-sm font-semibold">{review.user.name}</p>
                <div className="flex items-center w-full mb-2">
                    {[...Array(fullStars)].map((_, i) => (
                        <Star key={`full-${i}`} fill="#d4af37" stroke="#d4af37" />
                    ))}
                    {hasHalfStar && (
                        <div className="relative w-5 h-5">
                            <Star className="absolute top-0 left-0" fill="#fffff" stroke="#d4af37" />
                            <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
                                <Star fill="#000000" stroke="#d4af37" />
                            </div>
                        </div>
                    )}
                    {[...Array(emptyStars)].map((_, i) => (
                        <Star key={`empty-${i}`} fill="none" stroke="gold" />
                    ))}
                </div>
                <p className="text-sm text-gray-500">{review.review}</p>
            </div>
        </div>
    )
}

export default ReviewItemSection;
