'use cleint'

import { deleteAccessToken } from "@/lib/token";
import Button from "../button/button";
import ProfileIcon from "./profile";
import { CreditCard, ScrollText, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { User } from "@/app/types/general";
import Link from "next/link";


const DropdownItem = (props: { user: User | null }) => {

    const router = useRouter();

    const onClick = () => {
        deleteAccessToken()
        router.replace('/auth/login')
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
                <p>Pembayaran</p>
            </div>
            {/* Daftar Transaksi */}
            <div className="flex items-center space-x-4 cursor-pointer hover:bg-gray-600 p-2">
                <ScrollText />
                <p>Daftar Transaksi</p>
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
