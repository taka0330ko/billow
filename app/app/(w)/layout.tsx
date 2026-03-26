import { AppSidebar } from "@/components/ui/sideBar/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sideBar/sidebar";
import Header from "@/components/ui/globalUI/header";
import { SidebarTrigger } from "@/components/ui/sideBar/sidebar";
import Script from "next/script";


export default function WorkSpaceLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="grid min-h-svh grid-rows-[64px_1fr] overflow-hidden  w-full">
                <Header className="fixed w-full z-5"/>
                <div className="flex min-h-0">
                    <AppSidebar />

                    <SidebarInset className="
                            flex flex-col min-h-0
                            ">
                        <div className="relative flex-1 overflow-auto">
                            <SidebarTrigger className="cursor-pointer hover:bg-active fixed"/>
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