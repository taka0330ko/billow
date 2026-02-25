"use client"
import { useParams } from "next/navigation"
import { useChatStore } from "@/app/store/chatStore"

export default function ChatRoomPage() {
  const params = useParams()
  const chatId = params.chatId as string

  const room = useChatStore((state)=>
  state.rooms[chatId])

  if (!room) {
    return <div className="p-10 text-white">Room not found</div>
  }

  return (
    <div className="p-10 text-white">
      <h1 className="text-2xl mb-4">{room.title}</h1>

      {room.messages.map((msg) => (
        <div key={msg.id} className="mb-2">
          <strong>{msg.role}:</strong> {msg.content}
        </div>
      ))}
    </div>
  )
}