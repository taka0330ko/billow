import { useState } from "react";
import { Input } from "./input"
import { ArrowUp, Plus } from "lucide-react";

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
        <form onSubmit={onSubmit} autoComplete="off" className="border rounded-lg pb-4">
          <div className="flex flex-col px-2">
            {/* text area */}
            <Input
              id="chat-room-input"
              placeholder="Ask billow anything..."
              className="h-14 w-full rounded-full  text-gray-100 placeholder:color-placeholder border-none focus-visible:ring-0 focus-visible:border-transparent"
              value={inputValue}
              onChange={(e)=>setInputValue(e.target.value)}
            />
            {/* option bar */}
            <div className="w-full flex-1 flex justify-between bg-card px-6 py-2 rounded-full">
              <button><Plus/></button>
              <button>Quick Action</button>
            <p className="text-gray-400">Drag & Drop file here</p>
            <button><ArrowUp/></button>
            </div>
          </div>
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