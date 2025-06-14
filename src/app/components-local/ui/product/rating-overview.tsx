import { Star } from "lucide-react";

const RatingOverview = (
    {
        totalReviews,
        arrayStarCount,
        ratingAverage,
    }
        :
        {
            totalReviews: number;
            arrayStarCount: { star: number, count: number }[],
            ratingAverage: number,
        }
) => {

    const rating = (ratingAverage * 10) / 10;
    if (rating < 0 || rating > 5) {
        console.log(rating)
        throw new Error("Rating must be between 0 and 5");
    }

    let roundedRating = rating;
    if (rating % 1 >= 0.75) {
        roundedRating = Math.ceil(rating); // 
    } else if (rating % 1 >= 0.25) {
        roundedRating = Math.floor(rating) + 0.5;
    } else {
        roundedRating = Math.floor(rating);
    }
    const fullStars = Math.floor(roundedRating);
    const hasHalfStar = roundedRating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const totalPercent = (stars: number) => {
        const percent = (stars / totalReviews) * 100;

        return percent.toFixed();
    }

    return (
        <section className="w-full md:w-[42rem] flex flex-col md:flex-row items-center gap-x-7 py-7 px-1">

            <div className="flex flex-col gap-y-3 items-center justify-center">
                <div className="flex items-end justify-center gap-y-1">
                    <h1 className="font-lora text-3xl font-bold">{rating.toFixed(1)}</h1>
                    <p className="text-gray-400 leading-none">/5.0</p>
                </div>
                <div className="flex w-[5em] sm:w-[9em] md:w-[12em] items-center justify-center">
                    {[...Array(fullStars)].map((_, i) => (
                        <Star key={`full-${i}`} fill="#d4af37" stroke="#d4af37" className="w-8 h-8" />
                    ))}
                    {hasHalfStar && (
                        <div className="relative w-8 h-8">
                            <Star className="absolute top-0 left-0 h-8 w-8" fill="none" stroke="#d4af37" />
                            <div className="absolute top-0 left-0 w-1/2 h-full overflow-hidden">
                                <Star fill="#d4af37" stroke="#d4af37" className="w-8 h-8" />
                            </div>
                        </div>
                    )}
                    {[...Array(emptyStars)].map((_, i) => (
                        <Star key={`empty-${i}`} fill="none" stroke="#d4af37" className="w-8 h-8" />
                    ))}
                </div>
                <div className="flex items-center justify center">
                    <p className="leading-none text-lg">{totalReviews} ulasan</p>
                </div>
            </div>

            <div className="flex flex-col gap-y-2">
                {
                    arrayStarCount.map((value, index) => (
                        <div key={index + 1} className="flex items-center gap-x-1">
                            <span className="leading-none mr-1 w-1">{index + 1}</span>
                            <Star fill="#d4af37" stroke="#d4af37" className="w-3 h-3" />
                            <div className="w-[12rem] bg-gray-200 rounded-full">
                                <div className="bg-gold-500 rounded-full h-2 progress-bar" style={{ ['--width' as string]: `${totalPercent(value.count)}%` }} />
                            </div>
                            <div>
                                <span className="text-gray-400 text-sm">({value.count})</span>
                            </div>
                        </div>
                    )).reverse()
                }
            </div>
        </section>
    )
}

export default RatingOverview;
