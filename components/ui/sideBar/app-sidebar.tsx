"use client"
import { usePathname } from "next/navigation"
import { useChatStore } from "@/app/store/chatStore"

import {
    MessageSquare,
    CreditCard,
    Users,
    Settings,
    Search,
    Undo2,
    History,
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

} from "@/components/ui/sideBar/sidebar"
import Link from "next/link"

export function AppSidebar() {

    const pathname = usePathname()
    const isChatRoute = pathname === "/app/chat" || pathname.startsWith("/app/chat/")
    
    //"rooms" is object
    //Object.values() > A function that retrieves “only the values” of an object as an array

    // `sort()` is a method that sorts an array; writing `(a, b) => b.createdAt - a.createdAt` 
    // sorts the array in descending order by `createdAt`, meaning from newest to oldest.

    const rooms = useChatStore((state) => state.rooms)
    const roomList = Object.values(rooms).sort((a, b) => b.createdAt - a.createdAt)
    
    


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
                                <SidebarMenuButton 
                                asChild 
                                variant="billowSidebarBtn" 
                                isActive={isChatRoute}
                                >
                                    <Link href="/app/chat" ><MessageSquare /><span>Chat</span></Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            {isChatRoute && (
                                <div className="border-l border-white/20 ml-2 group-data-[collapsible=icon]:hidden">  
                                <p className="pl-4 text-white/40 flex gap-2 items-center">History<History className="w-4"/></p>                                  
                                <div className="custom-scroll max-h-56 overflow-y-auto">
                                    {roomList.map((room) => (
                                            <SidebarMenuItem key={room.id}>
                                                <SidebarMenuButton
                                                    asChild
                                                    variant="billowSidebarBtn"
                                                    isActive={pathname === `/app/chat/${room.id}`}
                                                    className="pl-8"
                                                >
                                                    <Link
                                                        href={`/app/chat/${room.id}`}
                                                        className="flex w-full min-w-0"
                                                    >
                                                        <span className="block truncate">{room.title}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                </div>
                                </div>
                            )}

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
