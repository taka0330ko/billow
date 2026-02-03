"use client"
import { usePathname } from "next/navigation"

import {
    MessageSquare,
    CreditCard,
    Users,
    Settings,
    Search,
    Undo2
} from "lucide-react"

import {
    Sidebar,
    SidebarHeader,
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

    const pathname = usePathname()

    return (
        <Sidebar
            className="
    !top-[var(--header-h)]
    !h-[calc(100svh-var(--header-h))]
  "
            collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="w-auto active:bg-transparent">
                            <div className="text-gray-400 hover:text-white hover:bg-transparent"><Search /><span>Search</span></div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className="w-auto  active:bg-transparent data-[active=true]:bg-transparent data-[active=true]:text-primary" isActive={pathname === "/app/chat"}
                                >
                                    <Link href="/app/chat" className="text-gray-400 hover:text-white hover:bg-transparent" ><MessageSquare /><span>Chat</span></Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className=" w-auto active:bg-transparent  data-[active=true]:bg-transparent data-[active=true]:text-primary" isActive={pathname === "/app/subscriptions"}>
                                    <Link href="/app/subscriptions" className="text-gray-400 hover:text-white hover:bg-transparent"><CreditCard /><span>Subscriptions</span></Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className=" w-auto  active:bg-transparent data-[active=true]:bg-transparent data-[active=true]:text-primary" isActive={pathname === "/app/members"}>
                                    <Link href="/app/members" className="text-gray-400 hover:text-white hover:bg-transparent"><Users /><span>Members</span></Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className=" w-auto active:bg-transparent data-[active=true]:bg-transparent data-[active=true]:text-primary" isActive={pathname === "/app/settings"}>
                                    <Link href="/app/settings" className="text-gray-400 hover:text-white hover:bg-transparent"><Settings /><span>Setting</span></Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="w-auto 
    active:bg-transparent
">
                            <Link href="/" className="text-gray-400 hover:text-white hover:bg-transparent"><Undo2 /><span>Back to Home</span></Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar >
    )
}