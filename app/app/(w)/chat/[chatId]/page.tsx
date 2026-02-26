"use client"
import { useParams } from "next/navigation"
import { useChatStore } from "@/app/store/chatStore"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

export default function ChatRoomPage() {
  const [inputValue, setInputValue] = useState("");
  const addMessage = useChatStore((state)=> state.addMessage)

  const params = useParams()
  const chatId = params.chatId as string

  useEffect(() => {
    const interval = window.setInterval(() => {
      const chatFn = window?.puter?.ai?.chat
      if (typeof chatFn !== "function") return

      console.log("[puter] ai.chat ready")
      window.clearInterval(interval)
    }, 300)

    return () => window.clearInterval(interval)
  }, [])

  const room = useChatStore((state)=>
  state.rooms[chatId])

  if (!room) {
    return <div className="p-10 text-white">Room not found</div>
  }

  const handleSubmit = (e:React.SyntheticEvent<HTMLFormElement>) =>{
    e.preventDefault();

    const userMessage = inputValue.trim();
    if(!userMessage) return;
    setInputValue("");

    addMessage(chatId, "user", userMessage)
  }
  
  

  return (
    <div className="p-10 text-white">
      
        <h1 className="text-2xl mb-4">{room.title}</h1>
        <div className="flex flex-col justify-between">
        <div className="text-container h-100">
          {room.messages.map((msg) => (
            <div key={msg.id} className="mb-2">
              <strong>{msg.role}:</strong> {msg.content}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            id="chat-room-input"
            placeholder="Ask billow anything..."
            className="h-14 w-full rounded-full  bg-gray-200/90 pl-6 pr-16 text-secondary placeholder:text-placeholder focus-visible:ring-0 focus-visible:border-transparent"
            value={inputValue}
            onChange={(e)=>setInputValue(e.target.value)}
          />
        </form>
      </div>
    </div>
  )
}