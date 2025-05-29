import Link from "next/link";

const HowToPayBank = () => {
    return (
        <div className="w-[20rem] md:w-[35rem] max-w-[60rem] bg-white shadow-lg rounded-lg p-6 text-left space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 text-center">Cara Membayar dengan Bank</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm md:text-base">
                <li>Salin virtual account number yang tertera</li>
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
                <li>Pilih metode pembayaran <span className="font-semibold">Virtual Account</span></li>
                <li>Pilih Bank yang digunakan</li>
                <li>Paste virtual account number ke input box &quot;virtual account number&quot;</li>
                <li>Klik tombol &quot;Inquire&quot;</li>
            </ol>
        </div>
    );
}

export default HowToPayBank;