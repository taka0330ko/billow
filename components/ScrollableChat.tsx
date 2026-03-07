import { useEffect, useRef } from "react";

type ChatMessage = {
    id: string;
    role: "user" | "assistant";
    content: string
}

type ScrollableChatProps = {
    messages: ChatMessage[]
    isAiThinking: boolean
}
function ScrollableChat({messages, isAiThinking}:ScrollableChatProps) {
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = ():void =>{
    messageEndRef.current?.scrollIntoView({
      behavior: "smooth"
    })
  }

  useEffect(()=>{
    scrollToBottom();
  },[messages])


  return (
      <div className="text-container flex-1 overflow-y-auto">
            <div className="max-h-30">
              {messages.map((msg) => (
                <div
                key={msg.id}
                className={`flex p-4 ${msg.role == "user" ? "justify-end" : "justify-start"}`}>
                  <p key={msg.id}
                  className={`mb-2
                  ${msg.role == "user"
                    ? "bg-white rounded-lg rounded-br-[1px] px-2 py-1 text-gray-900"
                  : "mb-16"}`}>
                     {msg.content}
                  </p>
                </div>
              ))}
                            {isAiThinking && (
                <div className="flex p-4 justify-start">
                  <p className="mb-2 text-sm text-gray-400">Thinking...</p>
                </div>
              )}
                        <div ref={messageEndRef}></div>
            </div>
        </div>
  )
}

export default ScrollableChat
