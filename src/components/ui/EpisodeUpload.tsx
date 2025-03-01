import * as React from "react"
import { Plus, Upload } from "lucide-react"
import { Button } from "./button"

export interface Episode {
  id: number
  title: string
  file: File | null
  subtitle: File | null
  duration?: string
}

interface EpisodeUploadProps {
  episodes: Episode[]
  onChange: (episodes: Episode[]) => void
}

export function EpisodeUpload({ episodes, onChange }: EpisodeUploadProps) {
  const fileInputRefs = React.useRef<{ [key: string]: HTMLInputElement | null }>({})

  const handleAddEpisode = () => {
    onChange([
      ...episodes,
      {
        id: episodes.length + 1,
        title: "",
        file: null,
        subtitle: null
      }
    ])
  }

  const handleRemoveEpisode = (id: number) => {
    onChange(episodes.filter(ep => ep.id !== id))
  }

  const handleEpisodeChange = (id: number, changes: Partial<Episode>) => {
    onChange(episodes.map(ep => 
      ep.id === id ? { ...ep, ...changes } : ep
    ))
  }

  return (
    <div className="space-y-4">
      {episodes.map((episode) => (
        <div key={episode.id} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Qism {episode.id}</h4>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleRemoveEpisode(episode.id)}
              className="text-red-500 hover:text-red-700"
            >
              O'chirish
            </Button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Qism nomi
            </label>
            <input
              type="text"
              value={episode.title}
              onChange={(e) => handleEpisodeChange(episode.id, { title: e.target.value })}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Masalan: 1-qism"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Video</label>
              <input
                type="file"
                ref={el => fileInputRefs.current[`video-${episode.id}`] = el}
                accept="video/*"
                onChange={(e) => handleEpisodeChange(episode.id, { file: e.target.files?.[0] || null })}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => fileInputRefs.current[`video-${episode.id}`]?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                {episode.file ? episode.file.name : "Video yuklash"}
              </Button>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Subtitle</label>
              <input
                type="file"
                ref={el => fileInputRefs.current[`subtitle-${episode.id}`] = el}
                accept=".srt,.vtt"
                onChange={(e) => handleEpisodeChange(episode.id, { subtitle: e.target.files?.[0] || null })}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => fileInputRefs.current[`subtitle-${episode.id}`]?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                {episode.subtitle ? episode.subtitle.name : "Subtitle yuklash"}
              </Button>
            </div>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleAddEpisode}
      >
        <Plus className="mr-2 h-4 w-4" />
        Yangi qism qo'shish
      </Button>
    </div>
  )
} 