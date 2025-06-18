import { TransactionItem, TransactionListItem } from "@/app/types/transaction-type";
import { dateFormatter } from "@/lib/date-formatter";
import { rupiahFormatter } from "@/lib/rupiah-formatter";
import Image from "next/image";
import Link from "next/link";

const TableItemTransaction = (
  { transaction }: { transaction: TransactionListItem }
) => {
  return (
    <table className="min-w-full table-auto border-separate border-spacing-y-2">
      <thead className="text-center bg-gray-100">
        <tr>
          <th className="p-3">Layanan</th>
          <th className="p-3">Harga</th>
          <th className="p-3">Jadwal</th>
          <th className="p-3">Status Layanan</th>
          <th className="p-3">Pegawai</th>
        </tr>
      </thead>
      <tbody>
        {
          transaction?.items?.length === 0 && (
            <tr>
              <td colSpan={4}>
                <div className="flex items-center justify-center w-full min-h-[20rem]">
                  <p className="text-gray-400 text-center text-lg">Tidak ada data pembayaran</p>
                </div>
              </td>
            </tr>
          )
        }
        {
          transaction && transaction.items.map((item: TransactionItem, idx: number) => (
            <tr className="bg-white shadow-sm rounded-xl" key={`${item._id} - ${idx}`}>
              <td className="p-3 w-[20rem]">
                <div className="flex items-center gap-x-3">
                  <div className="w-[60px] h-[72px] relative rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={item.product.assetRef || '/si.svg'}
                      fill
                      sizes="60px"
                      className="object-cover rounded-xl"
                      alt="Layanan addo salon"
                    />
                  </div>
                  <div className="flex flex-col items-start justify-center gap-y-2 min-w-0">
                    <p className="line-clamp-2 font-medium text-gray-800 leading-none">
                      {item.product.name}
                    </p>
                    <Link href={`/service/${item.product.name.split(' ').join('-')}/${item.product._id}`} className=" text-gold-500 font-bold">
                      Lihat layanan
                    </Link>
                  </div>
                </div>
              </td>
              <td className="p-3 text-center w-[10rem] whitespace-nowrap">{rupiahFormatter(item.price)}</td>
              <td className="p-3 text-center w-[12rem] whitespace-nowrap">{dateFormatter(item.reservationDate)}</td>
              <td className="p-3 text-center w-[12rem] whitespace-nowrap">
                {{
                  CANCELED: "Dibatalkan",
                  COMPLETED: "Selesai",
                  EXPIRED: "Kedaluwarsa",
                  PAID: "Sudah dibayar",
                  IN_PROGRESS: "Sedang Berlangsung",
                  PENDING: "Ditunda",
                  SCHEDULED: "Terjadwal"
                }[item?.serviceStatus as string]}
              </td>
              <td className="p-3 text-center w-[8rem] whitespace-nowrap">{item?.employeeId?.name || "Belum ditentukan"}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default TableItemTransaction;