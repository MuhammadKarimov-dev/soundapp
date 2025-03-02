import * as React from "react"
import { X, Upload, Plus } from "lucide-react"
import { Modal } from "./ui/Modal"
import { SearchableSelect } from "./ui/SearchableSelect"
import { EpisodeUpload, Episode } from "./ui/EpisodeUpload"

interface AddProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (project: ProjectFormData) => void
  employees: Employee[]
  initialData?: ProjectFormData // Tahrirlash uchun
}

interface Employee {
  id: number
  fullName: string
  position: string
}

export interface ProjectFormData {
  title: string
  description: string
  deadline: string
  budget: string
  status: string
  thumbnail: File | null
  director: string
  soundDirectors: string[]
  voiceActors: string[] // ovoz aktyorlarining ID'lari
  editor: string
  episodes: Episode[]
}

const projectStatuses = ["Yangi", "Jarayonda", "Yakunlangan"]

// Default xodimlar ma'lumotlari
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

export function AddProjectModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  employees = defaultEmployees,
  initialData 
}: AddProjectModalProps) {
  const [formData, setFormData] = React.useState<ProjectFormData>(
    initialData || {
      title: "",
      description: "",
      deadline: "",
      budget: "",
      status: "Yangi",
      thumbnail: null,
      director: "",
      soundDirectors: [],
      voiceActors: [],
      editor: "",
      episodes: []
    }
  )

  // FormData'ni initialData o'zgarganda yangilash
  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const fileInputRef = {
    thumbnail: React.useRef<HTMLInputElement>(null),
  }

  const handleFileChange = (type: 'thumbnail', file: File | null) => {
    setFormData(prev => ({ ...prev, [type]: file }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    // Faqat yangi loyiha qo'shilganda tozalash
    if (!initialData) {
      setFormData({
        title: "",
        description: "",
        deadline: "",
        budget: "",
        status: "Yangi",
        thumbnail: null,
        director: "",
        soundDirectors: [],
        voiceActors: [],
        editor: "",
        episodes: []
      })
    }
  }

  // Xodimlarni lavozimlar bo'yicha filtrlash
  const directors = employees.filter(emp => emp.position === "Rejissor")
  const soundDirectors = employees.filter(emp => emp.position === "Sound rejissor")
  const voiceActors = employees.filter(emp => emp.position === "Ovoz aktyori")
  const editors = employees.filter(emp => emp.position === "Tahrirchi")

  if (!isOpen) return null

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={initialData ? "Loyihani tahrirlash" : "Yangi loyiha qo'shish"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Loyiha nomi *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full rounded-lg bg-slate-200 dark:bg-slate-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="Film nomi"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Holati
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full rounded-lg bg-slate-200 dark:bg-slate-700 px-3 py-2 text-gray-900 dark:text-white"
            >
              {projectStatuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Loyiha haqida
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full rounded-lg bg-slate-200 dark:bg-slate-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            rows={3}
            placeholder="Loyiha tavsifi..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Muddat *
            </label>
            <input
              type="date"
              required
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="w-full rounded-lg bg-slate-200 dark:bg-slate-700 px-3 py-2 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Byudjet (so'm)
            </label>
            <input
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full rounded-lg bg-slate-200 dark:bg-slate-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder="10000000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Rejissor *
          </label>
          <select
            required
            value={formData.director}
            onChange={(e) => setFormData({ ...formData, director: e.target.value })}
            className="w-full rounded-lg bg-slate-200 dark:bg-slate-700 px-3 py-2 text-gray-900 dark:text-white"
          >
            <option value="">Rejissorni tanlang</option>
            {directors.map((director) => (
              <option key={director.id} value={director.id}>{director.fullName}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Ovoz rejissorlari *
          </label>
          <SearchableSelect
            options={soundDirectors}
            selectedValues={formData.soundDirectors}
            onChange={values => setFormData({ ...formData, soundDirectors: values })}
            placeholder="Ovoz rejissorlarini tanlang"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Ovoz aktyorlari *
          </label>
          <SearchableSelect
            options={voiceActors}
            selectedValues={formData.voiceActors}
            onChange={values => setFormData({ ...formData, voiceActors: values })}
            placeholder="Ovoz aktyorlarini tanlang"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tahrirchi
          </label>
          <select
            required
            value={formData.editor}
            onChange={(e) => setFormData({ ...formData, editor: e.target.value })}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md text-gray-900 dark:text-white"
          >
            <option value="">Tanlang</option>
            {editors.map((editor) => (
              <option key={editor.id} value={editor.id}>
                {editor.fullName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Film qismlari
          </label>
          <EpisodeUpload
            episodes={formData.episodes}
            onChange={episodes => setFormData({ ...formData, episodes })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Loyiha rasmi
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 dark:border-slate-600 border-dashed rounded-lg bg-slate-200 dark:bg-slate-700">
            <div className="space-y-1 text-center">
              <Plus className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600 dark:text-gray-400">
                <label className="relative cursor-pointer rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                  <span>Rasm yuklash</span>
                  <input 
                    type="file" 
                    className="sr-only"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) setFormData({ ...formData, thumbnail: file })
                    }}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG, GIF (max. 2MB)
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
            {initialData ? "Saqlash" : "Qo'shish"}
          </button>
        </div>
      </form>
    </Modal>
  )
} 