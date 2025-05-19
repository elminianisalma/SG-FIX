'use client';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    Legend,
} from 'recharts';

export default function AdminKpiDashboard() {
    const statusData = [
        { name: 'Déclaré', value: 14, color: '#facc15' },
        { name: 'Affecté', value: 10, color: '#60a5fa' },
        { name: 'Résolu', value: 8, color: '#34d399' },
    ];

    const resolutionTimeTrend = [
        { name: 'Lun', time: 3.4 },
        { name: 'Mar', time: 2.8 },
        { name: 'Mer', time: 4.1 },
        { name: 'Jeu', time: 3.7 },
        { name: 'Ven', time: 3.1 },
    ];

    const serviceImpactData = [
        { name: 'Interop', value: 7, color: '#f87171' },
        { name: 'Bankup', value: 5, color: '#fb923c' },
        { name: 'Cockpit', value: 3, color: '#a78bfa' },
    ];

    return (
        <div className="bg-gray-50 rounded-xl shadow-inner px-4 py-6 mb-6">
            <h2 className="text-lg font-bold text-gray-700 mb-4 text-center">Résumé visuel des incidents</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
                {/* Répartition des statuts */}
                <div className="bg-white rounded-xl shadow p-4">
                    <h3 className="text-sm font-medium text-gray-600 mb-2 text-center">Répartition des statuts</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={statusData}>
                            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                            <YAxis tick={{ fontSize: 11 }} />
                            <Tooltip itemStyle={{ fontSize: 11 }} labelStyle={{ fontSize: 11 }} />
                            <Bar dataKey="value">
                                {statusData.map((entry, index) => (
                                    <Cell key={index} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Temps moyen de résolution */}
                <div className="bg-white rounded-xl shadow p-4">
                    <h3 className="text-sm font-medium text-gray-600 mb-2 text-center">Temps moyen de résolution (h)</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={resolutionTimeTrend}>
                            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                            <YAxis tick={{ fontSize: 11 }} />
                            <Tooltip itemStyle={{ fontSize: 11 }} labelStyle={{ fontSize: 11 }} />
                            <Line type="monotone" dataKey="time" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Top services impactés */}
                <div className="bg-white rounded-xl shadow p-4">
                    <h3 className="text-sm font-medium text-gray-600 mb-2 text-center">Top services impactés</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={serviceImpactData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={60}
                                label={{ style: { fontSize: 11 } }}
                            >
                                {serviceImpactData.map((entry, index) => (
                                    <Cell key={index} fill={entry.color} />
                                ))}
                            </Pie>
                            <Legend verticalAlign="bottom" height={30} wrapperStyle={{ fontSize: '11px' }} />
                            <Tooltip itemStyle={{ fontSize: 11 }} labelStyle={{ fontSize: 11 }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
