import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const Conditions = () => {
    const projectStatusData = [
        { name: 'Yangi', value: 5 },
        { name: 'Jarayonda', value: 12 },
        { name: 'Yakunlangan', value: 8 },
        { name: 'To\'xtatilgan', value: 2 }
    ]

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
    return (
        <div className="bg-white rounded-lg border p-4">
            <h2 className="text-lg font-medium mb-4">Loyihalar holati</h2>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={projectStatusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {projectStatusData.map((index: any) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Conditions