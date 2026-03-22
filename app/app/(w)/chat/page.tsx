"use client"
import { Button } from "@/components/ui/globalUI/button"
import { useChatStore } from "@/app/store/chatStore"

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/globalUI/card"

import { Input } from "@/components/ui/globalUI/input"

import {
    CreditCard,
    Users,
    CircleCheck,
    FileText,
    ArrowUp,
} from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"


export default function ChatStartPage() {

    const router = useRouter()
    const [inputValue, setInputValue] = useState("");
    
    const createRoom = useChatStore((state) => state.createRoom)

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) =>{
        e.preventDefault();

        const message = inputValue.trim()
        if(!message) return;

        const roomId = createRoom(message)

        router.push(`/app/chat/${roomId}`)
        setInputValue("");
    }

    const quickActionSubmit = (value: string) => {
        const message = value.trim();
        if(!message) return;

        const roomId = createRoom(message);
        router.push(`/app/chat/${roomId}`)

    }

    return (

        <div className="flex min-h-full flex-col items-center justify-center px-6 py-10 bg-workspace">
            <div className="flex p-6 items-end justify-between w-full max-w-160">
                <h1 className="text-gray-300 text-4xl">Hi, Alex</h1>
                <p className="text-gray-300">Burst creative group</p>
            </div>
            <Card className="w-full max-w-160 mx-auto">
                <CardHeader className="w-full">
                    <CardTitle><p className="text-lg font-light text-gray-400">Quick Action</p></CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 gap-4">
                        <Button 
                        variant="quickActionBtn" 
                        className="py-14 cursor-pointer"
                        onClick={()=> quickActionSubmit("Monthly spend")}><CircleCheck />Monthly spend</Button>
                        <Button 
                         variant="quickActionBtn" 
                         className="py-14 cursor-pointer"
                         onClick={()=> quickActionSubmit("Add new member")}><Users />Add new member</Button>
                        <Button 
                        variant="quickActionBtn" 
                        className="py-14 cursor-pointer"
                        onClick={()=> quickActionSubmit("My subscription")}><CreditCard />My subscription</Button>
                        <Button 
                         variant="quickActionBtn" 
                         className="py-14 cursor-pointer"
                         onClick={()=> quickActionSubmit("Generate report")}><FileText />Generate report</Button>
                    </div>
                    <div className="mt-6">
                        <div className="relative w-full">
                            <form onSubmit={handleSubmit}  autoComplete="off">
                                <Input
                                    id="chat-start-input"
                                    placeholder="Ask billow anything..."
                                    className="h-14 w-full rounded-full  bg-gray-200/90 pl-6 pr-16 text-secondary placeholder:text-placeholder focus-visible:ring-0 focus-visible:border-transparent"
                                    value={inputValue}
                                    onChange={(e)=>setInputValue(e.target.value)}
                                />
                                <Button
                                    type="submit"
                                    aria-label="Send"
                                    className="absolute right-2 top-1/2 h-10 w-15 -translate-y-1/2 rounded-full bg-white/70 p-0 text-gray-900 hover:bg-white"
                                >
                                    <ArrowUp className="h-5 w-5" />
                                </Button>
                            </form>
                        </div>

                        <p className="mt-3 text-center text-sm text-gray-400">
                            Drag &amp; drop items anywhere on the page.
                        </p>
                    </div>
                </CardContent>

            </Card>
        </div>
    )
}
