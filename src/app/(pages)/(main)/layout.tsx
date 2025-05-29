import Footer from "@/app/components-local/ui/footer/footer";
import Header from "@/app/components-local/ui/header/header";
import { Toaster } from "sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen w-full">
            <Header />
            <Toaster position="top-center" richColors toastOptions={{
                duration: 3000,
                className: "bg-red-500 text-white"
            }} />
            <div className="flex-grow overflow-y-auto">{children}</div>
            <Footer />
        </div>
    )
}   