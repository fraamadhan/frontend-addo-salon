import Link from "next/link";

const HowToPayQris = () => {
    return (
        <div className="w-[20rem] md:w-[35rem] max-w-[60rem] bg-white shadow-lg rounded-lg p-6 text-left space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 text-center">Cara Membayar dengan QRIS</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm md:text-base">
                <li>Klik kanan pada gambar QR Code</li>
                <li>Klik <span className="font-medium">&quot;Copy Image Address&quot;</span> atau <span className="font-medium">&quot;Salin Image Address&quot;</span></li>
                <li>Atau dapat klik tombol &quot;Salin link QR Code&quot;</li>
                <li>
                    Kunjungi halaman{" "}
                    <Link
                        href="https://simulator.sandbox.midtrans.com/"
                        className="text-blue-600 hover:text-blue-800 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i>Midtrans Simulator</i>
                    </Link>
                </li>
                <li>Pilih metode pembayaran <span className="font-semibold">QRIS</span></li>
                <li>Paste atau tempel URL gambar QR Code ke kolom yang tersedia</li>
                <li>Klik tombol &quot;Scan QR&quot;</li>
            </ol>
        </div>
    );
};

export default HowToPayQris;
