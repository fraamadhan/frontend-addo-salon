import Link from "next/link";

export const NavItems = (props: { isLogin: boolean }) => {
    return (
        <nav className="flex text-xl text-gold-500 items-center justify-evenly gap-x-10">
            <Link href='/home'>
                Beranda
            </Link>
            <Link href='/service?page=1&limit=10'>
                Layanan
            </Link>
            {props.isLogin && <Link href='/cart'>
                Keranjang
            </Link>}
            <Link href='/about-us' className="hidden md:hidden lg:block">
                Tentang Kami
            </Link>
        </nav>
    )
}

export default NavItems;
