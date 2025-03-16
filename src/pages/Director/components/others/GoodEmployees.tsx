import { Award, Star } from 'lucide-react'

interface TopEmployee {
    id: number
    fullName: string
    position: string
    completedProjects: number
    rating: number
    avatar?: string
}
export const GoodEmployees = () => {
    const topEmployees: TopEmployee[] = [
        {
            id: 1,
            fullName: "Alisher Zokirov",
            position: "Ovoz aktyori",
            completedProjects: 15,
            rating: 4.8
        },
        {
            id: 2,
            fullName: "Jamshid Alimov",
            position: "Sound rejissor",
            completedProjects: 12,
            rating: 4.7
        }
    ]
    return (
        <div className="bg-white rounded-lg border">
            <div className="p-4 border-b">
                <h2 className="text-lg font-medium flex items-center">
                    <Award className="h-5 w-5 text-yellow-500 mr-2" />
                    Eng yaxshi xodimlar
                </h2>
            </div>
            <div className="p-4">
                <div className="space-y-4">
                    {topEmployees.map(employee => (
                        <div key={employee.id} className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    {employee.avatar ? (
                                        <img src={employee.avatar} alt={employee.fullName} className="h-10 w-10 rounded-full" />
                                    ) : (
                                        <span className="font-medium text-blue-800">
                                            {employee.fullName.charAt(0)}
                                        </span>
                                    )}
                                </div>
                                <div className="ml-3">
                                    <p className="font-medium">{employee.fullName}</p>
                                    <p className="text-sm text-gray-500">{employee.position}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center text-yellow-500">
                                    <Star className="h-4 w-4 fill-current" />
                                    <span className="ml-1 font-medium">{employee.rating}</span>
                                </div>
                                <p className="text-sm text-gray-500">
                                    {employee.completedProjects} loyiha
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}