import * as React from "react"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../../components/ui/table"
import { rejissorService } from "../../services/api.service"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Plus, Calendar, Users, FileText } from "lucide-react"
import AddProjectModal from "../../components/shared/AddProjectModal"
import { authService } from "../../services/api.service"
import ProjectDetails from "./components/ProjectDetails"

interface Project {
  id: number
  title: string
  status: 'active' | 'completed' | 'upcoming'
  startDate: string
  endDate: string
  thumbnail: string
  voiceActors: Array<{
    id: number
    name: string
    character: string
    status: 'available' | 'recording' | 'unavailable'
  }>
  episodes: Array<{
    id: number
    title: string
    status: 'pending' | 'recording' | 'completed'
    duration: string
    video: string
    subtitle: string
  }>
}

export default function RejissorProjects() {
  const [projects, setProjects] = React.useState<Project[]>([
    {
      id: 1,
      title: "Anime dublyaj",
      status: "active",
      startDate: "2024-03-01",
      endDate: "2024-04-01",
      thumbnail: "/images/anime-cover.jpg",
      voiceActors: [
        {
          id: 1,
          name: "John Doe",
          character: "Naruto",
          status: "available"
        },
        {
          id: 2,
          name: "Jane Smith",
          character: "Sasuke",
          status: "recording"
        }
      ],
      episodes: [
        {
          id: 1,
          title: "Episode 1",
          status: "completed",
          duration: "24:00",
          video: "/videos/ep1.mp4",
          subtitle: "/subtitles/ep1.srt"
        },
        {
          id: 2,
          title: "Episode 2",
          status: "recording",
          duration: "24:00",
          video: "/videos/ep2.mp4",
          subtitle: "/subtitles/ep2.srt"
        }
      ]
    }
  ])
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false)
  const currentUser = authService.getCurrentUser()

  const userRole = authService.getRole() as 'director' | 'rejissor'

  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await rejissorService.getProjects()
        setProjects(data)
      } catch (err) {
        console.error("Loyihalarni olishda xatolik:", err)
      }
    }

    fetchProjects()
  }, [])

  const handleAddProject = async (projectData: any) => {
    try {
      const newProject = await rejissorService.createProject(projectData)
      setProjects([...projects, newProject])
    } catch (err) {
      console.error("Loyiha qo'shishda xatolik:", err)
    }
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-blue-500">Faol</Badge>
      case 'completed':
        return <Badge className="bg-green-500">Yakunlangan</Badge>
      case 'upcoming':
        return <Badge className="bg-orange-500">Kutilmoqda</Badge>
      default:
        return <Badge className="bg-gray-500">Noma'lum</Badge>
    }
  }

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project)
    setIsDetailsOpen(true)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Loyihalar</h1>
          <p className="text-muted-foreground">
            Barcha loyihalar ro'yxati
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Yangi loyiha
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div 
            key={project.id}
            className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden"
          >
            <div className="relative aspect-video">
              <img 
                src={project.thumbnail} 
                alt={project.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <Badge 
                className={`absolute top-2 right-2 ${
                  project.status === 'active' ? 'bg-blue-500' :
                  project.status === 'completed' ? 'bg-green-500' : 
                  'bg-orange-500'
                }`}
              >
                {project.status === 'active' ? 'Faol' :
                 project.status === 'completed' ? 'Yakunlangan' :
                 'Kutilmoqda'}
              </Badge>
            </div>

            <div className="p-6 space-y-4">
              <h3 className="text-lg font-semibold">{project.title}</h3>

              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4 opacity-70" />
                  <span>
                    {project.startDate} - {project.endDate}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="mr-2 h-4 w-4 opacity-70" />
                  <span>{project.voiceActors?.length || 0} ovoz aktyori</span>
                </div>
                <div className="flex items-center text-sm">
                  <FileText className="mr-2 h-4 w-4 opacity-70" />
                  <span>{project.episodes?.length || 0} qism</span>
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleViewDetails(project)}
                >
                  Batafsil
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddProjectModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddProject}
        employees={[]}
        userRole="rejissor"
        currentUser={currentUser}
      />

      {selectedProject && (
        <ProjectDetails
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          project={selectedProject}
        />
      )}
    </div>
  )
} 