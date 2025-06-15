'use client'

import SectionBanner from "@/app/components-local/ui/home/section-banner";
import SectionCategory from "@/app/components-local/ui/home/section-category";
import SectionReview from "@/app/components-local/ui/home/section-review";
import { useGetRandomReview } from "@/services/reviewService";

const HomePage = () => {
    const imagesSrc = [
        { src: '/banner-hero/beauty_addo_salon.webp', alt: "Layanan Addo Salon" },
        { src: '/banner-hero/new_shampoo_product.webp', alt: "Produk sampo baru yang digunakan" },
        { src: '/banner-hero/payment_online.webp', alt: "Pembayaran online melalui website" },
    ]
    const categories = [
        { src: '/category/perawatan-rambut.webp', href: '/service?page=1&limit=10&category=perawatan-rambut', alt: "Kategori Perawatan Rambut" },
        { src: '/category/perawatan-wajah.webp', href: '/service?page=1&limit=10&category=perawatan-wajah', alt: "Kategori Perawatan Wajah" },
        { src: '/category/make-up.webp', href: '/service?page=1&limit=10&category=make-up', alt: "Kategori make-up" },
    ]

    const { data, isLoading } = useGetRandomReview();

    return (
        <main className="flex flex-col w-full p-12 items-center space-y-10">
            {/* Banner Hero Section */}
            <SectionBanner imagesSrc={imagesSrc} />
            {/* Category Section */}
            <SectionCategory categories={categories} />
            {/* Review Section */}
            <SectionReview reviews={isLoading ? Array(5).fill(null) : data?.data.data} />
        </main>
    )
}

export default HomePage;
