import React from "react"
import { Modal } from "../../../components/ui/Modal"
import { Search } from "lucide-react"

interface Member {
  id: number
  name: string
  role: string
  email: string
  avatar?: string
}

interface AddTeamMemberModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (memberId: number, role: string) => void
  role: string
  availableMembers: Member[]
}

export function AddTeamMemberModal({ isOpen, onClose, onAdd, role, availableMembers }: AddTeamMemberModalProps) {
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredMembers = availableMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getRoleTitle = (role: string) => {
    switch(role) {
      case 'sound_director': return 'Ovoz rejissor'
      case 'voice_actor': return 'Ovoz aktyori'
      case 'editor': return 'Tahrirchi'
      default: return ''
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${getRoleTitle(role)} qo'shish`}
    >
      <div className="space-y-4">
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

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 -mx-4 px-4"
              onClick={() => {
                onAdd(member.id, role)
                onClose()
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-300 font-medium">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {member.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {member.email}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
} 