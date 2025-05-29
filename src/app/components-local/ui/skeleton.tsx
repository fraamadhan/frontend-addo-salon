export const ResetPasswordSkeleton = () => {
    return (
        <div className="flex flex-col shadow-lg w-[20em] md:w-[28em] items-center p-5 space-y-2 animate-pulse">
            <div className="h-6 w-40 bg-gray-300 rounded mb-2" />
            <div className="h-4 w-48 bg-gray-200 rounded" />

            <div className="flex flex-row gap-4 mt-12 bg-warning-50 p-3 rounded-xl items-center mb-5 w-full">
                <div className="w-[3em] h-[3em] bg-warning-300 rounded-full" />
                <div className="flex-1 h-4 bg-gray-200 rounded" />
            </div>

            <div className="space-y-3 w-full">
                <div className="h-10 bg-gray-200 rounded w-full" />
                <div className="h-10 bg-gray-200 rounded w-full" />
                <div className="h-10 bg-gray-200 rounded w-full" />
            </div>
        </div>
    )
}

export const ReviewItemSkeleton = () => {
    return (
        <div className="flex flex-col min-w-[18rem] sm:min-w-[20rem] md:min-w-[24rem] items-center p-4 justify-between space-y-2 bg-gray-100 rounded-3xl animate-pulse">
            <div className="h-16 bg-gray-300 w-full rounded" />
            <div className="w-[75%] h-[1px] bg-black" />
            <div className="flex w-full items-center space-x-2">
                <div className="w-12 h-12 rounded-full bg-gray-300" />
                <div className="flex flex-col space-y-2 w-full">
                    <div className="w-1/2 h-4 bg-gray-300 rounded" />
                    <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-5 h-5 bg-gray-300 rounded" />
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-between px-2">
                <div className="w-1/3 h-4 bg-gray-300 rounded" />
                <div className="w-1/4 h-8 bg-gray-300 rounded" />
            </div>
        </div>
    );
};

export const ProductItemSkeleton: React.FC = () => (
    <div className="animate-pulse bg-white border border-gray-200 rounded-lg p-4">
        {/* Image placeholder (aspect ratio 221:300) */}
        <div className="bg-gray-200 rounded-t-lg aspect-[221/300] w-full" />

        {/* Product name placeholder */}
        <div className="mt-4 h-5 bg-gray-200 rounded w-3/4" />

        {/* Price placeholder */}
        <div className="mt-2 h-4 bg-gray-200 rounded w-1/2" />

        {/* Rating (icon + text) placeholder */}
        <div className="mt-3 flex items-center">
            <div className="bg-gray-200 rounded-full h-4 w-4" />
            <div className="ml-2 h-4 bg-gray-200 rounded w-8" />
        </div>

        {/* Estimation (icon + text) placeholder */}
        <div className="mt-2 flex items-center">
            <div className="bg-gray-200 rounded-full h-4 w-4" />
            <div className="ml-2 h-4 bg-gray-200 rounded w-12" />
        </div>
    </div>
);

export const ServiceDetailSkeleton = () => (
    <div className="flex items-center flex-col lg:flex-row gap-y-7 lg:gap-y-0 justify-center lg:justify-start animate-pulse gap-x-10">
        <div className="bg-gray-200 rounded w-[320px] h-[350px]" />
        <div className="flex flex-col gap-y-3 flex-1 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-2/3" />
            <div className="h-7 bg-gray-300 rounded w-1/3" />
            <div className="flex gap-x-2">
                <div className="h-5 bg-gray-200 rounded w-20" />
            </div>
            <hr className="w-full border-1" />
            <div className="flex flex-col gap-y-2">
                <div className="flex flex-col gap-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24" />
                    <div className="h-8 bg-gray-100 rounded w-48" />
                </div>
                <div className="p-2 bg-gray-100 rounded-md">
                    <div className="h-4 bg-gray-200 rounded w-40 mb-1" />
                    <div className="h-4 bg-gray-200 rounded w-32" />
                </div>
            </div>
            <div className="w-full mt-4">
                <div className="h-10 bg-gray-300 rounded w-full" />
            </div>
        </div>
    </div>
)

export const ReviewSectionSkeleton = () => {
    return (
        <section className="w-[42rem] flex gap-x-7 py-7 px-1 animate-pulse">

            <div className="flex flex-col gap-y-3 items-center justify-center">
                {/* Rating number */}
                <div className="flex items-end justify-center gap-y-1">
                    <div className="h-10 w-16 bg-gray-300 rounded-md" />
                    <div className="h-4 w-8 bg-gray-300 rounded ml-2" />
                </div>

                <div className="flex w-[5em] sm:w-[9em] md:w-[12em] h-8 space-x-1 justify-center">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-8 w-8 bg-gray-300 rounded" />
                    ))}
                </div>

                <div className="flex items-center justify-center">
                    <div className="h-4 w-20 bg-gray-300 rounded" />
                </div>
            </div>

            <div className="flex flex-col gap-y-2 flex-grow">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="flex items-center gap-x-1">
                        <div className="h-4 w-3 bg-gray-300 rounded" />
                        <div className="h-3 w-3 bg-gray-300 rounded" />
                        <div className="w-[12rem] bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div className="bg-gray-400 rounded-full h-2 w-1/2" />
                        </div>
                        <div className="h-4 w-6 bg-gray-300 rounded" />
                    </div>
                ))}
            </div>
        </section>
    );
};

export const CartItemSkeleton = () => {
    return (
        <article className="flex flex-col gap-4 w-full p-4 border-b-4 animate-pulse">
            <div className="flex items-center gap-x-3 w-full">
                <div className="w-4 h-4 bg-gray-300 rounded" />
                <div className="w-[80px] h-[80px] bg-gray-300 rounded-md" />
                <div className="flex flex-col gap-y-2 w-full">
                    <div className="w-2/3 h-4 bg-gray-300 rounded" />
                    <div className="w-1/3 h-4 bg-gray-300 rounded" />
                    <div className="w-1/2 h-3 bg-gray-200 rounded" />
                </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-stretch gap-y-7 w-full p-2">
                <div className="w-full md:w-3/4 h-10 bg-gray-300 rounded" />
                <div className="w-6 h-6 bg-gray-300 rounded ml-3" />
            </div>
        </article>
    );
};

export const CartListSkeleton = () => {
    return (
        <div className="w-full flex flex-col gap-6">
            <CartItemSkeleton />
            <CartItemSkeleton />
            <CartItemSkeleton />
        </div>
    );
};

export const ProfileFormSkeleton = () => {
    return (
        <div className="animate-pulse space-y-6 w-full">
            {/* Profile Image */}
            <div className="flex flex-col items-center justify-center w-full gap-y-4">
                <div className="w-48 h-48 rounded-full bg-gray-300" />
                <div className="w-[8rem] h-10 bg-gray-300 rounded-md" />
            </div>

            {/* General Information */}
            <div className="flex flex-col w-full gap-y-4">
                {/* Name */}
                <div className="flex items-center gap-x-3">
                    <div className="w-[6rem] h-5 bg-gray-300 rounded-md" />
                    <div className="w-[18rem] h-10 bg-gray-300 rounded-md" />
                </div>

                {/* Email */}
                <div className="flex items-center gap-x-3">
                    <div className="w-[6rem] h-5 bg-gray-300 rounded-md" />
                    <div className="w-[18rem] h-10 bg-gray-300 rounded-md" />
                </div>

                {/* Phone Number */}
                <div className="flex items-center gap-x-3">
                    <div className="w-[6rem] h-5 bg-gray-300 rounded-md" />
                    <div className="w-[18rem] h-10 bg-gray-300 rounded-md" />
                </div>

                {/* Gender */}
                <div className="flex items-center gap-x-3">
                    <div className="w-[6rem] h-5 bg-gray-300 rounded-md" />
                    <div className="w-[18rem] h-10 bg-gray-300 rounded-md" />
                </div>

                {/* Birth Date */}
                <div className="flex items-center gap-x-3">
                    <div className="w-[6rem] h-5 bg-gray-300 rounded-md" />
                    <div className="w-[18rem] h-10 bg-gray-300 rounded-md" />
                </div>

                {/* Address */}
                <div className="flex items-start gap-x-3">
                    <div className="w-[6rem] h-20 bg-gray-300 rounded-md" />
                    <div className="w-[18rem] h-[6rem] bg-gray-300 rounded-md" />
                </div>
            </div>

            {/* Buttons */}
            <div className="w-full flex justify-center md:justify-end items-center gap-x-3">
                <div className="w-[8rem] h-10 bg-gray-300 rounded-md" />
                <div className="w-[8rem] h-10 bg-gray-300 rounded-md" />
            </div>
        </div>
    );
};

