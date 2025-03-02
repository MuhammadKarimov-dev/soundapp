import React from "react"
import { Send, Download, Paperclip, Search } from "lucide-react"

interface ChatMember {
  id: number
  name: string
  role: "director" | "sound_director" | "voice_actor" | "editor"
  avatar?: string
  lastMessage?: string
  lastMessageTime?: string
  unreadCount?: number
}

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

interface ProjectChatsProps {
  projectId: number
  members: ChatMember[]
}

export function ProjectChats({ projectId, members }: ProjectChatsProps) {
  const [selectedMember, setSelectedMember] = React.useState<ChatMember | null>(null)
  const [messages, setMessages] = React.useState<Message[]>([])
  const [newMessage, setNewMessage] = React.useState("")
  const [attachments, setAttachments] = React.useState<File[]>([])
  const [searchTerm, setSearchTerm] = React.useState("")
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  // Filter members based on search
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    if (selectedMember) {
      // Load messages for selected member
      setMessages([
        {
          id: 1,
          sender: {
            id: 1,
            name: "John Director",
            role: "director"
          },
          content: `${selectedMember.name}, 1-qism uchun ovozlarni yakunlash kerak`,
          timestamp: "10:30"
        },
        {
          id: 2,
          sender: {
            id: selectedMember.id,
            name: selectedMember.name,
            role: selectedMember.role
          },
          content: "Xo'p bo'ladi, bugun kechgacha yuboraman",
          timestamp: "11:15"
        }
      ])
      scrollToBottom()
    }
  }, [selectedMember])

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
      scrollToBottom()
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow h-[600px] flex flex-col md:flex-row">
      {/* Members List - Mobile View Toggle */}
      <div className="md:hidden p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setSelectedMember(null)}
          className="text-sm text-blue-600 dark:text-blue-400"
        >
          {selectedMember ? "← Orqaga" : "Suhbatlar"}
        </button>
      </div>

      {/* Members List */}
      <div className={`${
        selectedMember ? 'hidden md:block' : 'block'
      } w-full md:w-80 md:border-r border-gray-200 dark:border-gray-700`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <input
              type="text"
              placeholder="Qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500 dark:text-gray-400" />
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(600px-73px)] md:h-[calc(600px-65px)]">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                selectedMember?.id === member.id ? 'bg-gray-100 dark:bg-gray-700' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-300 font-medium">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {member.name}
                    </h4>
                    {member.lastMessageTime && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {member.lastMessageTime}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {member.lastMessage || member.role}
                    </p>
                    {member.unreadCount && (
                      <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {member.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`${
        selectedMember ? 'block' : 'hidden md:block'
      } flex-1 flex flex-col`}>
        {selectedMember ? (
          <>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-300 font-medium">
                    {selectedMember.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {selectedMember.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedMember.role}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
              <div ref={messagesEndRef} />
            </div>

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
                  onChange={(e) => e.target.files && setAttachments(Array.from(e.target.files))}
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
          </>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center text-gray-500 dark:text-gray-400">
            Suhbatlashish uchun foydalanuvchini tanlang
          </div>
        )}
      </div>
    </div>
  )
} 