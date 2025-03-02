import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Calendar, Clock, Users, Film, ArrowLeft, Download, Check, X, Upload, Plus, Trash2, Paperclip, Send } from "lucide-react"
import { ProjectChat } from "./ProjectChat"
import { ProjectChats } from "./ProjectChats"
import { AddTeamMemberModal } from "./AddTeamMemberModal"
import { TeamMemberCard } from "./TeamMemberCard"
import { Modal } from "../../../components/ui/Modal"
import { ChatModal } from "./ChatModal"
import { AddEpisodeModal } from "./AddEpisodeModal"
import { Episodes } from "./Episodes"

interface TeamMember {
  id: number
  name: string
  role: "voice_actor" | "sound_director" | "editor"
  status?: string
  avatar?: string
}

export default function ProjectDetails() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { project } = state
  const [addMemberRole, setAddMemberRole] = React.useState<string | null>(null)
  const [selectedChatMember, setSelectedChatMember] = React.useState<TeamMember | null>(null)
  const [isAddEpisodeModalOpen, setIsAddEpisodeModalOpen] = React.useState(false)

  // Default episodes qiymatini to'g'ri formatda beramiz
  const episodes: Episode[] = project?.episodes || [
    {
      id: 1,
      title: "1-qism",
      duration: "23:45",
      status: "recording",
      originalVideo: "/videos/ep1.mp4",
      subtitle: "/subtitles/ep1.srt",
      voiceActors: [
        {
          id: 1,
          name: "Alisher Zokirov",
          character: "Naruto",
          status: "recorded",
          audioFile: "/audio/naruto_ep1.mp3"
        },
        {
          id: 2,
          name: "Malika Rahimova",
          character: "Sakura",
          status: "pending"
        }
      ]
    }
  ]

  const handleApproveVoice = (episodeId: number, actorId: number) => {
    // API call to approve voice
    console.log("Ovoz tasdiqlandi", episodeId, actorId)
    // Ovoz rejissoriga yuborish
  }

  const handleRejectVoice = (episodeId: number, actorId: number) => {
    // API call to reject voice
    console.log("Ovoz rad etildi", episodeId, actorId)
  }

  const handleApproveMixedAudio = (episodeId: number) => {
    // API call to approve mixed audio
    console.log("Ovoz montaji tasdiqlandi", episodeId)
    // Qismni yakunlangan holatga o'tkazish
  }

  const handleRejectMixedAudio = (episodeId: number) => {
    // API call to reject mixed audio
    console.log("Ovoz montaji rad etildi", episodeId)
  }

  const chatMembers = [
    ...project.voiceActors.map(actor => ({
      id: actor.id,
      name: actor.name,
      role: "voice_actor" as const,
      lastMessage: "Ovozni yozib qo'ydim",
      lastMessageTime: "12:30",
      unreadCount: 1
    })),
    {
      id: 100,
      name: "Sound Rejissor",
      role: "sound_director" as const,
      lastMessage: "Ovoz sifati yaxshi",
      lastMessageTime: "11:45"
    },
    {
      id: 101,
      name: "Tahrirchi",
      role: "editor" as const,
      lastMessage: "Video tayyor",
      lastMessageTime: "10:15",
      unreadCount: 2
    }
  ]

  const teamMembers = {
    voiceActors: project.voiceActors,
    soundDirectors: project.soundDirectors || [],
    editors: project.editors || []
  }

  const handleAddMember = (role: string) => {
    setAddMemberRole(role)
  }

  const handleAddMemberSubmit = (memberId: number, role: string) => {
    // TODO: API call to add member
    console.log("Add member", memberId, role)
  }

  const handleRemoveMember = (memberId: number, role: string) => {
    // TODO: API call
    console.log("Remove member", memberId, role)
  }

  const handleChatWithMember = (member: TeamMember) => {
    setSelectedChatMember(member)
  }

  const handleAddEpisode = (data: EpisodeFormData) => {
    // TODO: API call to add episode
    console.log("Add episode", data)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate('/director/projects')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {project.title}
            </h1>
            <span className="px-3 py-1 text-sm bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full">
              {project.status}
            </span>
          </div>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{project.startDate} - {project.endDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{project.voiceActors.length} ovoz aktyori</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Umumiy progress
            </h3>
            <span className="text-blue-600 dark:text-blue-400 font-semibold">65%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div className="h-2 bg-blue-600 dark:bg-blue-500 rounded-full w-[65%]" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Ovoz yozish
            </h3>
            <span className="text-yellow-600 dark:text-yellow-400 font-semibold">40%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div className="h-2 bg-yellow-500 dark:bg-yellow-400 rounded-full w-[40%]" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Tahrirlash
            </h3>
            <span className="text-purple-600 dark:text-purple-400 font-semibold">20%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
            <div className="h-2 bg-purple-600 dark:bg-purple-500 rounded-full w-[20%]" />
          </div>
        </div>
      </div>

      {/* Episodes */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Qismlar ({episodes?.length || 0})
            </h3>
            <button
              onClick={() => setIsAddEpisodeModalOpen(true)}
              className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              <Plus className="h-4 w-4" />
              <span>Qism qo'shish</span>
            </button>
          </div>

          <Episodes
            episodes={episodes}
            onApproveVoice={handleApproveVoice}
            onRejectVoice={handleRejectVoice}
            onApproveMixedAudio={handleApproveMixedAudio}
            onRejectMixedAudio={handleRejectMixedAudio}
          />
        </div>
      </div>

      {/* Team Members */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Jamoa a'zolari ({Object.values(teamMembers).flat().length})
          </h3>

          {/* Sound Directors */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Ovoz rejissorlar ({teamMembers.soundDirectors.length})
              </h4>
              <button
                onClick={() => handleAddMember('sound_director')}
                className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                <Plus className="h-4 w-4" />
                <span>Qo'shish</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamMembers.soundDirectors.map((member) => (
                <TeamMemberCard
                  key={member.id}
                  member={{
                    ...member,
                    status: "online",
                    unreadCount: 2,
                    lastMessage: "Ovozlar tayyor",
                    lastActivity: "10 daqiqa oldin"
                  }}
                  onRemove={handleRemoveMember}
                  onChat={handleChatWithMember}
                />
              ))}
            </div>
          </div>

          {/* Voice Actors */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Ovoz aktyorlari ({teamMembers.voiceActors.length})
              </h4>
              <button
                onClick={() => handleAddMember('voice_actor')}
                className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                <Plus className="h-4 w-4" />
                <span>Qo'shish</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamMembers.voiceActors.map((actor) => (
                <TeamMemberCard
                  key={actor.id}
                  member={{
                    ...actor,
                    status: "online",
                    unreadCount: 2,
                    lastMessage: "Ovozni yozib qo'ydim",
                    lastActivity: "12:30"
                  }}
                  onRemove={handleRemoveMember}
                  onChat={handleChatWithMember}
                />
              ))}
            </div>
          </div>

          {/* Editors */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Tahrirchilar ({teamMembers.editors.length})
              </h4>
              <button
                onClick={() => handleAddMember('editor')}
                className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                <Plus className="h-4 w-4" />
                <span>Qo'shish</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teamMembers.editors.map((editor) => (
                <TeamMemberCard
                  key={editor.id}
                  member={{
                    ...editor,
                    status: "online",
                    unreadCount: 2,
                    lastMessage: "Video tayyor",
                    lastActivity: "10:15"
                  }}
                  onRemove={handleRemoveMember}
                  onChat={handleChatWithMember}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ProjectChats komponentini olib tashlaymiz */}
      {/* <ProjectChats projectId={project.id} members={chatMembers} /> */}

      {/* Add Member Modal */}
      <AddTeamMemberModal
        isOpen={!!addMemberRole}
        onClose={() => setAddMemberRole(null)}
        onAdd={handleAddMemberSubmit}
        role={addMemberRole || ""}
        availableMembers={[
          // Test data
          { id: 1, name: "John Doe", email: "john@example.com", role: "voice_actor" },
          { id: 2, name: "Jane Smith", email: "jane@example.com", role: "sound_director" },
          // ...
        ]}
      />

      {/* Chat Modal */}
      {selectedChatMember && (
        <ChatModal
          isOpen={!!selectedChatMember}
          onClose={() => setSelectedChatMember(null)}
          member={selectedChatMember}
          onApproveVoice={handleApproveVoice}
          onRejectVoice={handleRejectVoice}
        />
      )}

      {/* Add Episode Modal */}
      <AddEpisodeModal
        isOpen={isAddEpisodeModalOpen}
        onClose={() => setIsAddEpisodeModalOpen(false)}
        onSubmit={handleAddEpisode}
      />
    </div>
  )
} 