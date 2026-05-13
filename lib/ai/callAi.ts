import { LocalChatMessage } from "@/lib/ai/types"
import { extractAiText, withSystemPrompt, buildPromptWithSystem} from "@/lib/ai/chatHelpers"

type PuterChat = (...args: unknown[]) => Promise<unknown>

export const callAi = async (messages: LocalChatMessage[]): Promise<string> => {
  const chat = window?.puter?.ai?.chat as PuterChat | undefined

  if (typeof chat !== "function") {
    return ""
  }

  const formattedMessages = withSystemPrompt(messages)

  try {
    const res = await chat(formattedMessages)
    const aiText = extractAiText(res)
    if (aiText) return aiText
  } catch {
    // fallback to string format
  }

  try {
    const prompt = buildPromptWithSystem(messages)
    const res = await chat(prompt)
    const aiText = extractAiText(res)
    if (aiText) return aiText
  } catch {
    // both formats failed
  }

  return ""
}
