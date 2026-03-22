import Image from "next/image";
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
                className={`flex items-start p-4 ${msg.role == "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role === "assistant" && (
                    <Image
                      src={'/images/billow-ai-icon.png'}
                      alt=""
                      aria-hidden="true"
                      height={24}
                      width={24}
                      className="mr-2 shrink-0 pointer-events-none select-none"
                    />
                  )}
                  <p
                  className={`mb-2
                  ${msg.role == "user"
                    ? "bg-white rounded-lg rounded-br-[1px] px-2 py-1 text-gray-900"
                  : "mb-16"}`}>
                     {msg.content}
                  </p>
                </div>
              ))}
                            {isAiThinking && (
                <div className="flex p-4 justify-start items-center">
                    <Image
                      src={'/images/billow-ai-icon.png'}
                      alt=""
                      aria-hidden="true"
                      height={28}
                      width={28}
                      className="mr-2 shrink-0 pointer-events-none select-none
                      animate-[bubbleScale_1.4s_ease-in-out_infinite]"
                    />
                    <p className="text-gray-400 text-sm">Thinking...</p>
                </div>
              )}
                        <div ref={messageEndRef}></div>
            </div>
            <style jsx>{`
            @keyframes bubbleScale {
            0%{transform: scale(1);}
            50%{transform: scale(1.2);}
            1000%{transform: scale(1);}
            }
            `}
            </style>
        </div>
  )
}

export default ScrollableChat
