import * as React from "react"
import { 
  Film, 
  Mic2,
  Clock,
  CheckCircle2
} from "lucide-react"
import { rejissorService } from "../../services/api.service"

interface ProjectStats {
  total: number
  active: number
  completed: number
  upcoming: number
}

export default function RejissorDashboard() {
  const [projectStats, setProjectStats] = React.useState<ProjectStats>({
    total: 0,
    active: 0,
    completed: 0,
    upcoming: 0
  })

  React.useEffect(() => {
    // Rejissorning loyihalarini olish
    const fetchProjects = async () => {
      try {
        const projects = await rejissorService.getProjects()
        const stats = projects.reduce((acc: ProjectStats, project: any) => {
          acc.total++
          switch(project.status) {
            case 'active':
              acc.active++
              break
            case 'completed':
              acc.completed++
              break
            case 'upcoming':
              acc.upcoming++
              break
          }
          return acc
        }, {
          total: 0,
          active: 0,
          completed: 0,
          upcoming: 0
        })
        setProjectStats(stats)
      } catch (err) {
        console.error("Loyihalar statistikasini olishda xatolik:", err)
      }
    }

    fetchProjects()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Mening loyihalarim</p>
      </div>

      {/* Asosiy statistikalar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Faol loyihalar</p>
              <p className="text-2xl font-semibold">{projectStats.active}</p>
              <p className="text-xs text-blue-500 mt-1">Jarayonda</p>
            </div>
            <Film className="h-10 w-10 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Bugungi yozuvlar</p>
              <p className="text-2xl font-semibold">5</p>
              <p className="text-xs text-yellow-500 mt-1">2 ta yakunlangan</p>
            </div>
            <Clock className="h-10 w-10 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Yakunlangan loyihalar</p>
              <p className="text-2xl font-semibold">{projectStats.completed}</p>
              <p className="text-xs text-green-500 mt-1">100% sifat</p>
            </div>
            <CheckCircle2 className="h-10 w-10 text-purple-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Kelayotgan loyihalar</p>
              <p className="text-2xl font-semibold">{projectStats.upcoming}</p>
              <p className="text-xs text-orange-500 mt-1">Rejalashtirilgan</p>
            </div>
            <Film className="h-10 w-10 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Bugungi jadval */}
      <div className="bg-white rounded-lg border">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium">Bugungi yozuvlar jadvali</h2>
        </div>
        <div className="p-4">
          {/* Jadval komponenti */}
        </div>
      </div>
    </div>
  )
} 