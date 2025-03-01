import * as React from "react"
import { Modal } from "./ui/Modal"
import { generateCredentials } from "../utils/generateCredentials"

interface AddEmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (employee: EmployeeFormData) => void
  initialData?: EmployeeFormData
}

export interface EmployeeFormData {
  fullName: string
  birthYear: string
  city: string
  position: string
  salary: string
  status: string
  phoneNumber: string
  email: string
  experience: string
  username: string
  password: string
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
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? "Xodimni tahrirlash" : "Yangi xodim qo'shish"}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <h3 className="font-medium">Shaxsiy ma'lumotlar</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                F.I.O *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full p-2 border rounded-md"
                placeholder="Ism Familiya"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lavozimi *
              </label>
              <select
                required
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Lavozimni tanlang</option>
                {positions.map((pos) => (
                  <option key={pos.id} value={pos.title}>
                    {pos.title} {pos.maxCount ? `(max: ${pos.maxCount})` : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tug'ilgan yili *
              </label>
              <input
                type="text"
                required
                value={formData.birthYear}
                onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
                className="w-full p-2 border rounded-md"
                placeholder="1990"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Yashash shahri *
              </label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full p-2 border rounded-md"
                placeholder="Toshkent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefon raqami *
              </label>
              <input
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="w-full p-2 border rounded-md"
                placeholder="+998901234567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2 border rounded-md"
                placeholder="example@mail.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Oylik maoshi (so'm) *
              </label>
              <input
                type="number"
                required
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                className="w-full p-2 border rounded-md"
                placeholder="2500000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tajribasi (yil) *
              </label>
              <input
                type="number"
                required
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                className="w-full p-2 border rounded-md"
                placeholder="5"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <h3 className="font-medium">Tizimga kirish ma'lumotlari</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Login *
              </label>
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full p-2 border rounded-md"
                placeholder="username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Parol *
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full p-2 border rounded-md"
                placeholder="••••••••"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
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