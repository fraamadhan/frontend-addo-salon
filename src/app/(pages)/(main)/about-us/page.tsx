const AboutUsPage = () => {
    return (
        <section className="min-h-screen w-full bg-white px-6 py-12 sm:px-12 md:px-20 lg:px-32">
            <div className="max-w-5xl mx-auto flex flex-col gap-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 font-serif">
                    Tentang Addo Salon
                </h1>

                <p className="text-lg text-gray-600 leading-relaxed">
                    Di <span className="font-semibold text-gray-800">Addo Salon</span>, kami percaya bahwa kecantikan bukan hanya soal penampilan — tetapi tentang kepercayaan diri, mencintai diri sendiri, dan merayakan keunikan Anda. Sejak awal berdiri, kami berkomitmen memberikan pengalaman salon yang profesional, nyaman, dan penuh kreativitas.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">✨ Filosofi Kami</h2>
                        <p className="text-gray-600">
                            Rambut dan kulit Anda pantas mendapatkan perawatan terbaik. Karena itu, kami menggabungkan keahlian, ketelitian, dan produk berkualitas untuk memastikan setiap tamu merasa cantik dan segar kembali.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">💇‍♀️ Layanan Kami</h2>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                            <li>Potong & Penataan Rambut</li>
                            <li>Pewarnaan & Perawatan Rambut</li>
                            <li>Rias Wajah & Paket Pengantin</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-gray-100 p-6 mt-4 rounded-2xl text-center shadow-inner">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-2">Mengapa Memilih Addo?</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Addo bukan sekadar salon — ini adalah ruang untuk Anda bersantai, dimanjakan, dan keluar dengan rasa percaya diri yang baru.
                    </p>
                </div>

                <div className="text-center mt-12">
                    <p className="text-gray-500 italic">
                        “Kepercayaan diri adalah gaya terbaik. Biar kami bantu Anda meraihnya.”
                    </p>
                    <p className="mt-2 text-sm text-gray-400">&mdash; Tim Addo Salon</p>
                </div>
            </div>
        </section>
    );
};

export default AboutUsPage;
