"use client";

import { useState } from "react";
import Sidebar from "@/app/core/SideBar/SideBar";
import { FaExclamationTriangle, FaCheckCircle, FaClock, FaTachometerAlt, FaSearch } from "react-icons/fa"; // Icônes pour les KPI
import { Bar, Radar, Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, RadialLinearScale, ArcElement, PointElement, LineElement, Filler } from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Styles du DatePicker

// Enregistrement des composants Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    ArcElement,
    PointElement,
    LineElement,
    Filler
);

// Exemple de données pour les KPI
const kpiData = {
    totalIncidents: 175000,
    totalResolved: 45100,
    totalEscalated: 12000,
    slaMet: 120000,
    slaMissed: 55000,
    slaPerformance: {
        high: 1500,
        medium: 1200,
        low: 1000,
    },
};

// Répartition des incidents par environnement
const incidentEnvironmentDistribution = {
    HT: 800,
    HF: 600,
    DEV: 400,
};

// Données pour le graphique (Bar - Répartition des incidents par environnement)
const barChartData = {
    labels: Object.keys(incidentEnvironmentDistribution),
    datasets: [
        {
            label: "Incidents par Environnement",
            data: Object.values(incidentEnvironmentDistribution),
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
        },
    ],
};

// Options pour le graphique Bar
const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: 'Incidents par Environnement',
        },
        legend: {
            position: 'bottom' as const,
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Nombre d\'Incidents',
            },
        },
        x: {
            title: {
                display: true,
                text: 'Environnement',
            },
        },
    },
};

// Données pour le graphique (Radar - Performance SLA par priorité)
const radarChartData = {
    labels: ['Haute', 'Moyenne', 'Basse'],
    datasets: [
        {
            label: 'Incidents Résolus',
            data: [kpiData.slaPerformance.high, kpiData.slaPerformance.medium, kpiData.slaPerformance.low],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 2,
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)',
            fill: true,
        },
    ],
};

// Options pour le graphique Radar
const radarChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: 'Performance des SLA par Priorité',
        },
        legend: {
            position: 'bottom' as const,
        },
    },
    scales: {
        r: {
            beginAtZero: true,
            ticks: {
                stepSize: 500,
                fontSize: 10,
            },
        },
    },
};

// Données pour le graphique (Pie - Répartition des statuts des incidents)
const incidentStatusDistribution = {
    Pending: kpiData.totalIncidents - kpiData.totalResolved - kpiData.totalEscalated,
    Escalated: kpiData.totalEscalated,
    Cancelled: 5000, // Exemple de statut annulé
};

const pieChartData = {
    labels: Object.keys(incidentStatusDistribution),
    datasets: [
        {
            label: 'Répartition des Statuts',
            data: Object.values(incidentStatusDistribution),
            backgroundColor: [
                'rgba(54, 162, 235, 0.8)', // Pending
                'rgba(255, 206, 86, 0.8)', // Escalated
                'rgba(255, 99, 132, 0.8)', // Cancelled
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

// Options pour le graphique Pie
const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: 'Répartition des Statuts des Incidents',
        },
        legend: {
            position: 'bottom' as const,
        },
    },
};

// Données pour le graphique (Line - Incidents Résolus par Jour)
const resolvedIncidentsByDay = [
    { day: "Lun", resolved: 15 },
    { day: "Mar", resolved: 18 },
    { day: "Mer", resolved: 22 },
    { day: "Jeu", resolved: 17 },
    { day: "Ven", resolved: 25 },
];

// Données pour le graphique Line - Incidents Résolus
const lineChartData = {
    labels: resolvedIncidentsByDay.map((day) => day.day),
    datasets: [
        {
            label: "Incidents Résolus",
            data: resolvedIncidentsByDay.map((day) => day.resolved),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            fill: false,
        },
    ],
};

// Options pour le graphique Line
const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: 'Incidents Résolus / Jour',
        },
        legend: {
            position: 'bottom' as const,
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Nombre d\'Incidents',
            },
        },
        x: {
            title: {
                display: true,
                text: 'Jour',
            },
        },
    },
};

// Répartition des incidents par équipe et par réponse
const teamResponseData = {
    "Team A": { diagnosis: 5, repairs: 3, alert: true },
    "Team B": { diagnosis: 8, repairs: 6, alert: true },
    "Team C": { diagnosis: 4, repairs: 2, alert: false },
    "Team D": { diagnosis: 7, repairs: 4, alert: true },
};

// Données pour les graphiques de temps de réponse moyen par équipe
const responseTimeData = {
    labels: Object.keys(teamResponseData),
    datasets: [
        {
            label: "Temps de réponse (Diagnostic)",
            data: Object.values(teamResponseData).map(team => team.diagnosis),
            backgroundColor: 'rgba(255, 206, 86, 0.6)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
        },
        {
            label: "Temps de réponse (Réparations)",
            data: Object.values(teamResponseData).map(team => team.repairs),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        }
    ]
};

const responseTimeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: 'Temps de Réponse Moyen par Équipe',
        },
        legend: {
            position: 'bottom' as const,
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Temps en heures',
            },
        },
        x: {
            title: {
                display: true,
                text: 'Équipes',
            },
        },
    },
};

// Exemple de données pour le filtre par personne (à remplacer par vos données réelles)
const peopleList = ["Alice", "Bob", "Charlie", "David", "Eve"];

export default function DetailedDashboards() {
    const [activeTab, setActiveTab] = useState("charts");
    const [timePeriod, setTimePeriod] = useState("jour");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);
    const [personFilter, setPersonFilter] = useState("");

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    const handleTimePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTimePeriod(e.target.value);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleDateChange = (dates: [Date | null, Date | null]) => {
        setStartDate(dates[0]);
        setEndDate(dates[1]);
        setShowCalendar(false);
    };

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    const handlePersonFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPersonFilter(e.target.value);
        console.log("Filtrer par personne:", e.target.value);
        // Implémentez ici la logique de filtrage des données par personne
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar importée */}
            <Sidebar />

            <div className="flex-1 ml-48 p-8 flex flex-col">
                {/* Header centré avec filtres */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h1 className="text-3xl font-semibold text-gray-900 text-center mb-4">Tableau de Bord des Incidents</h1>
                    <div className="flex items-center justify-start space-x-4">
                        {/* Filtre par période */}
                        <div className="flex items-center">
                            <label htmlFor="filterPeriod" className="mr-2 text-sm text-gray-700">Période:</label>
                            <select
                                id="filterPeriod"
                                value={timePeriod}
                                onChange={handleTimePeriodChange}
                                className="px-2 py-1 border rounded-md text-sm"
                            >
                                <option value="jour">Jour</option>
                                <option value="semaine">Semaine</option>
                                <option value="mois">Mois</option>
                            </select>
                        </div>

                        {/* Filtre par date */}
                        <div className="relative">
                            <label htmlFor="startDate" className="mr-2 text-sm text-gray-700">Date:</label>
                            <input
                                type="text"
                                value={startDate ? (endDate ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` : startDate.toLocaleDateString()) : 'Sélectionner une date'}
                                onClick={toggleCalendar}
                                className="px-2 py-1 border rounded-md text-sm cursor-pointer"
                                readOnly
                            />
                            {showCalendar && (
                                <div style={{ position: 'absolute', zIndex: 10 }}>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={handleDateChange}
                                        startDate={startDate}
                                        endDate={endDate}
                                        selectsRange
                                        isClearable
                                        inline
                                    />
                                </div>
                            )}
                        </div>

                        {/* Filtre par personne */}
                        <div className="flex items-center">
                            <label htmlFor="personFilter" className="mr-2 text-sm text-gray-700">Personne:</label>
                            <select
                                id="personFilter"
                                value={personFilter}
                                onChange={handlePersonFilterChange}
                                className="px-2 py-1 border rounded-md text-sm"
                            >
                                <option value="">Toutes les personnes</option>
                                {peopleList.map((person) => (
                                    <option key={person} value={person}>{person}</option>
                                ))}
                            </select>
                        </div>

                        {/* Barre de recherche */}
                        <div className="flex items-center flex-grow justify-end">
                            <input
                                type="text"
                                placeholder="Rechercher globalement..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="px-2 py-1 border rounded-md text-sm w-64"
                            />
                            <FaSearch className="ml-2 text-gray-600" />
                        </div>
                    </div>
                </div>

                {/* Navigation par onglets */}
                <div className="flex mt-2 border-b border-gray-200">
                    <button
                        className={`px-4 py-2 text-sm font-medium text-gray-600 border-b-2 ${activeTab === "charts" ? "border-blue-500 text-blue-700" : "border-transparent hover:text-gray-800 hover:border-gray-300"} focus:outline-none`}
                        onClick={() => handleTabChange("charts")}
                    >
                        Graphiques
                    </button>
                    <button
                        className={`px-4 py-2 text-sm font-medium text-gray-600 border-b-2 ${activeTab === "kpi" ? "border-blue-500 text-blue-700" : "border-transparent hover:text-gray-800 hover:border-gray-300"} focus:outline-none`}
                        onClick={() => handleTabChange("kpi")}
                    >
                        KPI
                    </button>
                </div>

                {/* Contenu des onglets */}
                <div className="mt-4 flex-1">
                    {activeTab === "charts" && (
                        <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Visualisation des Données</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white p-2 rounded-lg shadow-md" style={{ height: '300px' }}>
                                    <h4 className="text-md font-semibold text-gray-700 mb-2">Temps de Réponse Moyen par Équipe</h4>
                                    <Bar data={responseTimeData} options={responseTimeOptions} />
                                </div>
                                <div className="bg-white p-2 rounded-lg shadow-md" style={{ height: '300px' }}>
                                    <h4 className="text-md font-semibold text-gray-700 mb-2">Incidents par Environnement</h4>
                                    <Bar data={barChartData} options={barChartOptions} />
                                </div>
                                <div className="bg-white p-2 rounded-lg shadow-md" style={{ height: '300px' }}>
                                    <h4 className="text-md font-semibold text-gray-700 mb-2">Performance des SLA par Priorité</h4>
                                    <Radar data={radarChartData} options={radarChartOptions} />
                                </div>
                                <div className="bg-white p-2 rounded-lg shadow-md" style={{ height: '300px' }}>
                                    <h4 className="text-md font-semibold text-gray-700 mb-2">Répartition des Statuts des Incidents</h4>
                                    <Pie data={pieChartData} options={pieChartOptions} />
                                </div>
                                <div className="bg-white p-2 rounded-lg shadow-md" style={{ height: '300px' }}>
                                    <h4 className="text-md font-semibold text-gray-700 mb-2">Incidents Résolus par Jour</h4>
                                    <Line data={lineChartData} options={lineChartOptions} />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "kpi" && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">KPI de Gestion des Incidents</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-blue-100 p-4 rounded-lg shadow-md flex items-center space-x-4">
                                    <FaTachometerAlt className="text-2xl text-blue-700" />
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-700">Total des Incidents</h4>
                                        <div className="text-xl font-bold text-gray-900">{kpiData.totalIncidents}</div>
                                    </div>
                                </div>

                                <div className="bg-green-100 p-4 rounded-lg shadow-md flex items-center space-x-4">
                                    <FaCheckCircle className="text-2xl text-green-700" />
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-700">Incidents Résolus</h4>
                                        <div className="text-xl font-bold text-gray-900">{kpiData.totalResolved}</div>
                                    </div>
                                </div>

                                <div className="bg-yellow-100 p-4 rounded-lg shadow-md flex items-center space-x-4">
                                    <FaExclamationTriangle className="text-2xl text-yellow-700" />
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-700">Incidents Escaladés</h4>
                                        <div className="text-xl font-bold text-gray-900">{kpiData.totalEscalated}</div>
                                    </div>
                                </div>

                                <div className="bg-purple-100 p-4 rounded-lg shadow-md flex items-center space-x-4">
                                    <FaClock className="text-2xl text-purple-700" />
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-700">SLA Non Respectés</h4>
                                        <div className="text-xl font-bold text-gray-900">{kpiData.slaMissed}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
