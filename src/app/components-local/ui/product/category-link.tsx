import { CategoryGroup } from "@/app/types/general";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const CategoryLink = ({ category }: { category: CategoryGroup }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set("category", category.parent.slug);
    currentParams.set("page", "1");

    const href = `${pathname}?${currentParams.toString()}`;
    return (
        <Link
            key={category.parent._id}
            href={href}
            className={`flex items-center w-full space-x-3 p-2 rounded-md hover:bg-gray-100 ${searchParams.get('category') === category.parent.slug ? 'bg-gray-200' : ''}`}

        >
            {category.parent.name}
        </Link>
    )
}

export default CategoryLink;
