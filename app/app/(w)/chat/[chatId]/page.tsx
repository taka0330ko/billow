"use client"
import { useParams } from "next/navigation"
import { useChatStore } from "@/app/store/chatStore"
import { useEffect, useRef } from "react"
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
  const addMessage = useChatStore((state)=> state.addMessage);
  const refFirstRef = useRef<boolean>(true);

  const params = useParams()
  const chatId = params.chatId as string

  //aiが準備完了か確認する関数をuseEffect内に書く。[]で最初だけ。
  useEffect(() => {
    const interval = window.setInterval(() => {
      const chatFn = window?.puter?.ai?.chat
      if (typeof chatFn !== "function") return
      window.clearInterval(interval)
    }, 300)

    return () => window.clearInterval(interval)
  }, [])

// Zustand のストアから「特定のチャットルーム」を取り出している
// ex) rooms = {
//   "abc123": {
//     title: "My chat",
//     messages: [...]
//   },
//   "xyz999": {
//     title: "Another chat",
//     messages: [...]
//   }
// }

//　=> room.title や　room.messages が使える
  const room = useChatStore((state)=>
  state.rooms[chatId])


//strict modeで2回レンダーされるのでuseRefでガード
//useRef は 再レンダーしても値が保持される変数
// NOTE:useRef 依存の設計なので改善すべき
useEffect(()=>{
  if (!room) return; 
  if(room.messages.length > 1) return;
   
    if (refFirstRef.current) {
      refFirstRef.current = false;
      return;
    }
  
//最初のAIからのレスポンス。最初のチャットページのメッセージ（一番目）を取得
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

  const handleSubmit = async (message: string) =>{
    addMessage(chatId, "user", message)


    //AIのレスポンスをunknown に落とす
    const chatUnknown: unknown = window?.puter?.ai?.chat
    if (typeof chatUnknown !== "function") {
      console.warn("[puter] ai.chat not ready")
      return
    }
    const chat = chatUnknown as (prompt: string) => Promise<unknown>
    
    const res = await chat(message)
    const aiText = extractAiText(res)

    addMessage(chatId, "assistant", aiText)
  }
  
  

  return (
    <div className="flex flex-col p-8 text-white h-full">
      <h1 className="text-2xl mb-4">{room.title}</h1>

        <div className="flex flex-col min-h-0 flex-1 relative">
          <ScrollableChat messages ={room.messages}/>
          <ChatRoomInput handleSubmit={handleSubmit}/>
        </div>

    </div>
  )
}