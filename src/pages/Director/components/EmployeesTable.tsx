import * as React from "react"
import { 
  User,
  Pencil, 
  Trash2,
  UserPlus,
  Search,
  Users
} from "lucide-react"
import { AddEmployeeModal, EmployeeFormData } from "./AddEmployeeModal"

interface Employee {
  id: number;
  fullName: string;
  birthYear: string;
  city: string;
  position: string;
  salary: number;
  joinDate: string;
  status: string;
  email: string;
  phoneNumber: string;
  username: string;
  password: string;
}

const initialEmployees: Employee[] = [
  {
    id: 1,
    fullName: "Alisher Zokirov",
    birthYear: "1990",
    city: "Toshkent",
    position: "Ovoz aktyori",
    salary: 2500000,
    joinDate: "2024-01-15",
    status: "Faol",
    email: "alisher@example.com",
    phoneNumber: "+998901234567",
    username: "alisher_zokirov",
    password: "password123"
  },
  // ... boshqa xodimlar
]

export function EmployeesTable() {
  const [employees, setEmployees] = React.useState<Employee[]>(initialEmployees)
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false)
  const [editingEmployee, setEditingEmployee] = React.useState<Employee | null>(null)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [filterPosition, setFilterPosition] = React.useState("")

  const handleAddEmployee = (data: EmployeeFormData) => {
    const newEmployee: Employee = {
      id: employees.length + 1,
      fullName: data.fullName,
      birthYear: data.birthYear,
      city: data.city,
      position: data.position,
      salary: Number(data.salary),
      joinDate: new Date().toISOString().split('T')[0],
      status: data.status,
      email: data.email,
      phoneNumber: data.phoneNumber,
      username: data.username,
      password: data.password
    }
    
    setEmployees([...employees, newEmployee])
    setIsAddModalOpen(false)
  }

  const handleDeleteEmployee = (id: number) => {
    if (window.confirm("Rostdan ham bu xodimni o'chirmoqchimisiz?")) {
      setEmployees(employees.filter(emp => emp.id !== id))
    }
  }

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee)
    setIsEditModalOpen(true)
  }

  const handleUpdateEmployee = (data: EmployeeFormData) => {
    if (!editingEmployee) return

    const updatedEmployee: Employee = {
      ...editingEmployee,
      fullName: data.fullName,
      birthYear: data.birthYear,
      city: data.city,
      position: data.position,
      salary: Number(data.salary),
      status: data.status,
      email: data.email,
      phoneNumber: data.phoneNumber,
      username: data.username,
      password: data.password
    }

    setEmployees(employees.map(emp => 
      emp.id === editingEmployee.id ? updatedEmployee : emp
    ))
    setIsEditModalOpen(false)
    setEditingEmployee(null)
  }

  const filteredEmployees = employees.filter(emp => 
    emp.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.city.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Hodimlar</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Yangi hodim qo'shish
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Jami xodimlar</p>
              <p className="text-2xl font-semibold">{employees.length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Faol xodimlar</p>
              <p className="text-2xl font-semibold">
                {employees.filter(e => e.status === "Faol").length}
              </p>
            </div>
            <User className="h-8 w-8 text-green-500" />
          </div>
        </div>
        {/* ... boshqa statistikalar ... */}
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4 bg-white p-4 rounded-lg border">
        <div className="flex-1 flex items-center space-x-2">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Xodimlarni qidirish..."
            className="flex-1 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="border rounded-md p-2"
          onChange={(e) => setFilterPosition(e.target.value)}
        >
          <option value="">Barcha lavozimlar</option>
          {/* ... boshqa lavozimlar ... */}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  F.I.O
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Lavozim
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amallar
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {employee.fullName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {employee.position}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                      Faol
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300">
                      Tahrirlash
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Yangi qo'shish modali */}
      <AddEmployeeModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddEmployee}
      />

      {/* Tahrirlash modali */}
      {editingEmployee && (
        <AddEmployeeModal 
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setEditingEmployee(null)
          }}
          onSubmit={handleUpdateEmployee}
          initialData={{
            fullName: editingEmployee.fullName,
            birthYear: editingEmployee.birthYear,
            city: editingEmployee.city,
            position: editingEmployee.position,
            salary: editingEmployee.salary.toString(),
            status: editingEmployee.status,
            phoneNumber: editingEmployee.phoneNumber,
            email: editingEmployee.email,
            experience: "",
            username: editingEmployee.username,
            password: editingEmployee.password
          }}
        />
      )}
    </div>
  )
} 