"use client"
import { useParams } from "next/navigation"
import { useChatStore } from "@/app/store/chatStore"
import { Input } from "@/components/ui/input"
import { useEffect, useRef, useState } from "react"
import ScrollableChat from "@/components/ScrollableChat"
import ChatRoomInput from "@/components/ui/ChatRoomInput"

//何が返ってきても、とにかく最終的に string にして返す安全フィルター
function extractAiText(res: unknown): string {
  if (typeof res === "string") return res

  if (
    typeof res === "object" &&
    res !== null &&
    "message" in res
  ) {
    const message = (res as { message?: unknown }).message

    if (
      typeof message === "object" &&
      message !== null &&
      "content" in message
    ) {
      const content = (message as { content?: unknown }).content
      if (typeof content === "string") {
        return content
      }
    }
  }

  return ""
}

export default function ChatRoomPage() {
  const [inputValue, setInputValue] = useState("");
  const addMessage = useChatStore((state)=> state.addMessage);
  const refFirstRef = useRef<boolean>(true);

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


useEffect(()=>{
  if (!room) return; 
  if(room.messages.length > 1) return;
   
    if (refFirstRef.current) {
      refFirstRef.current = false;
      return;
    }
  
  const initialAiRes = async() =>{
    
      const firstMessage = room.messages[0]?.content ?? ""

      const chatUnknown: unknown = window?.puter?.ai?.chat
      if (typeof chatUnknown !== "function") return

      const chat = chatUnknown as (prompt: string) => Promise<unknown>
      const res = await chat(firstMessage)
      const aiText = extractAiText(res)
    
    addMessage(chatId, "assistant", aiText)
  }
  initialAiRes();
  },[room, chatId, addMessage])

  if (!room) {
    return <div className="p-10 text-white">Room not found</div>
  }

  const handleSubmit = async (e:React.SyntheticEvent<HTMLFormElement>) =>{
    e.preventDefault();

    const userMessage = inputValue.trim();
    if(!userMessage) return;
    setInputValue("");
    addMessage(chatId, "user", userMessage)

    const chatUnknown: unknown = window?.puter?.ai?.chat
    if (typeof chatUnknown !== "function") {
      console.warn("[puter] ai.chat not ready")
      return
    }

    const chat = chatUnknown as (prompt: string) => Promise<unknown>
    const res = await chat(userMessage)
    const aiText = extractAiText(res)

    addMessage(chatId, "assistant", aiText)
    
  }
  
  

  return (
    <div className="p-10 text-white h-full w-full">
        <h1 className="text-2xl mb-4">{room.title}</h1>
        <ScrollableChat messages ={room.messages}/>
      <div className="flex flex-col justify-between h-auto">
        <ChatRoomInput/>
        <form onSubmit={handleSubmit}>
          <Input
            id="chat-room-input"
            placeholder="Ask billow anything..."
            className="h-14 mb-8 w-full rounded-full  bg-gray-200/90 pl-6 pr-16 text-secondary placeholder:text-placeholder focus-visible:ring-0 focus-visible:border-transparent"
            value={inputValue}
            onChange={(e)=>setInputValue(e.target.value)}
          />
        </form>
      </div>
    </div>
  )
}