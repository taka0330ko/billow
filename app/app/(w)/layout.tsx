import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import Header from "@/components/header";
import { SidebarTrigger } from "@/components/ui/sidebar";


export default function WorkSpaceLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex h-svh w-full flex-col bg-background overflow-hidden overscroll-none">
                <Header />
                <div className="flex flex-1">
                    <AppSidebar />

                    <SidebarInset className="
          flex min-h-svh flex-col bg-background
          pt-[var(--header-h)]
        ">
                        <SidebarTrigger />
                        <main>{children}</main>
                    </SidebarInset>
                </div>
            </div>
        </SidebarProvider>
    );
}