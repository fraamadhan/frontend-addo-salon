import SortSearch from "@/app/components-local/ui/dashboard/transaction/sort-search";
import TransactionList from "@/app/components-local/ui/dashboard/transaction/transaction-list";
import { ParamsPaymentList } from "@/app/types/query-params";

const TransactionPage = async (props: {
    searchParams?: Promise<ParamsPaymentList>;
}) => {

    const params = await props.searchParams;
    const keyword = params?.keyword || "";
    const paymentStatus = params?.paymentStatus || "";
    const page = params?.page || "1";
    return (
        <main className="w-full flex flex-col min-h-screen p-1 md:p-8">
            <SortSearch />
            <TransactionList keyword={keyword} paymentStatus={paymentStatus} page={page} />
        </main>
    )
}

export default TransactionPage;
