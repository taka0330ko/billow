import { callAi } from "@/lib/ai/callAi";
import { LocalChatMessage } from "@/lib/ai/types";
import { useChatStore } from "@/app/store/chatStore";
import { useEffect, useRef, useState } from "react";

type Props = {
    chatId: string
    room: {
        messages: {
            role: "user" | "assistant";
            content: string;
        }[]
    } | undefined
}

export function useChatRoomController({chatId, room}:Props) {
    const addMessage = useChatStore((state) => state.addMessage)

    const [isAiThinking, setIsAiThinking] = useState(false);
    const [isAiReady, setIsAiReady] = useState(false);

    const hasRequestedInitialResponseRef = useRef(false);

    //Check AI Ready
    useEffect(()=> {
        const interval = window.setInterval(()=>{
            const chatFn = window?.puter?.ai?.chat
            if (typeof chatFn !== "function") return
            setIsAiReady(true)
            window.clearInterval(interval)
        }, 300)
        return () => window.clearInterval(interval)
    }, [])

    useEffect(()=> {
        if(!room) return
        if(!isAiReady) return
        if(room.messages.length > 1) return
        if (hasRequestedInitialResponseRef.current === true) return;

        hasRequestedInitialResponseRef.current = true

        const initialAiRes = async () => {
            setIsAiThinking(true)
            try{
                const aiText = await callAi(room.messages)
                if(aiText) {
                    addMessage(chatId, "assistant", aiText)
                }
            } catch (error) {
                console.error("[puter] initial chat failed", error)
            } finally {
                setIsAiThinking(false)
            }
        }
        initialAiRes()
    }, [room, chatId, addMessage, isAiReady])

    // Submit handler
  const handleSubmit = async (message: string) => {
    if (!room) return

    addMessage(chatId, "user", message)

    const historyWithNewMessage: LocalChatMessage[] = [
      ...room.messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
      { role: "user", content: message },
    ]

    setIsAiThinking(true)

    try {
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

  return {
    isAiThinking,
    handleSubmit,
  }
}