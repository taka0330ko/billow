import { Input } from "./input"

function ChatRoomInput() {
  return (
        <form onSubmit={handleSubmit}>
          <Input
            id="chat-room-input"
            placeholder="Ask billow anything..."
            className="h-14 mb-8 w-full rounded-full  bg-gray-200/90 pl-6 pr-16 text-secondary placeholder:text-placeholder focus-visible:ring-0 focus-visible:border-transparent"
            value={inputValue}
            onChange={(e)=>setInputValue(e.target.value)}
          />
        </form>
  )
}

export default ChatRoomInput
