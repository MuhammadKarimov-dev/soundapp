import * as React from "react"
import { 
  Film, 
  Pencil, 
  Trash2,
  Plus,
  Search,
  Calendar,
  Users
} from "lucide-react"
import { AddProjectModal, ProjectFormData } from "./AddProjectModal"
import { useNavigate } from "react-router-dom"
import { ProjectStatusBadge } from "../../../components/ui/ProjectStatusBadge"

interface Project {
  id: number
  title: string
  status: string
  startDate: string
  endDate: string
  thumbnail: string
  voiceActors: Array<{
    id: number
    name: string
    character: string
    status: 'available' | 'recording' | 'unavailable' | 'completed'
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

interface Employee {
  id: number
  fullName: string
  position: string
}

const initialProjects: Project[] = [
  {
    id: 1,
    title: "Naruto Shippuden",
    status: "Jarayonda",
    startDate: "2024-03-01",
    endDate: "2024-06-01",
    thumbnail: "/src/assets/img/naruto.jpg",
    voiceActors: [
      {
        id: 1,
        name: "Alisher Zokirov",
        character: "Naruto Uzumaki",
        status: "recording"
      },
      {
        id: 2,
        name: "Jahongir Poziljonov",
        character: "Sasuke Uchiha",
        status: "available"
      },
      {
        id: 3,
        name: "Malika Rahimova",
        character: "Sakura Haruno",
        status: "recording"
      }
    ],
    episodes: [
      {
        id: 1,
        title: "1-qism: Qaytish",
        status: "completed",
        duration: "23:00",
        video: "/src/assets/video/video.mkv",
        subtitle: "/src/assets/subtitle/movie.srt"
      },
      {
        id: 2,
        title: "2-qism: Yangi kuch",
        status: "recording",
        duration: "23:00",
        video: "/src/assets/video/video.mkv",
        subtitle: "/src/assets/subtitle/movie.srt"
      },
      {
        id: 3,
        title: "3-qism: Akatsuki",
        status: "pending",
        duration: "23:00",
        video: "",
        subtitle: ""
      }
    ]
  },
  {
    id: 2,
    title: "Avengers: Endgame",
    status: "Yangi",
    startDate: "2024-04-01",
    endDate: "2024-05-01",
    thumbnail: "/src/assets/img/avengers.jpg",
    voiceActors: [
      {
        id: 4,
        name: "Zuhra Ashurova",
        character: "Black Widow",
        status: "available"
      },
      {
        id: 5,
        name: "Alisher Zokirov",
        character: "Iron Man",
        status: "available"
      },
      {
        id: 6,
        name: "Jahongir Poziljonov",
        character: "Captain America",
        status: "available"
      }
    ],
    episodes: []
  },
  {
    id: 3,
    title: "Attack on Titan",
    status: "Yakunlangan",
    startDate: "2024-01-01",
    endDate: "2024-03-01",
    thumbnail: "/src/assets/img/naruto.jpg", // Test uchun Naruto rasmi
    voiceActors: [
      {
        id: 7,
        name: "Alisher Zokirov",
        character: "Eren Yeager",
        status: "completed"
      },
      {
        id: 8,
        name: "Malika Rahimova",
        character: "Mikasa Ackerman",
        status: "completed"
      }
    ],
    episodes: [
      {
        id: 1,
        title: "1-qism: Titan hujumi",
        status: "completed",
        duration: "24:00",
        video: "/src/assets/video/video.mkv",
        subtitle: "/src/assets/subtitle/movie.srt"
      },
      {
        id: 2,
        title: "2-qism: Kurash",
        status: "completed",
        duration: "24:00",
        video: "/src/assets/video/video.mkv",
        subtitle: "/src/assets/subtitle/movie.srt"
      }
    ]
  },
  {
    id: 4,
    title: "Death Note",
    status: "Jarayonda",
    startDate: "2024-02-15",
    endDate: "2024-05-15",
    thumbnail: "/src/assets/img/avengers.jpg", // Test uchun Avengers rasmi
    voiceActors: [
      {
        id: 9,
        name: "Jahongir Poziljonov",
        character: "Light Yagami",
        status: "recording"
      },
      {
        id: 10,
        name: "Alisher Zokirov",
        character: "L",
        status: "available"
      }
    ],
    episodes: [
      {
        id: 1,
        title: "1-qism: Daftar",
        status: "completed",
        duration: "23:00",
        video: "/src/assets/video/video.mkv",
        subtitle: "/src/assets/subtitle/movie.srt"
      },
      {
        id: 2,
        title: "2-qism: L",
        status: "recording",
        duration: "23:00",
        video: "",
        subtitle: ""
      }
    ]
  }
]

// Default xodimlar ro'yxati
const defaultEmployees: Employee[] = [
  // Rejissorlar (faqat bitta tanlanadi)
  {
    id: 1,
    fullName: "Akmal Rahimov",
    position: "Rejissor"
  },
  {
    id: 2,
    fullName: "Sardor Alimov",
    position: "Rejissor"
  },
  // Ovoz rejissorlari (bir nechta tanlanishi mumkin)
  {
    id: 3,
    fullName: "Jamshid Alimov",
    position: "Sound rejissor"
  },
  {
    id: 4,
    fullName: "Dilshod Karimov",
    position: "Sound rejissor"
  },
  {
    id: 5,
    fullName: "Aziz Toshev",
    position: "Sound rejissor"
  },
  // Ovoz aktyorlari (bir nechta tanlanishi mumkin)
  {
    id: 6,
    fullName: "Alisher Zokirov",
    position: "Ovoz aktyori"
  },
  {
    id: 7,
    fullName: "Malika Rahimova",
    position: "Ovoz aktyori"
  },
  {
    id: 8,
    fullName: "Zuhra Ashurova",
    position: "Ovoz aktyori"
  },
  {
    id: 9,
    fullName: "Jahongir Poziljonov",
    position: "Ovoz aktyori"
  },
  // Tahrirchilar
  {
    id: 10,
    fullName: "Bobur Toshev",
    position: "Tahrirchi"
  }
]

export function ProjectsTable() {
  const navigate = useNavigate()
  const [projects, setProjects] = React.useState<Project[]>(initialProjects)
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false)
  const [editingProject, setEditingProject] = React.useState<Project | null>(null)
  const [searchTerm, setSearchTerm] = React.useState("")

  const handleAddProject = (data: ProjectFormData) => {
    const newProject: Project = {
      id: projects.length + 1,
      title: data.title,
      status: "Yangi",
      startDate: new Date().toISOString().split('T')[0],
      endDate: data.deadline,
      thumbnail: data.thumbnail ? URL.createObjectURL(data.thumbnail) : "",
      voiceActors: data.voiceActors.map((actorId, index) => {
        const actor = defaultEmployees.find(emp => emp.id.toString() === actorId)
        return {
          id: index + 1,
          name: actor?.fullName || "",
          character: "Belgilanmagan",
          status: "available"
        }
      }),
      episodes: []
    }
    
    setProjects([...projects, newProject])
    setIsAddModalOpen(false)
  }

  const handleDeleteProject = (id: number) => {
    if (window.confirm("Rostdan ham bu loyihani o'chirmoqchimisiz?")) {
      setProjects(projects.filter(project => project.id !== id))
    }
  }

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setIsEditModalOpen(true)
  }

  const handleUpdateProject = (data: ProjectFormData) => {
    if (!editingProject) return

    const updatedProject: Project = {
      ...editingProject,
      title: data.title,
      status: data.status,
      endDate: data.deadline,
      thumbnail: data.thumbnail ? URL.createObjectURL(data.thumbnail) : editingProject.thumbnail,
      voiceActors: data.voiceActors.map((actorId, index) => {
        const actor = defaultEmployees.find(emp => emp.id.toString() === actorId)
        const existingActor = editingProject.voiceActors.find(va => va.id === index + 1)
        return {
          id: index + 1,
          name: actor?.fullName || "",
          character: existingActor?.character || "Belgilanmagan",
          status: existingActor?.status || "available"
        }
      })
    }

    setProjects(projects.map(p => 
      p.id === editingProject.id ? updatedProject : p
    ))
    setIsEditModalOpen(false)
    setEditingProject(null)
  }

  const handleProjectClick = (project: Project) => {
    console.log("Loyihaga bosildi:", project) // Debug uchun
    navigate(`/director/projects/${project.id}`, { 
      state: { project } 
    })
  }

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Loyihalar</h2>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          <span>Yangi loyiha</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div 
            key={project.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => handleProjectClick(project)}
          >
            <img 
              src={project.thumbnail} 
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                {project.title}
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{project.startDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{project.voiceActors.length} aktyorlar</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <ProjectStatusBadge status={project.status} />
                <div className="flex gap-2">
                  <button 
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    onClick={(e) => handleEditProject(project)}
                  >
                    <Pencil className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </button>
                  <button 
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    onClick={(e) => handleDeleteProject(project.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddProjectModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddProject}
        employees={defaultEmployees}
      />

      {editingProject && (
        <AddProjectModal 
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setEditingProject(null)
          }}
          onSubmit={handleUpdateProject}
          employees={defaultEmployees}
          initialData={{
            title: editingProject.title,
            description: "",
            deadline: editingProject.endDate,
            budget: "0",
            status: editingProject.status,
            thumbnail: null,
            director: "",
            soundDirectors: [],
            voiceActors: editingProject.voiceActors.map(actor => actor.id.toString()),
            editor: "",
            episodes: []
          }}
        />
      )}
    </div>
  )
} 