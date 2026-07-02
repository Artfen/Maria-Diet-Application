import { useLocalStorage } from './useLocalStorage'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const MAX_STORED_MESSAGES = 30

export function useChatHistory() {
  const [messages, setMessages] = useLocalStorage<ChatMessage[]>('maria-chat-history', [])

  function addMessage(message: ChatMessage) {
    setMessages((prev) => [...prev, message].slice(-MAX_STORED_MESSAGES))
  }

  function clear() {
    setMessages([])
  }

  return { messages, addMessage, clear }
}
