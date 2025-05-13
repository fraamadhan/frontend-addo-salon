import Footer from "@/app/components-local/ui/footer/footer";
import Header from "@/app/components-local/ui/header/header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen w-full">
            <Header />
            <div className="flex-grow overflow-y-auto">{children}</div>
            <Footer />
        </div>
    )
}   