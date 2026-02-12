import React from 'react'

type Props ={
    params:{
        chatId: string
    }
    searchParams: { title?: string }
}

export default function ChatRoomPage({params, searchParams}: Props) {
    const title = searchParams.title ?? "New Chat"
    const { chatId } = params
  return (
    <div className='text-white'>
      <h1>{title}</h1>
      <p>RoomId:{chatId}</p>
    </div>
  )
}
