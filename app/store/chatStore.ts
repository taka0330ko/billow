import { create } from "zustand";
import { persist } from "zustand/middleware";

type Message = {
    id: string
    role: "user" | "assistant"
    content: string
    createdAt : number
}

type Room = {
    id:string
    title: string
    createdAt : number
    messages: Message[]
}

type ChatStore = {
    rooms: Record<string, Room>
    createRoom: (initialMessage: string) => string
    addMessage: (roomId: string, role: "user" | "assistant", content:string) => void
}

export const useChatStore = create<ChatStore>()(
    persist(
        (set, get) => ({
            rooms: {},
 
            createRoom: (initialMessage: string) =>{
                const id = crypto.randomUUID();

                const newRoom: Room = {
                    id,
                    title: initialMessage.slice(0, 20) || "New Chat",
                    createdAt: Date.now(),
                    messages:[
                        {
                          id: crypto.randomUUID(),
                          role: "user",
                          content: initialMessage,
                          createdAt: Date.now(),
                        },
                    ],
                }

                set((state) => ({
                    rooms: {
                        ...state.rooms,
                        [id]: newRoom,
                    },
                }))
                return id
            },
            addMessage:(roomId, role, content) =>{
                const room = get().rooms[roomId]
                if(!room) return

                const newMessage: Message ={
                             id: crypto.randomUUID(),
          role,
          content,
          createdAt: Date.now(),
                }

                set((state) => ({
                    rooms: {
                        ...state.rooms,
                        [roomId]: {
                            ...room,
                            messages:[...room.messages, newMessage],
                        },
                    },
                }))
            },
        }),
    {
      name: "billow-chat-storage",
    }
    )
)