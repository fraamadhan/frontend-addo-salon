'use client'

import { Menu, X } from "lucide-react"
import Logo from "./logo";
import NavItems from "./nav-items";
import { useState } from "react";
import DropdownMenu from "./dropdown-menu";
import Button from "../button/button";
import AuthButton from "./auth-button";
import { User } from "@/app/types/general";

const MobileHeader = (props: { isLogin: boolean, user: User | null }) => {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <div className="flex flex-col w-full items-center md:hidden">
            <div className="flex w-full h-full items-center justify-between px-4">
                <div className="relative block md:hidden">
                    <Menu onClick={() => setShowMenu(true)} />
                </div>

                <div className="flex-none items-center justify-start h-full">
                    <Logo />
                </div>
                <div className="w-6">

                </div>
            </div>
            <div className="flex space-x-10 text-lg">
                <NavItems isLogin={props.isLogin} />
            </div>
            <div
                className={`fixed top-0 left-0 w-full h-full bg-gray-400 z-50 overflow-auto transform transition-transform duration-300 
                ${showMenu ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'}`}
            >
                <div className="flex justify-end p-4">
                    <Button onClick={() => setShowMenu(false)}>
                        <X className="text-black w-6 h-6" />
                    </Button>
                </div>
                {props.isLogin ? <DropdownMenu className="w-full h-full flex flex-col justify-start p-4" user={props.user} showMenu={showMenu} /> : <AuthButton />}
            </div>

        </div>
    )
}

export default MobileHeader;
