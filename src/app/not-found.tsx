'use client';

import Link from 'next/link';

const NotFound = () => {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gold-500 text-gray-800">
            <div className="text-center max-w-xl">
                <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                <h2 className="text-2xl md:text-3xl font-semibold mb-3">
                    Halaman Tidak Ditemukan
                </h2>
                <p className="text-gray-600 mb-6">
                    Maaf, halaman yang Anda cari tidak tersedia atau mungkin telah dipindahkan.
                </p>

                <div className="bg-gray-400 border border-gray-700 rounded-xl p-6 mb-6 shadow-sm">
                    <p className="text-lg font-medium text-gold-500 mb-2">
                        Ingin tampil cantik dan percaya diri?
                    </p>
                    <p className="text-gold-500">
                        Kunjungi halaman utama Addo Salon dan temukan layanan terbaik untuk Anda.
                    </p>
                </div>

                <Link
                    href="/home"
                    className="inline-block mt-4 bg-gray-800 hover:bg-gray-700 text-gold-500 px-6 py-3 rounded-full transition-colors duration-300"
                >
                    Kembali ke Beranda
                </Link>
            </div>
        </main>
    );
};

export default NotFound;
