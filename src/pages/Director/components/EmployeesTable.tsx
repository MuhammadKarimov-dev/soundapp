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
        <div>
          <h2 className="text-2xl font-bold">Xodimlar</h2>
          <p className="text-gray-500">Barcha xodimlar ro'yxati</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Yangi xodim qo'shish
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
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">F.I.O</th>
                <th className="hidden sm:table-cell px-4 py-3 text-left text-sm font-medium text-gray-500">Login</th>
                <th className="hidden md:table-cell px-4 py-3 text-left text-sm font-medium text-gray-500">Lavozimi</th>
                <th className="hidden lg:table-cell px-4 py-3 text-left text-sm font-medium text-gray-500">Telefon</th>
                <th className="hidden xl:table-cell px-4 py-3 text-left text-sm font-medium text-gray-500">Oyligi</th>
                <th className="hidden md:table-cell px-4 py-3 text-left text-sm font-medium text-gray-500">Holati</th>
                <th className="px-4 py-3 w-[100px]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span className="font-medium text-blue-800">
                          {employee.fullName.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">{employee.fullName}</p>
                        <div className="md:hidden">
                          <p className="text-sm text-gray-500">{employee.position}</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            employee.status === "Faol" 
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {employee.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden sm:table-cell px-4 py-3 text-sm">{employee.username}</td>
                  <td className="hidden md:table-cell px-4 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {employee.position}
                    </span>
                  </td>
                  <td className="hidden lg:table-cell px-4 py-3 text-sm">{employee.phoneNumber}</td>
                  <td className="hidden xl:table-cell px-4 py-3 text-sm">{employee.salary.toLocaleString()} so'm</td>
                  <td className="hidden md:table-cell px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      employee.status === "Faol" 
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleEditEmployee(employee)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Pencil className="h-4 w-4 text-gray-500" />
                      </button>
                      <button 
                        onClick={() => handleDeleteEmployee(employee.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
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