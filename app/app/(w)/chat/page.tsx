"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"

import {
    CreditCard,
    Users,
    CircleCheck,
    FileText,
    ArrowUp,
} from "lucide-react"


// import { useRouter } from 'next/router'
// import React, { useState } from 'react'

// function createThreadId() {
//     crypto.randomUUID()
// }
export default function ChatStartPage() {
    // const router = useRouter();
    // const [text, setText] = useState("");


    return (
        <div className='flex flex-col mt-24 items-center h-svh'>
            <div className="flex p-6 items-end justify-between w-full max-w-160">
                <h1 className="text-gray-300 text-4xl">Hi, Alex</h1>
                <p className="text-gray-300">Burst creative group</p>
            </div>
            <Card className="w-full max-w-160 mx-auto">
                <CardHeader className="w-full">
                    <CardTitle><p className="text-lg font-light text-gray-400">Quick Action</p></CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-evenly gap-2 w-full">
                        <Button variant="quickActionBtn" className="py-14"><CircleCheck />Monthly spend</Button>
                        <Button variant="quickActionBtn" className="py-14"><Users />Add new member</Button>
                        <Button variant="quickActionBtn" className="py-14"><CreditCard />My subscription</Button>
                        <Button variant="quickActionBtn" className="py-14"><FileText />Generate report</Button>
                    </div>
                    <div className="mt-6">
                        <div className="relative w-full">
                            <Input
                                id="chat-start-input"
                                placeholder="Ask billow anything..."
                                className="h-14 w-full rounded-full  bg-gray-200/90 pl-6 pr-16 text-secondary placeholder:text-placeholder focus-visible:ring-0 focus-visible:border-transparent"
                            />

                            <Button
                                type="button"
                                aria-label="Send"
                                className="absolute right-2 top-1/2 h-10 w-15 -translate-y-1/2 rounded-full bg-white/70 p-0 text-gray-900 hover:bg-white"
                            >
                                <ArrowUp className="h-5 w-5" />
                            </Button>
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
