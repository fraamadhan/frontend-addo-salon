'use cleint'

import { deleteAccessToken } from "@/lib/token";
import Button from "../button/button";
import ProfileIcon from "./profile";
import { CreditCard, ScrollText, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { User } from "@/app/types/general";
import Link from "next/link";
import { toast } from "sonner";


const DropdownItem = (props: { user: User | null, showMenu: boolean | null }) => {

    const router = useRouter();

    const onClick = () => {
        deleteAccessToken()
        toast.error("Anda akan diarahkan ke halaman masuk...")
        router.replace('/auth/login')
    }

    const handleMovePage = () => {
        toast.info("Anda sudah berpindah halaman, klik X", {
            position: 'top-center',
            duration: 1500
        })
    }

    return (
        <div className="flex flex-col w-full overflow-hidden p-3 text-gold-500 gap-y-3">
            {/* profile */}
            <div className="flex items-center justify-between space-x-7">
                <ProfileIcon name={props.user?.name} image={props.user?.asset?.publicUrl ?? "/si.jpeg"} />
                <Link href={`/profile`} target="_blank">
                    <Button className="bg-gold-500 text-sm p-2 rounded-xl text-white cursor-pointer">Lihat Profil</Button>
                </Link>
            </div>

            {/* Pembayaran */}
            <div className="flex items-center space-x-4 cursor-pointer hover:bg-gray-600 p-2">
                <CreditCard />
                <Link href={'/transaction/payment'} onClick={props.showMenu ? handleMovePage : () => { }}>Pembayaran</Link>
            </div>
            {/* Daftar Transaksi */}
            <div className="flex items-center space-x-4 cursor-pointer hover:bg-gray-600 p-2">
                <ScrollText />
                <Link href={'/transaction'} onClick={props.showMenu ? handleMovePage : () => { }}>Daftar Transaksi</Link>
            </div>
            {/* Tombol keluar */}
            <div className="flex items-center space-x-4 cursor-pointer hover:bg-gray-600 p-2">
                <LogOut />
                <p onClick={onClick}>Keluar</p>
            </div>
        </div>
    )
}

export default DropdownItem;
