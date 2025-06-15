import { CreditCardIcon, NotebookIcon, ScrollTextIcon, User2Icon } from "lucide-react";
import Link from "next/link";

const SideNavbar = () => {
    return (
        <nav className="sticky lg:top-0 w-full lg:w-64 bg-white rounded-xl lg:rounded-none shadow-xl max-h-[42rem] border-b pb-8 lg:pb-0 no-scrollbar p-5">
            <div className="flex flex-col sm:flex-row gap-y-2 gap-x-10 justify-start sm:justify-center sm:items-center lg:flex-col lg:items-start overflow-y-auto no-scrollbar">
                <Link href={'/profile'} className="flex flex-col items-center md:flex-row md:items-center gap-x-2 gap-y-1">
                    <User2Icon className="leading-none" />
                    <span className="leading-none">Profile</span>
                </Link>
                <Link href={'/transaction/payment'} className="flex flex-col items-center md:flex-row md:items-center gap-x-2 gap-y-1">
                    <CreditCardIcon className="leading-none" />
                    <span className="leading-none">Pembayaran</span>
                </Link>
                <Link href={'/transaction'} className="flex flex-col items-center md:flex-row md:items-center gap-x-2 gap-y-1">
                    <ScrollTextIcon className="leading-none" />
                    <span className="leading-none">Daftar Transaksi</span>
                </Link>
                <Link href={'/review'} className="flex flex-col items-center md:flex-row md:items-center gap-x-2 gap-y-1">
                    <NotebookIcon className="leading-none" />
                    <span className="leading-none">Ulasan</span>
                </Link>
            </div>
        </nav>
    )
}

export default SideNavbar;