import { Routes, Route } from "react-router-dom"
import DirectorLayout from "./Layout"
import { DashboardOverview } from "./components/DashboardOverview"
import { ProjectsTable } from "./components/ProjectsTable"
import { EmployeesTable } from "./components/EmployeesTable"
import { FinanceOverview } from "./components/FinanceOverview"
import ProjectDetails from "./components/ProjectDetails"
import Profile from "./components/Profile"

export function DirectorRoutes() {
  return (
    <Routes>
      <Route element={<DirectorLayout />}>
        <Route index element={<DashboardOverview />} />
        <Route path="projects" element={<ProjectsTable />} />
        <Route path="projects/:id" element={<ProjectDetails />} />
        <Route path="employees" element={<EmployeesTable />} />
        <Route path="finances" element={<FinanceOverview />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  )
} 