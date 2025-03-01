import * as React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { 
  Film, 
  Users,
  FileText,
  Calendar,
  ArrowLeft,
  Play,
  Download,
  Mic2,
  CheckCircle,
  Clock,
  AlertCircle,
  MessageCircle,
  Upload
} from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Textarea } from "../../../components/ui/textarea"
import { ProjectStatusBadge } from "../../../components/ui/ProjectStatusBadge"

export default function ProjectDetails() {
  const location = useLocation()
  const navigate = useNavigate()
  const project = location.state?.project
  const [activeTab, setActiveTab] = React.useState("overview")
  const [comment, setComment] = React.useState("")

  console.log("Loyiha ma'lumotlari:", project) // Debug uchun

  if (!project) {
    console.log("Loyiha topilmadi") // Debug uchun
    navigate("/director/projects")
    return null
  }

  const getEpisodeStatusIcon = (status: string) => {
    switch(status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'recording':
        return <Clock className="h-5 w-5 text-blue-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Yuqori panel */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/director/projects")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Orqaga
          </Button>
          <ProjectStatusBadge status={project.status} />
        </div>

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-2">{project.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {project.startDate} - {project.endDate}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {project.voiceActors.length} ta ovoz aktyori
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Fayl yuklash
            </Button>
            <Button>
              Tahrirlash
            </Button>
          </div>
        </div>
      </div>

      {/* Asosiy kontent */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">
            <Film className="h-4 w-4 mr-2" />
            Umumiy
          </TabsTrigger>
          <TabsTrigger value="episodes">
            <FileText className="h-4 w-4 mr-2" />
            Qismlar
          </TabsTrigger>
          <TabsTrigger value="actors">
            <Mic2 className="h-4 w-4 mr-2" />
            Ovoz aktyorlari
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Progress */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-medium mb-2">Umumiy progress</h3>
              <div className="flex justify-between items-center mb-2">
                <span>65%</span>
                <span className="text-sm text-gray-500">
                  {project.episodes.filter(e => e.status === 'completed').length} / {project.episodes.length} qism
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-medium mb-2">Ovoz yozish</h3>
              <div className="flex justify-between items-center mb-2">
                <span>40%</span>
                <span className="text-sm text-gray-500">
                  {project.voiceActors.filter(a => a.status === 'recording').length} ta aktyor yozuvda
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '40%' }} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-medium mb-2">Tahrirlash</h3>
              <div className="flex justify-between items-center mb-2">
                <span>20%</span>
                <span className="text-sm text-gray-500">
                  2 ta qism tahrirlanmoqda
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '20%' }} />
              </div>
            </div>
          </div>

          {/* So'nggi faollik */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="font-medium mb-4">So'nggi faollik</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Mic2 className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Alisher Zokirov "Naruto" rolini yozishni boshladi</p>
                  <p className="text-sm text-gray-500">Bugun, 14:30</p>
                </div>
              </div>
              {/* Boshqa faolliklar... */}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="episodes" className="space-y-4">
          {project.episodes.map(episode => (
            <div key={episode.id} className="bg-white rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getEpisodeStatusIcon(episode.status)}
                  <div>
                    <h3 className="font-medium">{episode.title}</h3>
                    <p className="text-sm text-gray-500">Davomiyligi: {episode.duration}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Play className="h-4 w-4 mr-2" />
                    Video
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Subtitle
                  </Button>
                </div>
              </div>

              {/* Izohlar */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center gap-2 mb-3">
                  <MessageCircle className="h-4 w-4" />
                  <h4 className="font-medium">Izohlar</h4>
                </div>
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Izoh qoldiring..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button>Yuborish</Button>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="actors" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.voiceActors.map(actor => (
            <div key={actor.id} className="bg-white rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-medium">{actor.name}</h3>
                  <p className="text-sm text-gray-500">Personaj: {actor.character}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  actor.status === 'available' ? 'bg-green-100 text-green-800' :
                  actor.status === 'recording' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {actor.status === 'available' ? 'Band emas' :
                   actor.status === 'recording' ? 'Yozuvda' :
                   'Band'}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Yozilgan qismlar</span>
                  <span>2/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }} />
                </div>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
} 