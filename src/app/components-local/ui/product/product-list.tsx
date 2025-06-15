'use client'

import { ProductItemProps } from "@/app/types/general";
import ProductItem from "./product-item";
import { ParamsSearchProductDto } from "@/app/types/query-params";
import { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "../pagination/pagination";
import { useGetProducts } from "@/services/productService";
import { ProductItemSkeleton } from "../skeleton";
import Link from "next/link";

const ProductList = ({ searchParams }: { searchParams: ParamsSearchProductDto }) => {

    const [currentPage, setCurrentPage] = useState(Number(searchParams.page) || 1);
    const [totalPage, setTotalPage] = useState(1);

    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    const { data, isLoading, isError } = useGetProducts(searchParams);

    const products = data?.data?.products || [];
    const paginator = data?.data?.paginator || null;

    useEffect(() => {
        if (paginator?.pageCount) setTotalPage(paginator.pageCount);
        if (paginator?.page) setCurrentPage(paginator.page);
    }, [paginator]);

    const handlePageChange = (page: number) => {
        const currentParams = new URLSearchParams(params);
        currentParams.set('page', String(page));
        setCurrentPage(page);
        router.push(`${pathname}?${currentParams.toString()}`, { scroll: true });
    }


    return (
        <div className="flex flex-col w-full">
            <Suspense fallback={<ProductItemSkeleton />}>
                <section className={`${isError ? 'hidden' : 'grid'} grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6 ${products && products.length > 0 ? 'mb-10' : ''}`}>
                    {isLoading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                            <ProductItemSkeleton key={index} />
                        ))
                    ) : (
                        products.map((product: ProductItemProps) => (
                            <Link key={product._id} href={`/service/${product.name.split(' ').join('-')}/${product._id}`} className="flex items-stretch">
                                <ProductItem product={product} />
                            </Link>

                        ))
                    )}
                </section>
            </Suspense>

            {isError && <p className="text-error-400">Gagal memuat layanan</p>}

            {!isLoading && !isError && products.length === 0 && (
                <div className="flex flex-col items-center justify-center w-full min-h-[20rem]">
                    <p className="text-gray-400 text-center text-lg">Tidak ada data layanan</p>
                </div>
            )}
            {/* pagination */}
            <Pagination
                currentPage={currentPage}
                totalPage={totalPage}
                handlePageChange={handlePageChange}
                paginator={paginator} />
        </div>
    )
}

export default ProductList;
