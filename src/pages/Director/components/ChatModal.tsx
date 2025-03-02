import React from "react"
import { Modal } from "../../../components/ui/Modal"
import { Paperclip, Send, Check, X, Play, Pause } from "lucide-react"

interface Message {
  id: number
  senderId: number
  content: string
  timestamp: string
  attachment?: {
    type: "audio" | "video" | "other"
    url: string
    name: string
    episodeId?: number
    characterName?: string
    status?: "pending" | "approved" | "rejected"
  }
}

interface ChatModalProps {
  isOpen: boolean
  onClose: () => void
  member: {
    id: number
    name: string
    role: string
    character?: string
  }
  onApproveVoice?: (audioId: string, episodeId: number) => void
  onRejectVoice?: (audioId: string, episodeId: number) => void
}

export function ChatModal({ isOpen, onClose, member, onApproveVoice, onRejectVoice }: ChatModalProps) {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: 1,
      senderId: member.id,
      content: "1-qism uchun ovozni yozib qo'ydim",
      timestamp: "12:30",
      attachment: {
        type: "audio",
        url: "/audio/test.mp3",
        name: "naruto_ep1_voice.mp3",
        episodeId: 1,
        characterName: member.character || "Naruto",
        status: "pending"
      }
    }
  ])
  const [newMessage, setNewMessage] = React.useState("")
  const [isPlaying, setIsPlaying] = React.useState(false)
  const audioRef = React.useRef<HTMLAudioElement>(null)

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        senderId: 1, // director id
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
      setNewMessage("")
    }
  }

  const togglePlay = (url: string) => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.src = url
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleApprove = (url: string, episodeId: number) => {
    // Xabarni yangilash
    setMessages(messages.map(msg => {
      if (msg.attachment?.url === url) {
        return {
          ...msg,
          content: msg.content + "\n✅ Tasdiqlandi va ovoz rejissoriga yuborildi",
          attachment: {
            ...msg.attachment,
            status: "approved"
          }
        }
      }
      return msg
    }))
    
    // Callback
    onApproveVoice?.(url, episodeId)
  }

  const handleReject = (url: string, episodeId: number) => {
    // Xabarni yangilash
    setMessages(messages.map(msg => {
      if (msg.attachment?.url === url) {
        return {
          ...msg,
          content: msg.content + "\n❌ Qaytarildi. Qayta yozish kerak",
          attachment: {
            ...msg.attachment,
            status: "rejected"
          }
        }
      }
      return msg
    }))
    
    // Callback
    onRejectVoice?.(url, episodeId)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${member.name} - ${member.character || member.role}`}
    >
      <div className="h-[400px] flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.senderId === 1 ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] ${
                message.senderId === 1 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                } rounded-lg p-3`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm opacity-70">{message.timestamp}</span>
                </div>
                <p className="whitespace-pre-line">{message.content}</p>
                {message.attachment && (
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2 bg-black/10 dark:bg-white/10 p-2 rounded">
                      {message.attachment.type === "audio" && (
                        <button
                          onClick={() => togglePlay(message.attachment?.url || "")}
                          className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded"
                        >
                          {isPlaying ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </button>
                      )}
                      <div className="flex-1">
                        <span className="text-sm block">{message.attachment.name}</span>
                        <span className="text-xs opacity-70 block">
                          {message.attachment.episodeId}-qism, {message.attachment.characterName}
                        </span>
                      </div>
                      {message.attachment.status === "pending" && member.role === "voice_actor" && (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleApprove(message.attachment?.url || "", message.attachment?.episodeId || 0)}
                            className="p-1.5 text-green-500 hover:bg-green-500/10 rounded"
                            title="Tasdiqlash"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleReject(message.attachment?.url || "", message.attachment?.episodeId || 0)}
                            className="p-1.5 text-red-500 hover:bg-red-500/10 rounded"
                            title="Qaytarish"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                      {message.attachment.status === "approved" && (
                        <span className="text-xs text-green-500">Tasdiqlangan</span>
                      )}
                      {message.attachment.status === "rejected" && (
                        <span className="text-xs text-red-500">Qaytarilgan</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <audio ref={audioRef} className="hidden" onEnded={() => setIsPlaying(false)} />

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <button
              className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <Paperclip className="h-5 w-5" />
            </button>
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
        </div>
      </div>
    </Modal>
  )
} 