import FilterTab from "@/app/components-local/ui/product/filter-tab";
import FilterTabMobile from "@/app/components-local/ui/product/filter-tab-mobile";
import { FilterUIProvider } from "@/app/components-local/ui/product/filter-ui-context";
import ProductList from "@/app/components-local/ui/product/product-list";
import SearchSort from "@/app/components-local/ui/product/search-sort";
import { ParamsSearchProductDto } from "@/app/types/query-params";

const ProductPage = async ({ searchParams }: { searchParams: Promise<ParamsSearchProductDto> }) => {
    const params = await searchParams;

    const parsedParams = {
        page: params.page || "1",
        limit: params.limit || "10",
        category: params.category || "",
        keyword: params.keyword || "",
        sortby: params.sortby || "createdAt",
        sorttype: params.sorttype || "asc",
        highestPrice: params.highestPrice || "0",
        lowestPrice: params.lowestPrice || "0",
        rating: params.rating || undefined,
        type: params.type || undefined,
    };


    return (
        <FilterUIProvider>
            <div className="w-full flex flex-col md:flex-row gap-x-0 md:gap-x-[2em] px-4 sm:px-6 lg:px-12 xl:px-16">
                {/* filter tab */}
                <FilterTab />
                {/* products list content */}
                <main className="flex flex-col w-full">
                    {/* Input box and tab filter/order */}
                    <SearchSort />
                    {/* Section product */}
                    <ProductList searchParams={parsedParams} />
                </main>
                <FilterTabMobile />
            </div>
        </FilterUIProvider>
    )
}

export default ProductPage;
