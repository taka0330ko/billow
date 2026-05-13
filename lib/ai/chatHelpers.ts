import { systemPrompt } from "@/lib/ai/systemPrompt"
import { databaseContext } from "@/lib/ai/databaseContext"

// AIによるバグ修正コード  ////////////////////////////////////////////////

// 複数の応答形式に対応した安全なテキスト抽出フィルター
function extractAiText(response: unknown): string {
  // 直接文字列の場合
  if (typeof response === "string") {
    return response
  }

  if (!response || typeof response !== "object") {
    return ""
  }

  const data = response as Record<string, unknown>

  // Puter.jsエラー形式のチェック
  if ("code" in data && "error" in data) {
    const error = data.error
    throw new Error(`AI Error: ${String(error)}`)
  }

  // message プロパティの確認
  const message = data.message
  if (message && typeof message === "object") {
    const msgData = message as Record<string, unknown>

    // message.content (文字列配列の場合もある)
    if (typeof msgData.content === "string") {
      return msgData.content
    }

    // message.content (配列の場合)
    if (Array.isArray(msgData.content)) {
      const contentStr = msgData.content
        .map((part) => {
          if (!part || typeof part !== "object") return ""
          const p = part as Record<string, unknown>
          return typeof p.text === "string"
            ? p.text
            : typeof p.content === "string"
              ? p.content
              : ""
        })
        .filter(Boolean)
        .join("\n")
      if (contentStr) {
        return contentStr
      }
    }

    // message.text
    if (typeof msgData.text === "string") {
      return msgData.text
    }
  }

  // 直接的なプロパティのチェック
  if (typeof data.text === "string") {
    return data.text
  }

  if (typeof data.content === "string") {
    return data.content
  }

  if (typeof data.result === "string") {
    return data.result
  }

  // reply プロパティ
  if (typeof data.reply === "string") {
    return data.reply
  }
  /////////////////////////////////////////////////////////////

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