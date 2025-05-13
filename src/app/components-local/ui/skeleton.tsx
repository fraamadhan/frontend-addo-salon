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