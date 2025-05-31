import { TransactionListItem } from "@/app/types/transaction-type";
import { dateFormatter } from "@/lib/date-formatter";
import { TransactionStatus } from "@/lib/enum/transaction-status";
import { rupiahFormatter } from "@/lib/rupiah-formatter";
import Image from "next/image";
import Link from "next/link";

const TransactionItem = ({ transaction }: { transaction: TransactionListItem }) => {
    return (
        <div className="w-full flex flex-col gap-y-2 border-2 rounded-xl shadow-xl p-4">
            {/* top */}
            <div className="flex flex-col-reverse md:flex-row md:items-center gap-y-1">
                <div className="flex w-full text-sm items-center gap-x-2">
                    <p className="mr-3">{dateFormatter(transaction.createdAt)}</p>
                    <p className="text-gray-400 font-bold">{transaction.orderCode}</p>
                </div>
                <div className="w-full flex md:justify-end">
                    <div className={`p-2 ${transaction.status === TransactionStatus.COMPLETED ? "bg-success-300 text-success-500" : ""} ${transaction.status === TransactionStatus.CANCELED || transaction.status === TransactionStatus.EXPIRED ? "bg-error-300 text-error-500" : ""} ${transaction.status === TransactionStatus.IN_PROGRESS || transaction.status === TransactionStatus.PENDING || transaction.status === 'SCHEDULED' ? "bg-blue-300 text-blue-500" : ""} font-bold text-[1rem] rounded-lg shadow-sm w-[7rem] max-w-[7rem] h-fit text-center`}>
                        <p className="leading-none">
                            {{
                                CANCELED: "Dibatalkan",
                                COMPLETED: "Selesai",
                                EXPIRED: "Kedaluwarsa",
                                IN_PROGRESS: "Sedang Berlangsung",
                                PENDING: "Ditunda",
                                SCHEDULED: "Terjadwal"
                            }[transaction.status]}
                        </p>
                    </div>
                </div>
            </div >
            {/* mid */}
            <div className="w-full flex flex-col md:flex-row md:items-center gap-y-2">
                {/* service information */}
                <div className="w-full flex items-center gap-x-7">
                    <div className="w-[70px] h-[85px] md:w-[100px] md:h-[120px] relative">
                        <Image src={transaction.items[0].product.assetRef || '/si.jpeg'} fill
                            sizes="(max-width: 100px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            alt={`Gambar layanan`}
                            className="rounded-md object-cover"
                            priority={true} />
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <div className="max-w-[25rem]">
                            <p className="w-[10rem] md:w-[12rem] lg:w-[25rem] leading-none font-bold text-gold-500 line-clamp-3">
                                {transaction.items[0].product.name}
                            </p>
                        </div>
                        <p className="leading-none text-sm">{rupiahFormatter(transaction.items[0].price)}</p>
                        <p className="leading-none">
                            {
                                transaction.items.length > 1 ? `+${transaction.items.length - 1} barang lainnya` : ''
                            }
                        </p>
                    </div>
                </div>
                {/* total price */}
                <div className="w-full flex md:flex-col items-center md:items-start justify-between md:justify-start gap-3">
                    <p className="leading-none">Total Harga</p>
                    <p className="leading-none font-bold text-lg">{rupiahFormatter(transaction.total_price)}</p>
                </div>
            </div >
            {/* bottom */}
            <div className="flex items-center justify-end">
                <Link href={`/transaction/${transaction._id}`} className="font-bold text-gold-500 text-lg">
                    Lihat Rincian
                </Link>
            </div>
        </div >
    )
}

export default TransactionItem;