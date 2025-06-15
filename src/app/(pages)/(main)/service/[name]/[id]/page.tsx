'use client'

import SectionSimilarProducts from "@/app/components-local/ui/product/section-similar-products";
import ServiceDetail from "@/app/components-local/ui/product/service-detail";
import TabLayout from "@/app/components-local/ui/tab-layout/tab-layout";
import { useGetProduct } from "@/services/productService";
import { useParams } from "next/navigation";
const ServiceDetailPage = () => {

    const params = useParams<{ name: string, id: string }>();

    const { data, isLoading, isError } = useGetProduct(params.id);
    const product = data?.data;

    return (
        <main className="w-full flex flex-col gap-y-8 px-10 md:px-25 py-9 justify-center lg:justify-start">
            {/* product information */}
            <ServiceDetail product={product} isLoading={isLoading} isError={isError} />

            {/* Tab view description, review, and schedule */}
            <section className="w-full">
                <TabLayout product={product} />
            </section>

            {/* Service lainnya berdasarkan category */}
            <section className="w-full">
                <SectionSimilarProducts slug={product?.category[0].slug} />
            </section>
        </main>
    )
}

export default ServiceDetailPage;