import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface MonthlyData {
    name: string
    loyihalar: number
    daromad: number
}

const monthlyData: MonthlyData[] = [
    { name: "Yanvar", loyihalar: 4, daromad: 120 },
    { name: "Fevral", loyihalar: 6, daromad: 150 },
    { name: "Mart", loyihalar: 8, daromad: 180 },
    { name: "April", loyihalar: 7, daromad: 190 },
    { name: "May", loyihalar: 9, daromad: 220 },
    { name: "Iyun", loyihalar: 11, daromad: 250 }
]
const MonthlyProjects = () => {
    return (
        <div className="bg-white rounded-lg border p-4">
            <h2 className="text-lg font-medium mb-4">Oylik statistika</h2>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={monthlyData}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Area
                            yAxisId="left"
                            type="monotone"
                            dataKey="loyihalar"
                            stroke="#8884d8"
                            fill="#8884d8"
                            name="Loyihalar"
                        />
                        <Area
                            yAxisId="right"
                            type="monotone"
                            dataKey="daromad"
                            stroke="#82ca9d"
                            fill="#82ca9d"
                            name="Daromad (mln)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default MonthlyProjects