'use client';

import Sidebar from '@/app/core/SideBar/Sidebar';
import HeaderBar from '@/app/core/components/HeaderBar';
import { Bar, Pie, Doughnut, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
} from 'chart.js';
import {
    FaTicketAlt,
    FaClock,
    FaLayerGroup,
    FaChartLine,
    FaArrowsAltH,
    FaCheckCircle,
} from 'react-icons/fa';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);

// 🎨 Couleurs douces et vives
const vividColors = ['#a78bfa', '#f472b6', '#fde047', '#4ade80', '#60a5fa'];

const kpisData = [
    { label: 'Incidents déclarés', value: 128, icon: <FaTicketAlt className="text-white text-xl" />, border: vividColors[1] },
    { label: 'Incidents en cours', value: 37, icon: <FaClock className="text-white text-xl" />, border: vividColors[0] },
    { label: 'Incidents résolus', value: 85, icon: <FaCheckCircle className="text-white text-xl" />, border: vividColors[3] },
    { label: 'Temps moyen résolution', value: '2.8 h', icon: <FaChartLine className="text-white text-xl" />, border: vividColors[4] },
    { label: 'Top DU impacté', value: 'Interop', icon: <FaLayerGroup className="text-white text-xl" />, border: vividColors[2] },
    { label: 'Taux de transfert', value: '12 %', icon: <FaArrowsAltH className="text-white text-xl" />, border: vividColors[3] },
];

const statusData = {
    Déclaré: 40,
    Affecté: 25,
    'En cours d’analyse': 18,
    Transféré: 10,
    Résolu: 85,
};

const priorityData = {
    Critique: 20,
    Majeur: 45,
    Moyen: 50,
    Mineur: 13,
};

const duData = {
    BillPayment: 15,
    Bankup: 22,
    Interop: 42,
    OpenR: 30,
    Cockpit: 25,
};

const resolvedByDay = [5, 11, 8, 14, 16];

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { position: 'bottom', labels: { color: '#4b5563' } },
        tooltip: { titleColor: '#4b5563', bodyColor: '#4b5563' },
    },
    scales: {
        y: { ticks: { color: '#4b5563' }, grid: { color: '#e5e7eb' } },
        x: { ticks: { color: '#4b5563' }, grid: { color: '#e5e7eb' } },
    },
};

export default function DashboardSGFIX() {
    const totalCritique = priorityData.Critique;
    const totalOthers = Object.values(priorityData).reduce((sum, val) => sum + val, 0) - totalCritique;

    return (
        <div className="bg-gray-100 min-h-screen flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <HeaderBar />

                <main className="px-10 py-10 ml-48 w-full max-w-screen-xl">
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
                        Tableau de bord – Suivi des incidents
                    </h1>

                    {/* KPI Container */}
                    <div className="mb-10 bg-white p-6 rounded-xl shadow-md border">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Indicateurs Clés de Performance</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {kpisData.map((kpi, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white border-2 rounded-lg p-4 flex flex-col items-center justify-center shadow"
                                    style={{ borderColor: kpi.border }}
                                >
                                    <div className="bg-gray-800 rounded-full p-2 mb-2">
                                        {kpi.icon}
                                    </div>
                                    <span className="text-sm font-medium text-gray-500">{kpi.label}</span>
                                    <span className="text-xl font-bold text-gray-800">{kpi.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Graphs Container */}
                    <div className="bg-white p-6 rounded-xl shadow-md border">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Visualisation des Données</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm h-72">
                                <h2 className="text-sm font-medium text-gray-700 mb-2">Répartition des statuts</h2>
                                <Pie
                                    data={{
                                        labels: Object.keys(statusData),
                                        datasets: [{ data: Object.values(statusData), backgroundColor: vividColors }],
                                    }}
                                    options={chartOptions}
                                />
                            </div>

                            <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm h-72">
                                <h2 className="text-sm font-medium text-gray-700 mb-2">Répartition des priorités</h2>
                                <Doughnut
                                    data={{
                                        labels: Object.keys(priorityData),
                                        datasets: [{ data: Object.values(priorityData), backgroundColor: vividColors }],
                                    }}
                                    options={chartOptions}
                                />
                            </div>

                            <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm h-72">
                                <h2 className="text-sm font-medium text-gray-700 mb-2">Incidents par DU</h2>
                                <Bar
                                    data={{
                                        labels: Object.keys(duData),
                                        datasets: [{ data: Object.values(duData), backgroundColor: vividColors }],
                                    }}
                                    options={{
                                        ...chartOptions,
                                        indexAxis: 'y',
                                        plugins: { legend: { display: false } },
                                    }}
                                />
                            </div>

                            <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm h-72">
                                <h2 className="text-sm font-medium text-gray-700 mb-2">Incidents résolus par jour</h2>
                                <Line
                                    data={{
                                        labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'],
                                        datasets: [{
                                            label: 'Résolus',
                                            data: resolvedByDay,
                                            borderColor: vividColors[3],
                                            backgroundColor: '#f0f9ff',
                                            tension: 0.4,
                                        }],
                                    }}
                                    options={chartOptions}
                                />
                            </div>

                            <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm h-72">
                                <h2 className="text-sm font-medium text-gray-700 mb-2">Taux d’incidents critiques</h2>
                                <Pie
                                    data={{
                                        labels: ['Critiques', 'Autres'],
                                        datasets: [{
                                            data: [totalCritique, totalOthers],
                                            backgroundColor: [vividColors[0], '#cbd5e1'],
                                        }],
                                    }}
                                    options={chartOptions}
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
