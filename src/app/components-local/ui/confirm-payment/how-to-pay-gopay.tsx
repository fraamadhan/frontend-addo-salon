import Link from "next/link";

const HowToPayGopay = () => {
    return (
        <div className="w-[20rem] md:w-[35rem] max-w-[60rem] bg-white shadow-lg rounded-lg p-6 text-left space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 text-center">Cara Membayar dengan GoPay</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm md:text-base">
                <li>Klik kanan pada gambar QR Code</li>
                <li>Klik <span className="font-medium">&quot;Salin link QR Code&quot;</span></li>
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
            </ol>
            <div className="w-full flex items-center justify-center">
                <hr className="w-1/3" />
                <p className="w-1/3 text-center">atau</p>
                <hr className="w-1/3" />
            </div>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm md:text-base">
                <li>Klik salin tulisan &quot;bayar&quot; di atas</li>
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
                <li>Paste link atau url ke input box &quot;redirect url&quot;</li>
                <li>Klik tombol &quot;Submit&quot;</li>
            </ol>
        </div>
    );
}

export default HowToPayGopay;