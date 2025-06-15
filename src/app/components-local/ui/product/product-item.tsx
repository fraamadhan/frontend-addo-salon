import { ProductItemProps } from "@/app/types/general";
import { rupiahFormatter } from "@/lib/rupiah-formatter";
import { Star, Timer } from "lucide-react";
import Image from "next/image";

const ProductItem = (props: { product: ProductItemProps }) => {
    const product = props.product;
    return (
        <article className='flex flex-col w-full lg:max-w-[15rem] rounded-md space-y-1 bg-gray-50 p-2 shadow-lg'>
            {/* image */}
            <div className="relative aspect-[90/120]">
                <Image
                    src={product.assetRef}
                    // width={221}
                    // height={300}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt={`Gambar ${product.name}`}
                    className="rounded-md object-cover"
                    priority={true}
                />
            </div>
            {/* product name */}
            <div className="space-y-1.5">
                <p className="font-lora font-bold xl:text-lg">{product.name}</p>
            </div>
            {/* price */}
            <div className="space-y-1.5">
                <p className="font-medium">{rupiahFormatter(product.price)}</p>
            </div>
            {/* rating */}
            <div className="flex items-center text-sm space-x-1">
                <Star fill="#d4af37" size={18} strokeWidth={1} />
                <span aria-label={`Rating: ${Math.round(product.ratingAverage * 10) / 10} stars`}>{Math.round(product.ratingAverage * 10) / 10}</span>
            </div>
            {/* estimation */}
            <div className="flex items-center text-sm space-x-1">
                <Timer size={18} strokeWidth={1} />
                <span>
                    {product.estimation} <span className="sr-only">Estimasi layanan</span>jam
                </span>
            </div>
        </article>
    )
}

export default ProductItem;
