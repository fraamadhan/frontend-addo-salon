import UnreviewedItemList from "@/app/components-local/ui/review/unreview-list";
import { PaginationParams } from "@/app/types/query-params";

const ReviewPage = async (props: {
    searchParams?: Promise<PaginationParams>;
}) => {

    const params = await props.searchParams;
    const keyword = params?.keyword || "";
    const page = params?.page || "1";
    return (
        <main className="w-full flex flex-col min-h-screen p-1 md:p-8">
            <p className="leading-none text-xl font-bold">Menunggu diulas</p>
            <UnreviewedItemList keyword={keyword} page={page} />
        </main>
    )
}

export default ReviewPage;