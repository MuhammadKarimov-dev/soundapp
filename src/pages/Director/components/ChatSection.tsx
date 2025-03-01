import * as React from "react"
import { Send, User } from "lucide-react"

interface Message {
  id: number
  sender: {
    id: number
    name: string
    role: string
    avatar?: string
  }
  content: string
  timestamp: string
}

const initialMessages: Message[] = [
  {
    id: 1,
    sender: {
      id: 1,
      name: "Alisher Zokirov",
      role: "Ovoz aktyori",
    },
    content: "Assalomu alaykum, 2-epizod uchun ovoz yozishni boshladim",
    timestamp: "09:30"
  },
  {
    id: 2,
    sender: {
      id: 2,
      name: "Jamshid Alimov",
      role: "Sound rejissor",
    },
    content: "Ovoz sifati yaxshi chiqdi, davom eting",
    timestamp: "09:35"
  },
  // Boshqa xabarlar...
]

export function ChatSection() {
  const [messages, setMessages] = React.useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = React.useState("")
  const chatContainerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: Message = {
      id: messages.length + 1,
      sender: {
        id: 0, // Director ID
        name: "Akmal Rahimov",
        role: "Director",
      },
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  return (
    <div className="bg-white rounded-lg border h-[600px] flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-medium">Loyiha guruhi bilan chat</h3>
      </div>

      {/* Chat messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${
              message.sender.role === "Director" ? "flex-row-reverse" : ""
            }`}
          >
            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
              {message.sender.avatar ? (
                <img
                  src={message.sender.avatar}
                  alt={message.sender.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <User className="h-4 w-4 text-gray-500" />
              )}
            </div>

            <div className={`flex flex-col ${
              message.sender.role === "Director" ? "items-end" : ""
            }`}>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{message.sender.name}</span>
                <span className="text-xs text-gray-500">{message.sender.role}</span>
              </div>
              <div className={`mt-1 rounded-lg p-3 ${
                message.sender.role === "Director" 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-100"
              }`}>
                {message.content}
              </div>
              <span className="text-xs text-gray-500 mt-1">{message.timestamp}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Message input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Xabar yozing..."
            className="flex-1 p-2 border rounded-md"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  )
} 