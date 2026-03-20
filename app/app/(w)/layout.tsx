import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import Header from "@/components/header";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Script from "next/script";


export default function WorkSpaceLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="grid min-h-svh grid-rows-[64px_1fr] bg-background overflow-hidden overscroll-none w-full">
                <Header />
                <div className="flex min-h-0">
                    <AppSidebar />

                    <SidebarInset className="
                            flex flex-col bg-background min-h-0
                            ">
                        <div className="relative flex-1 overflow-auto">
                            <SidebarTrigger/>
                            {children}
                        </div>
                    </SidebarInset>
                </div>
            </div>

        {/* puter.js読み込み */}
            <Script
              src="https://js.puter.com/v2/"
              strategy="afterInteractive"
            />
        </SidebarProvider>
    );
}