
type ChatMessage = {
    id: string;
    role: "user" | "assistant";
    content: string
}

type ScrollableChatProps = {
    messages: ChatMessage[]
}
function ScrollableChat({messages}:ScrollableChatProps) {
  return (
      <div className="text-container h-100">
          {messages.map((msg ,index) => (
            <div 
            key={index}
            className={`flex ${msg.role == "user" ? "justify-end" : "justify-start"}`}>
              <p key={msg.id} 
              className={`mb-2 
              ${msg.role == "user" 
                ? "bg-white rounded-lg rounded-br-[1px] px-2 py-1 text-gray-900" 
              : ""}`}>
                 {msg.content}
              </p>
            </div>
          ))}
        </div>
  )
}

export default ScrollableChat
