interface ProjectStatusBadgeProps {
  status: string
}

export function ProjectStatusBadge({ status }: ProjectStatusBadgeProps) {
  const statusMap: { [key: string]: { label: string, color: string } } = {
    'Yangi': { label: 'Yangi', color: 'bg-blue-100 text-blue-800' },
    'Jarayonda': { label: 'Jarayonda', color: 'bg-yellow-100 text-yellow-800' },
    'Yakunlangan': { label: 'Yakunlangan', color: 'bg-green-100 text-green-800' }
  }

  const config = statusMap[status] || statusMap['Yangi']
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  )
} 