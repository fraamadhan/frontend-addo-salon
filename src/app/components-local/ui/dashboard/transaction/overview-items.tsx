import { TransactionListItem } from "@/app/types/transaction-type";
import TableItemTransaction from "./table/table-item-transaction";

const OverviewItem = (
    { transaction }: { transaction: TransactionListItem }
) => {
    return (
        <section className="w-full space-y-3 p-7 border shadow-lg rounded-xl">
            <div className="font-bold text-xl">Ringkasan Pesanan</div>
            <div className="w-full overflow-x-scroll md:overflow-auto mt-3">
                <TableItemTransaction transaction={transaction} />
            </div>
        </section>
    )
}

export default OverviewItem;
