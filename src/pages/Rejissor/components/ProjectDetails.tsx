import * as React from "react"
import { 
  Film, 
  Users,
  FileText,
  Mic2,
  X,
  MessageCircle,
  Play,
  Download 
} from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Modal } from "../../../components/ui/Modal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Textarea } from "../../../components/ui/textarea"

interface ProjectDetailsProps {
  isOpen: boolean
  onClose: () => void
  project: {
    id: number
    title: string
    status: string
    startDate: string
    endDate: string
    thumbnail: string
    episodes: Array<{
      id: number
      title: string
      status: 'pending' | 'recording' | 'completed'
      duration: string
      video: string
      subtitle: string
      comments?: Array<{
        id: number
        user: string
        text: string
        timestamp: string
      }>
    }>
    voiceActors: Array<{
      id: number
      name: string
      character: string
      status: 'available' | 'recording' | 'unavailable'
      recordings?: Array<{
        id: number
        episodeId: number
        url: string
        status: 'pending' | 'approved' | 'rejected'
        feedback?: string
      }>
    }>
  }
}

export default function ProjectDetails({ isOpen, onClose, project }: ProjectDetailsProps) {
  const [selectedEpisode, setSelectedEpisode] = React.useState<number | null>(null)
  const [comment, setComment] = React.useState("")

  const handleSendComment = () => {
    // API call to send comment
    setComment("")
  }

  const handleApproveRecording = (actorId: number, recordingId: number) => {
    // API call to approve recording
  }

  const handleRejectRecording = (actorId: number, recordingId: number) => {
    // API call to reject recording
  }

  if (!isOpen || !project) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{project.title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="episodes">
          <TabsList>
            <TabsTrigger value="episodes">
              <Film className="h-4 w-4 mr-2" />
              Qismlar
            </TabsTrigger>
            <TabsTrigger value="actors">
              <Users className="h-4 w-4 mr-2" />
              Ovoz aktyorlari
            </TabsTrigger>
            <TabsTrigger value="progress">
              <FileText className="h-4 w-4 mr-2" />
              Progress
            </TabsTrigger>
          </TabsList>

          <TabsContent value="episodes" className="space-y-4">
            {project.episodes?.map(episode => (
              <div 
                key={episode.id}
                className="p-4 border rounded-lg space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{episode.title}</h3>
                  <span className={`px-2 py-1 rounded text-sm ${
                    episode.status === 'completed' 
                      ? 'bg-green-100 text-green-700'
                      : episode.status === 'recording'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {episode.status === 'completed' 
                      ? 'Yakunlangan'
                      : episode.status === 'recording'
                      ? 'Yozuvda'
                      : 'Kutilmoqda'
                    }
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Button variant="outline" className="w-full">
                      <Play className="h-4 w-4 mr-2" />
                      Video ko'rish
                    </Button>
                  </div>
                  <div>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Subtitle yuklash
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    <h4 className="font-medium">Izohlar</h4>
                  </div>
                  
                  {episode.comments?.map(comment => (
                    <div key={comment.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{comment.user}</span>
                        <span className="text-gray-500">{comment.timestamp}</span>
                      </div>
                      <p className="mt-1 text-sm">{comment.text}</p>
                    </div>
                  ))}

                  <div className="flex gap-2">
                    <Textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Izoh qoldiring..."
                      className="flex-1"
                    />
                    <Button onClick={handleSendComment}>
                      Yuborish
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="actors" className="space-y-4">
            {Array.isArray(project.voiceActors) && project.voiceActors.map(actor => (
              <div 
                key={actor.id}
                className="p-4 border rounded-lg space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{actor.name}</h4>
                    <p className="text-sm text-gray-500">{actor.character}</p>
                  </div>
                  <span 
                    className={`px-2 py-1 rounded text-sm ${
                      actor.status === 'available' 
                        ? 'bg-green-100 text-green-700'
                        : actor.status === 'recording'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {actor.status === 'available' 
                      ? 'Band emas'
                      : actor.status === 'recording'
                      ? 'Yozuvda'
                      : 'Band'
                    }
                  </span>
                </div>

                <div className="space-y-2">
                  {actor.recordings?.map(recording => (
                    <div key={recording.id} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">
                            {project.episodes?.find(e => e.id === recording.episodeId)?.title}
                          </p>
                          <audio src={recording.url} controls className="mt-2" />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleApproveRecording(actor.id, recording.id)}
                          >
                            Tasdiqlash
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500"
                            onClick={() => handleRejectRecording(actor.id, recording.id)}
                          >
                            Rad etish
                          </Button>
                        </div>
                      </div>
                      {recording.feedback && (
                        <p className="mt-2 text-sm text-gray-600">
                          Izoh: {recording.feedback}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>Umumiy progress</span>
                <span>65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Modal>
  )
} 