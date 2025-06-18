'use client'

import Image from "next/image";
import { useState } from "react";
const ProfileIcon = (props: { name?: string, image?: string }) => {
    const [imgSrc, setImgSrc] = useState(props.image || '/si.svg');
    const handleImageError = () => setImgSrc('/si.svg');
    return (
        <div className="flex items-center justify-between h-full space-x-3 z-100">
            <Image src={props?.image || imgSrc || '/si.svg'} width={48} height={48} alt="profile picture" className="rounded-full aspect-square object-cover" quality={100} onError={handleImageError} />
            <div className="flex flex-col items-start justify-center">
                <p className="text-sm text-gold-500 truncate">{props?.name ?? ""}</p>
                <p className="text-sm text-gold-100">Pembeli</p>
            </div>
        </div>
    )
}

export default ProfileIcon;
