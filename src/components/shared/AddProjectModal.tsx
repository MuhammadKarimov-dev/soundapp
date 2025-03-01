import * as React from "react"
import { X, Upload } from "lucide-react"
import { Modal } from "../ui/Modal"
import { SearchableSelect } from "../ui/SearchableSelect"
import { EpisodeUpload } from "../ui/EpisodeUpload"
import { Button } from "../ui/button"

interface AddProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (project: ProjectFormData) => void
  employees: Employee[]
  initialData?: ProjectFormData
  userRole: 'director' | 'rejissor'
  currentUser?: {
    id: number
    fullName: string
    position: string
  }
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
  voiceActors: string[]
  editor: string
  episodes: Episode[]
}

const projectStatuses = ["Yangi", "Jarayonda", "Yakunlangan"]

export default function AddProjectModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  employees = [],
  initialData,
  userRole,
  currentUser
}: AddProjectModalProps) {
  const [formData, setFormData] = React.useState<ProjectFormData>(
    initialData || {
      title: "",
      description: "",
      deadline: "",
      budget: "",
      status: "Yangi",
      thumbnail: null,
      director: currentUser?.id.toString() || "",
      soundDirectors: [],
      voiceActors: [],
      editor: "",
      episodes: []
    }
  )

  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  // Xodimlarni lavozimi bo'yicha filtrlash
  const directors = employees.filter(e => e.position === "Rejissor")
  const soundDirectors = employees.filter(e => e.position === "Sound rejissor")
  const voiceActors = employees.filter(e => e.position === "Ovoz aktyori")
  const editors = employees.filter(e => e.position === "Tahrirchi")

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-none tracking-tight">
            {initialData ? "Loyihani tahrirlash" : "Yangi loyiha qo'shish"}
          </h2>
          <button 
            onClick={onClose}
            className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Yopish</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Loyiha nomi
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Masalan: Anime dublyaj"
              />
            </div>

            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Tavsif
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                rows={3}
                placeholder="Loyiha haqida qisqacha ma'lumot"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Tugash muddati
                </label>
                <input
                  type="date"
                  required
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              {userRole === 'director' && (
                <div>
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Byudjet (so'm)
                  </label>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="10000000"
                  />
                </div>
              )}
            </div>

            {userRole === 'director' && (
              <div>
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Rejissor
                </label>
                <SearchableSelect
                  options={directors}
                  selectedValues={[formData.director]}
                  onChange={values => setFormData({ ...formData, director: values[0] })}
                  placeholder="Rejissorni tanlang"
                  multiple={false}
                />
              </div>
            )}

            {userRole === 'director' && (
              <div>
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Ovoz rejissorlari
                </label>
                <SearchableSelect
                  options={soundDirectors}
                  selectedValues={formData.soundDirectors}
                  onChange={values => setFormData({ ...formData, soundDirectors: values })}
                  placeholder="Ovoz rejissorlarini tanlang"
                />
              </div>
            )}

            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Ovoz aktyorlari
              </label>
              <SearchableSelect
                options={voiceActors}
                selectedValues={formData.voiceActors}
                onChange={values => setFormData({ ...formData, voiceActors: values })}
                placeholder="Ovoz aktyorlarini tanlang"
              />
            </div>

            {userRole === 'director' && (
              <div>
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Tahrirchi
                </label>
                <select
                  value={formData.editor}
                  onChange={(e) => setFormData({ ...formData, editor: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Tanlang</option>
                  {editors.map((editor) => (
                    <option key={editor.id} value={editor.id}>
                      {editor.fullName}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Film qismlari
              </label>
              <EpisodeUpload
                episodes={formData.episodes}
                onChange={episodes => setFormData({ ...formData, episodes })}
              />
            </div>

            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Loyiha rasmi
              </label>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.files?.[0] || null })}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                className="w-full h-32 mt-2"
                onClick={() => fileInputRef.current?.click()}
              >
                {formData.thumbnail ? (
                  <img
                    src={URL.createObjectURL(formData.thumbnail)}
                    alt="Loyiha rasmi"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="h-8 w-8 mb-2 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      Rasm yuklash
                    </span>
                  </div>
                )}
              </Button>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button 
              type="button"
              variant="ghost"
              onClick={onClose}
            >
              Bekor qilish
            </Button>
            <Button type="submit">
              {initialData ? "Saqlash" : "Qo'shish"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
} 