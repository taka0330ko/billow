import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import Header from "@/components/header";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Script from "next/script";


export default function WorkSpaceLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex h-svh w-full flex-col bg-background overflow-hidden overscroll-none">
                <Header />
                <div className="flex flex-1">
                    <AppSidebar />

                    <SidebarInset className="
          flex min-h-svh flex-col bg-background
          pt-(--header-h)
        ">
                        <SidebarTrigger />
                        {children}
                    </SidebarInset>
                </div>
            </div>
            <Script
              src="https://js.puter.com/v2/"
              strategy="afterInteractive"
            />
        </SidebarProvider>
    );
}