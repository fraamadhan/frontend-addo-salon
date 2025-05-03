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