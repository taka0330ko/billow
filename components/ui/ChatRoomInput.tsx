import { useState } from "react";
import { Input } from "./input"

type ChatRoomInputPros = {
  handleSubmit:(message: string) => void;
}

function ChatRoomInput({handleSubmit}:ChatRoomInputPros) {

  const [inputValue, setInputValue] = useState("");

  const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) =>{
    e.preventDefault();
    const message = inputValue.trim();
    if(!message) return

    handleSubmit(message)
    setInputValue("")
  }
  return (
        <form onSubmit={onSubmit} >
          <Input
            id="chat-room-input"
            placeholder="Ask billow anything..."
            className="h-14  w-full rounded-full  bg-gray-200/90 pl-6 pr-16 text-secondary placeholder:text-placeholder focus-visible:ring-0 focus-visible:border-transparent"
            value={inputValue}
            onChange={(e)=>setInputValue(e.target.value)}
          />
        </form>
  )
}

export default ChatRoomInput

// 親コンポーネント
//    ↓
// 関数を props として渡す
//    ↓
// 子コンポーネント
//    ↓
// イベント発生（submit）
//    ↓
// props の関数を実行
//    ↓
// 親の関数が動く