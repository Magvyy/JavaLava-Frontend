import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NavBar } from "@/features/navbar";
import { AppSideBar } from "@/features/sidebar";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider defaultOpen>
            <AppSideBar />
            <main className="flex flex-col flex-1 overflow-auto">
                <NavBar />
                {children}
            </main>
        </SidebarProvider>
    )
}