import * as React from "react"
import { Modal } from "../../../components/ui/Modal"
import { generateCredentials } from "../utils/generateCredentials"
import { EmployeeFormData } from "../../../types/EmployeeFormData"

interface AddEmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (employee: EmployeeFormData) => void
  initialData?: EmployeeFormData
}

const positions = [
  { id: 1, title: "Rejissor", maxCount: 1 },
  { id: 2, title: "Sound rejissor", maxCount: 1 },
  { id: 3, title: "Ovoz aktyori", maxCount: null },
  { id: 4, title: "Tahrirchi", maxCount: 1 },
]

export function AddEmployeeModal({ isOpen, onClose, onSubmit, initialData }: AddEmployeeModalProps) {
  const [formData, setFormData] = React.useState<EmployeeFormData>(
    initialData || {
      fullName: "",
      birthYear: "",
      city: "",
      position: "",
      salary: "",
      status: "Faol",
      phoneNumber: "",
      email: "",
      experience: "",
      username: "",
      password: ""
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      fullName: "",
      birthYear: "",
      city: "",
      position: "",
      salary: "",
      status: "Faol",
      phoneNumber: "",
      email: "",
      experience: "",
      username: "",
      password: ""
    })
  }

  // F.I.O yoki lavozim o'zgarganda login/parol generatsiya qilish
  React.useEffect(() => {
    if (!initialData && formData.fullName && formData.position) {
      const { username, password } = generateCredentials(formData.fullName, formData.position)
      setFormData(prev => ({
        ...prev,
        username,
        password
      }))
    }
  }, [formData.fullName, formData.position, initialData])

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Yangi xodim qo'shish"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            F.I.O *
          </label>
          <input type="text" className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" placeholder="Ism Familiya" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} required/>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Lavozimi *
          </label>
          <select  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })}>
            <option value="">Lavozimni tanlang</option>
            {positions.map((pos) => (
              <option key={pos.id} value={pos.title}>
                {pos.title} {pos.maxCount ? `(max: ${pos.maxCount})` : ''}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tug'ilgan yili *
            </label>
            <input type="text" className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" placeholder="1990" value={formData.birthYear} onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })} required/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Yashash shahri *
            </label>
            <input type="text" className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" placeholder="Toshkent" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} required/>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Telefon raqami *
            </label>
            <input type="tel" className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" placeholder="+998901234567" value={formData.phoneNumber} onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} required/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input type="email" className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" placeholder="example@mail.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Oylik maoshi (so'm) *
            </label>
            <input type="number" className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" placeholder="2500000" value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: e.target.value })} required/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tajribasi (yil) *
            </label>
            <input type="number" className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" placeholder="5" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} required/>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Login *
            </label>
            <input type="text" className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" placeholder="username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} required/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Parol *
            </label>
            <input type="password" className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required/>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">Bekor qilish</button>
          <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg">Qo'shish</button>
        </div>
      </form>
    </Modal>
  )
} 