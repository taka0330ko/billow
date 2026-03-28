import { systemPrompt } from "@/lib/ai/systemPrompt"
import { databaseContext } from "@/lib/ai/databaseContext"

//何が返ってきても、とにかく最終的に string にして返す安全フィルター
function extractAiText(res: unknown): string {
  if (typeof res === "string") return res

  if (
    typeof res === "object" &&
    res !== null &&
    "message" in res
  ) {
    const message = (res as { message?: unknown }).message

    if (
      typeof message === "object" &&
      message !== null &&
      "content" in message
    ) {
      const content = (message as { content?: unknown }).content
      if (typeof content === "string") {
        return content
      }
    }
  }

  return ""
}


// LocalChatMessage という型は
// role: "user" か "assistant"
// content: 文字列
// を持つオブジェクト
type LocalChatMessage = {
  role: "user" | "assistant";
  content: string;
}

const systemMessageContent = `${systemPrompt}${databaseContext}`

// ローカルのチャット履歴に systemPrompt を追加して、AI API用の messages 配列を作る関数
function withSystemPrompt(messages: LocalChatMessage[]){
  return[
    {role: "system" as const, content: systemMessageContent},
    ...messages.map((m) => ({ role: m.role, content:m.content}))
  ]
}
//AIに配列で渡して失敗した時のための、「文字列プロンプト」を作る関数
function buildPromptWithSystem(messages: LocalChatMessage[]) {
  const history = messages
  .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
  .join("\n")
  return `${systemMessageContent}\n\n${history}\nAssistant:`
}

export {
   extractAiText,
   withSystemPrompt,
   buildPromptWithSystem
}