import { CreditCardIcon, ScrollTextIcon, User2Icon } from "lucide-react";
import Link from "next/link";

const SideNavbar = () => {
    return (
        <nav className="sticky lg:top-0 w-full lg:w-64 bg-white rounded-xl lg:rounded-none shadow-xl max-h-[42rem] border-b pb-8 lg:pb-0 no-scrollbar p-5">
            <div className="flex lg:flex-col gap-y-2 justify-center gap-x-10 lg:justify-start overflow-y-auto no-scrollbar">
                <Link href={'/profile'} className="flex flex-col items-center md:flex-row md:items-center gap-x-2 gap-y-1">
                    <User2Icon className="leading-none" />
                    <span className="leading-none">Profile</span>
                </Link>
                <Link href={'/payment/history'} className="flex flex-col items-center md:flex-row md:items-center gap-x-2 gap-y-1">
                    <CreditCardIcon className="leading-none" />
                    <span className="leading-none">Pembayaran</span>
                </Link>
                <Link href={'/transaction'} className="flex flex-col items-center md:flex-row md:items-center gap-x-2 gap-y-1">
                    <ScrollTextIcon className="leading-none" />
                    <span className="leading-none">Daftar Transaksi</span>
                </Link>
            </div>
        </nav>
    )
}

export default SideNavbar;