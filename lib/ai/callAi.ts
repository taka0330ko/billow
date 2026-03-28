import { LocalChatMessage } from "@/lib/ai/types"
import { extractAiText, withSystemPrompt, buildPromptWithSystem} from "@/lib/ai/chatHelpers"

export const callAi = async (messages: LocalChatMessage[])=>{
  const chatUnknown: unknown = window?.puter?.ai?.chat
  if(typeof chatUnknown !== "function") return ""

  const chat = chatUnknown as (
    input: 
    | string
    | {
      messages: {role: "user" | "assistant" | "system";  content: string}[]
      model?: string
    }
  ) => Promise<unknown>

  try {
    const res = await chat({messages: withSystemPrompt(messages)})
    return extractAiText(res)
  } catch {
    const prompt = buildPromptWithSystem(messages)
    const res = await chat(prompt)
    return extractAiText(res)
  }
}
