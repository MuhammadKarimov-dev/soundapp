import * as React from "react"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../../components/ui/table"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"

interface VoiceActor {
  id: number
  name: string
  status: 'available' | 'recording' | 'unavailable'
  experience: string
  genres: string[]
  projectCount: number
}

export default function RejissorVoiceActors() {
  const [actors, setActors] = React.useState<VoiceActor[]>([
    {
      id: 1,
      name: "John Doe",
      status: "available",
      experience: "5 yil",
      genres: ["Anime", "Multfilm"],
      projectCount: 15
    },
    {
      id: 2,
      name: "Jane Smith",
      status: "recording",
      experience: "3 yil",
      genres: ["Serial", "Anime"],
      projectCount: 8
    }
  ])

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'available':
        return <Badge className="bg-green-500">Band emas</Badge>
      case 'recording':
        return <Badge className="bg-yellow-500">Yozuvda</Badge>
      case 'unavailable':
        return <Badge className="bg-red-500">Band</Badge>
      default:
        return <Badge className="bg-gray-500">Noma'lum</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Ovoz aktyorlari</h1>
          <p className="text-gray-500">Barcha ovoz aktyorlari ro'yxati</p>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ism</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tajriba</TableHead>
              <TableHead>Janrlar</TableHead>
              <TableHead>Loyihalar soni</TableHead>
              <TableHead>Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {actors.map((actor) => (
              <TableRow key={actor.id}>
                <TableCell>{actor.name}</TableCell>
                <TableCell>{getStatusBadge(actor.status)}</TableCell>
                <TableCell>{actor.experience}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {actor.genres.map((genre, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 rounded text-sm"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{actor.projectCount}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    Batafsil
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 