import SideNavbar from "@/app/components-local/ui/sidebar/side-navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex p-7 md:p-0 flex-col lg:flex-row w-full min-h-screen relative gap-y-5 gap-x-3">
            <SideNavbar />
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}