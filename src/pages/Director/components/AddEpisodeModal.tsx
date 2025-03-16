import React from "react"
import { Modal } from "../../../components/ui/Modal"
import { Upload } from "lucide-react"
import { EpisodeFormData } from "../../../types/EpisodeFormData"

interface AddEpisodeModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: EpisodeFormData) => void
}



export function AddEpisodeModal({ isOpen, onClose, onSubmit }: AddEpisodeModalProps) {
  const [formData, setFormData] = React.useState<EpisodeFormData>({
    title: "",
    duration: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Yangi qism qo'shish"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Qism nomi *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full rounded-lg bg-slate-200 dark:bg-slate-700 px-3 py-2 text-gray-900 dark:text-white"
            placeholder="1-qism"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Davomiyligi *
          </label>
          <input
            type="text"
            required
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            className="w-full rounded-lg bg-slate-200 dark:bg-slate-700 px-3 py-2 text-gray-900 dark:text-white"
            placeholder="23:45"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Video
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 dark:border-slate-600 border-dashed rounded-lg bg-slate-200 dark:bg-slate-700">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600 dark:text-gray-400">
                <label className="relative cursor-pointer rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                  <span>Video yuklash</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept="video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) setFormData({ ...formData, video: file })
                    }}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                MP4, AVI, MKV (max. 2GB)
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Subtitle
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 dark:border-slate-600 border-dashed rounded-lg bg-slate-200 dark:bg-slate-700">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600 dark:text-gray-400">
                <label className="relative cursor-pointer rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                  <span>Subtitle yuklash</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept=".srt,.vtt"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) setFormData({ ...formData, subtitle: file })
                    }}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SRT, VTT
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg"
          >
            Bekor qilish
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg"
          >
            Qo'shish
          </button>
        </div>
      </form>
    </Modal>
  )
} 