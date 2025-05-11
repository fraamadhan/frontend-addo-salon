import { Calendar, Mail, Phone, Pin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
    const contactInfo = [
        { icon: <Pin />, text: 'Jl. PLN Dalam I, Ciseureuh, Kec. Regol, Kota Bandung, Jawa Barat 40255', type: 'address' },
        { icon: <Calendar />, text: 'Selasa - Minggu | 09:00 - 17:00 WIB', type: 'time' },
        { icon: <Mail />, text: 'raeljarr@gmail.com', type: 'email', href: 'mailto:raeljarr@gmail.com' },
        { icon: <Phone />, text: '+62 895-6392-04727', type: 'tel', href: 'https://wa.me/+62895639204727' },
    ];

    return (
        <footer className="bottom-0 flex flex-col w-full bg-gray-600 z-50 h-fit px-7 md:px-17 text-gold-500 mt-4 gap-y-2">
            {/* informasi terkait addo salon */}
            <div className="flex flex-col space-y-5 md:flex-row justify-between mt-4">
                <div className="flex flex-col gap-y-5 items-center md:items-start">
                    <h3 className="text-2xl">Addo Salon</h3>
                    <div className="flex flex-col text-gold-100">
                        <Link href='/about-us'>
                            Tentang Addo Salon
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-y-5 items-center xl:items-start">
                    <h3 className="text-2xl">Hubungi Kami</h3>
                    <div className="flex flex-col text-gold-100 space-y-3 items-center xl:items-start">
                        {contactInfo.map((item, i) => (
                            <div key={i} className="flex space-x-3 items-start">
                                {item.icon}
                                {item.type === 'address' ? (
                                    <address className="not-italic" lang="id">{item.text}</address>
                                ) : item.type === 'time' ? (
                                    <time lang="id">{item.text}</time>
                                ) : item.type === 'email' || item.type === 'tel' ? (
                                    <a href={item.href || ""} className="hover:underline" target="_blank" rel="noopener noreferrer" lang="id">
                                        {item.text}
                                    </a>
                                ) : (
                                    <p>{item.text}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* informasi metode pembayaran */}
            <div className="flex flex-col gap-y-5 md:border-2 p-5 shadow-lg mt-4">
                <h3 className="text-2xl text-center">Metode Pembayaran</h3>
                <div className="flex flex-wrap gap-3 md:gap-4 items-center justify-center space-x-7">
                    <div className="flex-none w-fit items-center">
                        <Image src='/mandiri-logo.svg' width={70} height={70} alt="Mandiri Virtual Account" priority />
                    </div>
                    <div className="flex-none w-fit items-center">
                        <Image src='/bca-logo.svg' width={70} height={70} alt="BCA Virtual Account" priority />
                    </div>
                    <div className="flex-none w-fit items-center">
                        <Image src='/qris-logo.svg' width={70} height={70} alt="Pembayaran QR" priority />
                    </div>
                </div>
            </div>
            {/* copyright */}
            <div className="mt-12">
                <p className="text-base text-center text-gold-100">©2025 Addo Salon</p>
            </div>
        </footer>
    )
}

export default Footer;
