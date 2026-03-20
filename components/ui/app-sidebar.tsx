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
    //Forcibly adjust the sidebar height slightly
        <Sidebar
            collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="active:bg-transparent">
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
                                <SidebarMenuButton asChild variant="billowSidebarBtn" isActive={pathname === "/app/chat"}
                                >
                                    <Link href="/app/chat" ><MessageSquare /><span>Chat</span></Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild variant="billowSidebarBtn" isActive={pathname === "/app/subscriptions"}>
                                    <Link href="/app/subscriptions"><CreditCard /><span>Subscriptions</span></Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild variant="billowSidebarBtn" isActive={pathname === "/app/members"}>
                                    <Link href="/app/members" ><Users /><span>Members</span></Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild variant="billowSidebarBtn" isActive={pathname === "/app/settings"}>
                                    <Link href="/app/settings"><Settings /><span>Setting</span></Link>
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