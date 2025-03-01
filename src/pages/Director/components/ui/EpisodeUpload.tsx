import * as React from "react"
import { Upload, X } from "lucide-react"

export interface Episode {
  id: string
  title: string
  video: File | null
  subtitle: File | null
}

interface EpisodeUploadProps {
  episodes: Episode[]
  onChange: (episodes: Episode[]) => void
}

export function EpisodeUpload({ episodes, onChange }: EpisodeUploadProps) {
  const addEpisode = () => {
    const newEpisode: Episode = {
      id: Date.now().toString(),
      title: `${episodes.length + 1}-qism`,
      video: null,
      subtitle: null
    }
    onChange([...episodes, newEpisode])
  }

  const removeEpisode = (id: string) => {
    onChange(episodes.filter(ep => ep.id !== id))
  }

  const updateEpisode = (id: string, updates: Partial<Episode>) => {
    onChange(episodes.map(ep => 
      ep.id === id ? { ...ep, ...updates } : ep
    ))
  }

  return (
    <div className="space-y-4">
      {episodes.map((episode, index) => (
        <div key={episode.id} className="border rounded-md p-4 relative">
          <button
            type="button"
            onClick={() => removeEpisode(episode.id)}
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Qism nomi
              </label>
              <input
                type="text"
                value={episode.title}
                onChange={(e) => updateEpisode(episode.id, { title: e.target.value })}
                className="w-full p-2 border rounded-md"
                placeholder={`${index + 1}-qism`}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Video
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => updateEpisode(episode.id, { 
                    video: e.target.files?.[0] || null 
                  })}
                  className="hidden"
                  id={`video-${episode.id}`}
                />
                <label
                  htmlFor={`video-${episode.id}`}
                  className="w-full p-2 border-2 border-dashed rounded-md hover:bg-gray-50 flex flex-col items-center cursor-pointer"
                >
                  <Upload className="h-6 w-6 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {episode.video ? episode.video.name : "Video yuklash"}
                  </span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subtitle
                </label>
                <input
                  type="file"
                  accept=".srt,.vtt"
                  onChange={(e) => updateEpisode(episode.id, { 
                    subtitle: e.target.files?.[0] || null 
                  })}
                  className="hidden"
                  id={`subtitle-${episode.id}`}
                />
                <label
                  htmlFor={`subtitle-${episode.id}`}
                  className="w-full p-2 border-2 border-dashed rounded-md hover:bg-gray-50 flex flex-col items-center cursor-pointer"
                >
                  <Upload className="h-6 w-6 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {episode.subtitle ? episode.subtitle.name : "Subtitle yuklash"}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addEpisode}
        className="w-full p-2 border-2 border-dashed rounded-md hover:bg-gray-50 text-gray-500"
      >
        + Yangi qism qo'shish
      </button>
    </div>
  )
} 