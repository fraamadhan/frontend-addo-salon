'use client'

import { useCallback, useState } from "react";
import AuthButton from "./auth-button";
import DropdownMenu from "./dropdown-menu";
import Logo from "./logo";
import NavItems from "./nav-items";
import ProfileIcon from "./profile";
import { User } from "@/app/types/general";

const DesktopHeader = (props: { isLogin: boolean, user: User | null }) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const onMouseEnter = useCallback(() => setShowDropdown(true), []);
    const onMouseLeave = useCallback(() => setShowDropdown(false), []);

    const authButtonOrProfile = !props.isLogin ? (<AuthButton />) : (<div
        className="relative flex items-center p-10 lg:p-0"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        <ProfileIcon name={props.user?.name} image={props.user?.asset?.publicUrl ?? "/si.svg"} />
        {showDropdown && (
            <div className="absolute top-full -right-17"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}>
                <DropdownMenu className="overflow-hidden rounded-b-xl origin-top-right shadow-lg bg-gray-400 focus:outline-none cursor-default z-50 w-[20em] pt-4" user={props.user} showMenu={null} setShowMenu={() => { }} />
            </div>
        )}
    </div>)

    return (
        <div className="hidden md:flex items-center justify-between w-full">
            <Logo />
            <div className="flex space-x-10 text-lg">
                <NavItems isLogin={props.isLogin} />
            </div>
            {authButtonOrProfile}

        </div>
    )
}

export default DesktopHeader;
