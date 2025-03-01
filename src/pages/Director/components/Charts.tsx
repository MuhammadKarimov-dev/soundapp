import * as React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer
} from 'recharts'

const projectData = [
  { name: 'Yanvar', completed: 4, active: 6 },
  { name: 'Fevral', completed: 3, active: 8 },
  { name: 'Mart', completed: 5, active: 7 },
  { name: 'April', completed: 6, active: 5 },
  { name: 'May', completed: 4, active: 9 },
  { name: 'Iyun', completed: 7, active: 4 },
]

const employeeActivityData = [
  { name: 'Dush', tasks: 15 },
  { name: 'Sesh', tasks: 22 },
  { name: 'Chor', tasks: 18 },
  { name: 'Pay', tasks: 25 },
  { name: 'Jum', tasks: 20 },
  { name: 'Shan', tasks: 12 },
  { name: 'Yak', tasks: 8 },
]

export function ProjectsChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={projectData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="completed" name="Yakunlangan" fill="#22c55e" />
        <Bar dataKey="active" name="Faol" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function EmployeeActivityChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={employeeActivityData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="tasks" 
          name="Bajarilgan vazifalar" 
          stroke="#3b82f6" 
          strokeWidth={2} 
        />
      </LineChart>
    </ResponsiveContainer>
  )
} 