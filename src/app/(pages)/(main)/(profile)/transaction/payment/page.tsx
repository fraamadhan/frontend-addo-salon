import PaymentList from "@/app/components-local/ui/dashboard/payment/payment-list";
import SortSearch from "@/app/components-local/ui/dashboard/payment/sort-search";
import { PaymentListSkeleton } from "@/app/components-local/ui/skeleton";
import { ParamsPaymentList } from "@/app/types/query-params";
import { Suspense } from "react";

const PaymentListPage = async (props: {
    searchParams?: Promise<ParamsPaymentList>;
}) => {
    const params = await props.searchParams;
    const keyword = params?.keyword || "";
    const paymentStatus = params?.paymentStatus || "";
    const page = params?.page || "1";

    return (
        <main className="w-full flex flex-col min-h-screen p-8">
            <SortSearch />
            <Suspense fallback={<PaymentListSkeleton />}>
                <PaymentList keyword={keyword} paymentStatus={paymentStatus} page={page} />
            </Suspense>
        </main>
    )
}

export default PaymentListPage;