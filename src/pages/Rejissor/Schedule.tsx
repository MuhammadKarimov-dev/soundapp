import * as React from "react"
import { Calendar } from "lucide-react"

interface ScheduleEvent {
  id: number
  title: string
  time: string
  actors: string[]
  status: 'pending' | 'completed' | 'cancelled'
}

export default function RejissorSchedule() {
  const [events, setEvents] = React.useState<ScheduleEvent[]>([
    {
      id: 1,
      title: "Anime dublyaj - Episode 1",
      time: "10:00 - 12:00",
      actors: ["John Doe", "Jane Smith"],
      status: "pending"
    },
    {
      id: 2,
      title: "Multfilm - Final Episode",
      time: "14:00 - 16:00",
      actors: ["Bob Wilson"],
      status: "completed"
    }
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Yozuv jadvali</h1>
          <p className="text-gray-500">Bugungi va kelayotgan yozuvlar</p>
        </div>
      </div>

      <div className="grid gap-4">
        {events.map((event) => (
          <div 
            key={event.id}
            className="bg-white p-4 rounded-lg border"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-blue-500" />
                <div>
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-gray-500">{event.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {event.actors.map((actor, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-gray-100 rounded text-sm"
                  >
                    {actor}
                  </span>
                ))}
                <span 
                  className={`px-2 py-1 rounded text-sm ${
                    event.status === 'completed' 
                      ? 'bg-green-100 text-green-700'
                      : event.status === 'cancelled'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {event.status === 'completed' 
                    ? 'Yakunlangan'
                    : event.status === 'cancelled'
                    ? 'Bekor qilingan'
                    : 'Kutilmoqda'
                  }
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 