import { Routes, Route } from "react-router-dom"
import { DashboardOverview } from "./components/DashboardOverview"
import { ProjectsTable } from "./components/ProjectsTable"
import ProjectDetails from "./components/ProjectDetails"
import { EmployeesTable } from "./components/EmployeesTable"
import { FinanceOverview } from "./components/FinanceOverview"

export function DirectorRoutes() {
  return (
    <Routes>
      <Route index element={<DashboardOverview />} />
      <Route path="projects" element={<ProjectsTable />} />
      <Route path="projects/:id" element={<ProjectDetails />} />
      <Route path="employees" element={<EmployeesTable />} />
      <Route path="finances" element={<FinanceOverview />} />
    </Routes>
  )
} 