import * as React from "react"
import { X, Upload } from "lucide-react"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loyiha nomi
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border rounded-md"
              placeholder="Film nomi"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Holati
            </label>
            <select
              required
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full p-2 border rounded-md"
            >
              {projectStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loyiha haqida
          </label>
          <textarea
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2 border rounded-md"
            rows={3}
            placeholder="Loyiha tavsifi..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Muddat
            </label>
            <input
              type="date"
              required
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Byudjet (so'm)
            </label>
            <input
              type="number"
              required
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full p-2 border rounded-md"
              placeholder="10000000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rejissor *
          </label>
          <SearchableSelect
            options={directors}
            selectedValues={formData.director ? [formData.director] : []}
            onChange={values => setFormData({ ...formData, director: values[0] })}
            placeholder="Rejissorni tanlang"
            multiple={false}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tahrirchi
          </label>
          <select
            required
            value={formData.editor}
            onChange={(e) => setFormData({ ...formData, editor: e.target.value })}
            className="w-full p-2 border rounded-md"
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Film qismlari
          </label>
          <EpisodeUpload
            episodes={formData.episodes}
            onChange={episodes => setFormData({ ...formData, episodes })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loyiha rasmi
          </label>
          <input
            type="file"
            ref={fileInputRef.thumbnail}
            accept="image/*"
            onChange={(e) => handleFileChange('thumbnail', e.target.files?.[0] || null)}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.thumbnail.current?.click()}
            className="w-full p-2 border-2 border-dashed rounded-md hover:bg-gray-50 flex flex-col items-center"
          >
            <Upload className="h-6 w-6 text-gray-400" />
            <span className="text-sm text-gray-500">
              {formData.thumbnail ? formData.thumbnail.name : "Rasm yuklash"}
            </span>
          </button>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50"
          >
            Bekor qilish
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {initialData ? "Saqlash" : "Qo'shish"}
          </button>
        </div>
      </form>
    </Modal>
  )
} 