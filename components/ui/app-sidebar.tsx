import {
    MessageSquare,
    CreditCard,
    Users,
    Settings,
    Search,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

export function AppSidebar() {
    return (
        <Sidebar
            className="
    !top-[var(--header-h)]
    !h-[calc(100svh-var(--header-h))]
  ">
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild className="mx-4 w-auto">
                                <Link href="/app/w/chat" className="text-gray-50"><Search /><span>Search</span></Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild className="mx-4 w-auto">
                                <Link href="/app/w/chat" className="text-gray-50"><MessageSquare /><span>Chat</span></Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild className="mx-4 w-auto">
                                <Link href="/app/w/chat" className="text-gray-50"><CreditCard /><span>Subscription</span></Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild className="mx-4 w-auto">
                                <Link href="/app/w/chat" className="text-gray-50"><Users /><span>Members</span></Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild className="mx-4 w-auto">
                                <Link href="/app/w/chat" className="text-gray-50"><Settings /><span>Setting</span></Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        {/* History items will go here */}
                    </SidebarMenu>
                </SidebarGroupContent>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}