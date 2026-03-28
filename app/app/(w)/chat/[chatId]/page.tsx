"use client"

import { useParams } from "next/navigation";
import { useChatStore } from "@/app/store/chatStore";
import { useEffect, useRef, useState } from "react";
import ScrollableChat from "@/components/ui/chatPage/ScrollableChat";
import ChatRoomInput from "@/components/ui/chatPage/ChatRoomInput";
import { LocalChatMessage } from "@/lib/ai/types";
import { callAi } from "@/lib/ai/callAi";


export default function ChatRoomPage() {
  const addMessage = useChatStore((state)=> state.addMessage);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [isAiReady, setIsAiReady] = useState(false);
  const hasRequestedInitialResponseRef = useRef(false);

  const params = useParams()
  const chatId = params.chatId as string

  //aiが準備完了か確認する関数をuseEffect内に書く。[]で最初だけ。
  useEffect(() => {
    const interval = window.setInterval(() => {
      const chatFn = window?.puter?.ai?.chat
      if (typeof chatFn !== "function") return
      setIsAiReady(true)
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


useEffect(()=>{
  if (!room) return;
  if (!isAiReady) return;
  if (room.messages.length > 1) return;
  if (hasRequestedInitialResponseRef.current) return;

  // strict modeで2回レンダーされるのでuseRefでガード
  // useRef は 再レンダーしても値が保持される変数
  // NOTE: この実装は dev の二重実行を前提にしており、
  // 本番では初回AIレスポンスをスキップしてしまうので無効化している
  //
  // if (refFirstRef.current) {
  //   refFirstRef.current = false;
  //   return;
  // }
  hasRequestedInitialResponseRef.current = true;
  
//最初のAIからのレスポンス。最初のチャットページのメッセージ（一番目）を取得
  const initialAiRes = async() =>{
     setIsAiThinking(true);
      try{
      const aiText = await callAi(room.messages)
      if (aiText) {
        addMessage(chatId, "assistant", aiText)
      }
      } catch (error){
        console.error("[puter] initial chat failed", error)
      } finally {
        setIsAiThinking(false)
      }
  }
  initialAiRes();
  },[room, chatId, addMessage, isAiReady])

  if (!room) {
    return <div className="p-10 text-primary-text">Room not found</div>
  }

  const handleSubmit = async (message: string) =>{
    addMessage(chatId, "user", message)
    const historyWithNewMessage: LocalChatMessage[] = [
      ...room.messages.map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: message },
    ]
    setIsAiThinking(true)
    try{
    const aiText = await callAi(historyWithNewMessage)
    if (aiText) {
      addMessage(chatId, "assistant", aiText)
    }
    } catch (error) {
      console.error("[puter] chat failed", error)
    } finally {
   setIsAiThinking(false)
    }
  }

  return (
    <div className="flex flex-col p-8 text-primary-text h-full">
      <h1 className="text-2xl mb-4">{room.title}</h1>

        <div className="flex flex-col min-h-0 flex-1 relative">
          <ScrollableChat messages ={room.messages} isAiThinking={isAiThinking}/>
          <ChatRoomInput handleSubmit={handleSubmit}/>
        </div>

    </div>
  )
}
