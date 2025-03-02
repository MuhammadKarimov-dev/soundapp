import React from "react"
import { Trash2 } from "lucide-react"

interface TeamMemberCardProps {
  member: {
    id: number
    name: string
    role: string
    status?: "online" | "offline"
    unreadCount?: number
    lastMessage?: string
    lastActivity?: string
  }
  onRemove: (id: number, role: string) => void
  onChat: (member: any) => void
}

export function TeamMemberCard({ member, onRemove, onChat }: TeamMemberCardProps) {
  return (
    <div 
      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg group cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
    >
      <div 
        className="flex items-center gap-3 flex-1"
        onClick={() => onChat(member)}
      >
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <span className="text-blue-600 dark:text-blue-300 font-medium">
              {member.name.charAt(0)}
            </span>
          </div>
          {member.status && (
            <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-gray-700 ${
              member.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
            }`} />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h5 className="font-medium text-gray-900 dark:text-white">
              {member.name}
            </h5>
            {member.unreadCount ? (
              <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {member.unreadCount}
              </span>
            ) : null}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {member.lastMessage || member.role}
          </p>
          {member.lastActivity && (
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {member.lastActivity}
            </p>
          )}
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(member.id, member.role);
        }}
        className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity ml-2"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
} 