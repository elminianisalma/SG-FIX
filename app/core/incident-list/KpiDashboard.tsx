import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts";

interface KpiDashboardProps {
    incidentsCount: number;
    pendingCount: number;
    completedCount: number;
    cancelledCount: number;
}

export default function KpiDashboard({ incidentsCount, pendingCount, completedCount, cancelledCount }: KpiDashboardProps) {
    const data = [
        { name: "Pending", value: pendingCount, color: "#f1e887" },
        { name: "Completed", value: completedCount, color: "#81dfa1" },
        { name: "Cancelled", value: cancelledCount, color: "#df2b4b" }
    ];

    const trendData = [
        { name: "Jan", incidents: 5 },
        { name: "Feb", incidents: 8 },
        { name: "Mar", incidents: 7 },
        { name: "Apr", incidents: 6 },
        { name: "May", incidents: 9 }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-[#F4F5F9] p-6 rounded-lg">
            <div className="bg-[#DDDFE6] p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold text-[#252C41] mb-4">Incidents Status</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <XAxis dataKey="name" stroke="#252C41" />
                        <YAxis stroke="#252C41" />
                        <Tooltip />
                        <Bar dataKey="value">
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-[#DDDFE6] p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold text-[#252C41] mb-4">Incidents Breakdown</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Legend wrapperStyle={{ color: '#252C41' }} />
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-[#DDDFE6] p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold text-[#252C41] mb-4 font-bold">Incident Trend</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trendData}>
                        <XAxis dataKey="name" stroke="#252C41" />
                        <YAxis stroke="#252C41" />
                        <Tooltip />
                        <Line type="monotone" dataKey="incidents" stroke="#10B981" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
