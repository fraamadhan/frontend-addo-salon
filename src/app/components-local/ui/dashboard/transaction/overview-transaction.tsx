import { TransactionListItem } from "@/app/types/transaction-type";
import { dateFormatter } from "@/lib/date-formatter";
import { rupiahFormatter } from "@/lib/rupiah-formatter";

const OverviewTransaction = (
    { transaction }: { transaction: TransactionListItem }
) => {
    return (
        <section className="w-full md:max-w-[25rem] md:p-2">
            <div className="w-full p-7 flex flex-col justify-between bg-white rounded-xl shadow shadow-gray-50 border gap-y-9">
                <div className="flex">
                    <div className="flex flex-col gap-y-2 w-full sm:items-center">
                        <p className="font-bold leading-none">Tanggal Transaksi</p>
                        <p className="leading-none">{transaction?.createdAt ? dateFormatter(transaction?.createdAt) : ""}</p>
                    </div>
                    <div className="flex flex-col gap-y-2 w-full sm:items-center">
                        <p className="font-bold leading-none">Kode Pesanan</p>
                        <p className="leading-none">{transaction?.orderCode}</p>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex flex-col gap-y-2 w-full sm:items-center">
                        <p className="font-bold leading-none">Metode Pembayaran</p>
                        <p className="leading-none">
                            {{
                                bank_transfer: `${transaction?.bank?.toUpperCase()} Virtual Account`,
                                gopay: "Pembayaran GoPay",
                                qris: "Pembayaran QRIS",
                            }[transaction?.payment_type_midtrans as 'bank_transfer' | 'gopay' | 'qris' || transaction?.paymentMethod as 'bank_transfer' | 'gopay' | 'qris'] ?? null}
                        </p>
                    </div>
                    <div className="flex flex-col gap-y-2 w-full sm:items-center">
                        <p className="font-bold leading-none">Total Pembayaran</p>
                        <p className="leading-none">{transaction?.total_price ? rupiahFormatter(transaction?.total_price) : 0}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OverviewTransaction;
