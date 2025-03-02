import React from "react"
import { Download, Play, Check, X } from "lucide-react"

interface Episode {
  id: number
  title: string
  duration: string
  status: "pending" | "recording" | "mixing" | "completed"
  originalVideo?: string
  subtitle?: string
  voiceActors: {
    id: number
    name: string
    character: string
    status: "pending" | "recorded" | "approved" | "rejected"
    audioFile?: string
  }[]
  mixedAudio?: string
  finalVideo?: string
}

interface EpisodesProps {
  episodes: Episode[]
  onApproveVoice: (episodeId: number, actorId: number) => void
  onRejectVoice: (episodeId: number, actorId: number) => void
  onApproveMixedAudio: (episodeId: number) => void
  onRejectMixedAudio: (episodeId: number) => void
}

export function Episodes({ episodes, onApproveVoice, onRejectVoice, onApproveMixedAudio, onRejectMixedAudio }: EpisodesProps) {
  // Agar episodes undefined bo'lsa, bo'sh array qaytaramiz
  const inProgressEpisodes = episodes?.filter(ep => ep.status !== "completed") || []
  const completedEpisodes = episodes?.filter(ep => ep.status === "completed") || []

  return (
    <div className="space-y-6">
      {/* Tayyorlanayotgan qismlar */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
          Tayyorlanayotgan qismlar
        </h4>
        <div className="space-y-4">
          {inProgressEpisodes.map((episode) => (
            <div key={episode.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-medium text-gray-900 dark:text-white">
                  {episode.title}
                </h5>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  episode.status === 'mixing' 
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                    : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                }`}>
                  {episode.status === 'mixing' ? 'Ovoz montaji' : 'Ovoz yozish'}
                </span>
              </div>

              {/* Original video va subtitle */}
              <div className="flex items-center gap-4 mb-4">
                <a 
                  href={episode.originalVideo}
                  download
                  className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <Download className="h-4 w-4" />
                  <span>Original video</span>
                </a>
                {episode.subtitle && (
                  <a 
                    href={episode.subtitle}
                    download
                    className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <Download className="h-4 w-4" />
                    <span>Subtitle</span>
                  </a>
                )}
              </div>

              {/* Ovoz aktyorlari */}
              <div className="space-y-3">
                <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Ovozlar ({episode.voiceActors?.length || 0})
                </h6>
                {episode.voiceActors?.map((actor) => (
                  <div key={actor.id} className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {actor.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {actor.character}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {actor.audioFile && actor.status === "recorded" && (
                        <>
                          <button
                            onClick={() => onApproveVoice(episode.id, actor.id)}
                            className="p-1.5 text-green-500 hover:bg-green-500/10 rounded"
                            title="Tasdiqlash"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => onRejectVoice(episode.id, actor.id)}
                            className="p-1.5 text-red-500 hover:bg-red-500/10 rounded"
                            title="Qaytarish"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        actor.status === 'approved' 
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : actor.status === 'rejected'
                          ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                          : actor.status === 'recorded'
                          ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      }`}>
                        {actor.status === 'approved' ? 'Tasdiqlangan'
                          : actor.status === 'rejected' ? 'Qaytarilgan'
                          : actor.status === 'recorded' ? 'Tekshirilmoqda'
                          : 'Kutilmoqda'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ovoz montaji */}
              {episode.status === 'mixing' && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Ovoz montaji
                      </h6>
                      <a 
                        href={episode.mixedAudio}
                        download
                        className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <Download className="h-4 w-4" />
                        <span>Yuklash</span>
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onApproveMixedAudio(episode.id)}
                        className="p-1.5 text-green-500 hover:bg-green-500/10 rounded"
                        title="Tasdiqlash"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onRejectMixedAudio(episode.id)}
                        className="p-1.5 text-red-500 hover:bg-red-500/10 rounded"
                        title="Qaytarish"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tayyor qismlar */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
          Tayyor qismlar
        </h4>
        <div className="space-y-4">
          {completedEpisodes.map((episode) => (
            <div key={episode.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">
                    {episode.title}
                  </h5>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Davomiyligi: {episode.duration}
                  </p>
                </div>
                <a 
                  href={episode.finalVideo}
                  download
                  className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <Download className="h-4 w-4" />
                  <span>Yuklash</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 