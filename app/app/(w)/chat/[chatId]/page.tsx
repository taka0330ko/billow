"use client"

import { useParams } from "next/navigation";
import { useChatStore } from "@/app/store/chatStore";
import ScrollableChat from "@/components/ui/chatPage/ScrollableChat";
import ChatRoomInput from "@/components/ui/chatPage/ChatRoomInput";


import { useChatRoomController } from "@/hooks/useChatRoomController";


export default function ChatRoomPage() {

  const params = useParams()
  const chatId = params.chatId as string

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
  const room = useChatStore((state) =>
    state.rooms[chatId])

  const { isAiThinking, handleSubmit } = useChatRoomController({
    chatId,
    room
  })


  if (!room) {
    return <div className="p-10 text-primary-text">Room not found</div>
  }


  return (
    <div className="flex flex-col p-8 text-primary-text h-full">
      <h1 className="text-2xl mb-4">{room.title}</h1>

      <div className="flex flex-col min-h-0 flex-1 relative">
        <ScrollableChat messages={room.messages} isAiThinking={isAiThinking} />
        <ChatRoomInput handleSubmit={handleSubmit} />
      </div>

    </div>
  )
}
