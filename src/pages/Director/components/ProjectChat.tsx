import React from "react"
import { Send, Download, Paperclip } from "lucide-react"

interface Message {
  id: number
  sender: {
    id: number
    name: string
    role: "director" | "sound_director" | "voice_actor" | "editor"
  }
  content: string
  timestamp: string
  attachments?: {
    id: number
    name: string
    url: string
    type: "audio" | "video" | "subtitle" | "other"
  }[]
}

interface ProjectChatProps {
  projectId: number
}

export function ProjectChat({ projectId }: ProjectChatProps) {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: 1,
      sender: {
        id: 1,
        name: "John Director",
        role: "director"
      },
      content: "1-qism uchun ovozlarni yakunlash kerak",
      timestamp: "10:30"
    },
    {
      id: 2,
      sender: {
        id: 2,
        name: "Alisher Zokirov",
        role: "voice_actor"
      },
      content: "Naruto personaji uchun ovozni yozib qo'ydim",
      timestamp: "11:15",
      attachments: [
        {
          id: 1,
          name: "naruto_ep1_voice.mp3",
          url: "/files/naruto_ep1_voice.mp3",
          type: "audio"
        }
      ]
    },
    {
      id: 3,
      sender: {
        id: 3,
        name: "Sound Rejissor",
        role: "sound_director"
      },
      content: "Ovoz sifati yaxshi chiqibdi, lekin 2:15 dagi joyni qayta yozish kerak",
      timestamp: "11:45"
    }
  ])

  const [newMessage, setNewMessage] = React.useState("")
  const [attachments, setAttachments] = React.useState<File[]>([])
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleSend = () => {
    if (newMessage.trim() || attachments.length > 0) {
      const message: Message = {
        id: messages.length + 1,
        sender: {
          id: 1,
          name: "John Director",
          role: "director"
        },
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        attachments: attachments.map((file, index) => ({
          id: index + 1,
          name: file.name,
          url: URL.createObjectURL(file),
          type: file.type.startsWith('audio') ? 'audio' : 'other'
        }))
      }
      setMessages([...messages, message])
      setNewMessage("")
      setAttachments([])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files))
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Loyiha muhokamasi
        </h3>
      </div>

      {/* Messages */}
      <div className="h-[400px] overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.sender.role === 'director' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[70%] ${
              message.sender.role === 'director' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
              } rounded-lg p-3`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{message.sender.name}</span>
                <span className="text-sm opacity-70">{message.timestamp}</span>
              </div>
              <p>{message.content}</p>
              {message.attachments && message.attachments.length > 0 && (
                <div className="mt-2 space-y-2">
                  {message.attachments.map((file) => (
                    <a
                      key={file.id}
                      href={file.url}
                      download={file.name}
                      className="flex items-center gap-2 text-sm bg-black/10 dark:bg-white/10 p-2 rounded hover:bg-black/20 dark:hover:bg-white/20"
                    >
                      <Download className="h-4 w-4" />
                      <span>{file.name}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            multiple
          />
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Xabar yozing..."
            className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg px-4 py-2 focus:outline-none"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="p-2 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        {attachments.length > 0 && (
          <div className="mt-2 flex gap-2">
            {attachments.map((file, index) => (
              <div 
                key={index}
                className="text-sm bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-1 rounded-full"
              >
                {file.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 