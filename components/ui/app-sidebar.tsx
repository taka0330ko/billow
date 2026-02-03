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
                                <SidebarMenuButton asChild className="w-auto  active:bg-transparent data-[active=true]:bg-transparent data-[active=true]:text-primary" isActive={pathname === "/app/w/chat"}
                                >
                                    <Link href="/app/w/chat" className="text-gray-400 hover:text-white hover:bg-transparent" ><MessageSquare /><span>Chat</span></Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className=" w-auto active:bg-transparent  data-[active=true]:bg-transparent data-[active=true]:text-primary" isActive={pathname === "/app/w/subscriptions"}>
                                    <Link href="/app/w/subscriptions" className="text-gray-400 hover:text-white hover:bg-transparent"><CreditCard /><span>Subscriptions</span></Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className=" w-auto  active:bg-transparent data-[active=true]:bg-transparent data-[active=true]:text-primary" isActive={pathname === "/app/w/members"}>
                                    <Link href="/app/w/members" className="text-gray-400 hover:text-white hover:bg-transparent"><Users /><span>Members</span></Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className=" w-auto active:bg-transparent data-[active=true]:bg-transparent data-[active=true]:text-primary" isActive={pathname === "/app/w/settings"}>
                                    <Link href="/app/w/settings" className="text-gray-400 hover:text-white hover:bg-transparent"><Settings /><span>Setting</span></Link>
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