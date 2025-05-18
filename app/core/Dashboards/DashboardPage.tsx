'use client';

import React from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const palette = {
    lightRed: 'rgba(187,13,13,0.54)',
    darkGray: '#bb0d0d',
    mediumGray: '#c5beb0',
    tan: '#464646',
    darkRed: '#1c1b1b' ,
    lightPurple: '#464646',
};

const theme = {
    textPrimary: 'text-black',
    textSecondary: 'text-gray-600',
    cardBg: 'bg-white',
    shadow: 'shadow-xl hover:shadow-2xl transition-shadow duration-300',
    border: 'border-gray-300',
    whiteContainer: 'bg-white rounded-lg p-4 shadow-md',
};

const DashboardPage = () => {
    // 1. Nombre d'incidents par période
    const periodData = {
        labels: ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4'],
        datasets: [
            {
                label: "Nombre d'Incidents",
                data: [10, 25, 35, 40],
                backgroundColor: palette.mediumGray,
                borderColor: palette.lightPurple,
                borderWidth: 1,
            },
        ],
    };

    // 2. Nombre d'incidents par criticité (seulement Critique, Haute, Modérée, Basse)
    const criticalityData = {
        labels: ['Critique', 'Haute', 'Modérée', 'Basse'],
        datasets: [
            {
                label: 'Impact',
                data: [15, 25, 40, 70],
                backgroundColor: [palette.darkRed, palette.lightPurple, palette.mediumGray, palette.tan],
                borderColor: [palette.darkRed, palette.lightPurple, palette.mediumGray, palette.darkGray],
                borderWidth: 1,
            },
        ],
    };

    // 3. Nombre d'incidents par DU (services les plus impliqués)
    const duData = {
        labels: ['Bill Payment', 'Bankup', 'Interop', 'OpenR', 'Cockpit'],
        datasets: [
            {
                label: 'Incidents par DU',
                data: [50, 35, 65, 30, 40],
                backgroundColor: [palette.darkGray, palette.mediumGray, palette.tan, palette.lightPurple, palette.darkRed],
                borderColor: [palette.darkRed, palette.mediumGray, palette.lightPurple, palette.darkGray, palette.darkRed],
                borderWidth: 1,
            },
        ],
    };

    // 4. Temps de résolution des incidents
    const resolutionTimeData = {
        labels: ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4'],
        datasets: [
            {
                label: 'Temps Moyen (heures)',
                data: [12, 8, 15, 10],
                borderColor: palette.tan,
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderWidth: 2,
                fill: false,
                tension: 0.4,
            },
        ],
    };

    // 5. Services les plus concernés
    const servicesData = {
        labels: ['Service A', 'Service B', 'Service C', 'Service D'],
        datasets: [
            {
                label: 'Nombre d\'Incidents',
                data: [30, 45, 20, 15],
                backgroundColor: [palette.darkGray, palette.mediumGray, palette.tan, palette.lightRed],
                borderColor: [palette.darkRed, palette.mediumGray, palette.lightPurple, palette.darkGray],
                borderWidth: 1,
            },
        ],
    };

    // 6. Incidents par environnements
    const environmentData = {
        labels: ['Production', 'Test', 'Développement'],
        datasets: [
            {
                data: [60, 25, 15],
                backgroundColor: [palette.darkGray, palette.mediumGray, palette.tan],
                hoverOffset: 20,
                borderWidth: 1,
                borderColor: palette.lightPurple,
            },
        ],
    };

    // 7. Incidents stabilisation (prod)
    const stabilizationData = {
        labels: ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4'],
        datasets: [
            {
                label: 'Incidents en Production',
                data: [5, 10, 8, 12],
                backgroundColor: palette.mediumGray,
                borderColor: palette.darkGray,
                borderWidth: 1,
            },
        ],
    };

    // 8. Incidents créés automatiquement vs manuellement
    const creationMethodData = {
        labels: ['Automatique', 'Manuel'],
        datasets: [
            {
                data: [70, 30],
                backgroundColor: [palette.darkGray, palette.tan],
                hoverOffset: 20,
                borderWidth: 1,
                borderColor: palette.lightPurple,
            },
        ],
    };

    // 9. Dépassement SLA pour temps de traitement des incidents
    const slaData = {
        labels: ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4'],
        datasets: [
            {
                label: 'Dépassements SLA',
                data: [3, 7, 2, 5],
                backgroundColor: palette.darkGray,
                borderColor: palette.darkRed,
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="p-6">
            <div className={`${theme.whiteContainer} border ${theme.border}`}>
                <h2 className={`text-2xl font-bold text-black mb-4`}>Dashboards - Analyses des Incidents</h2>

                {/* Charts Section */}
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">

                    {/* 1. Nombre d'incidents par période */}
                    <div className={`card ${theme.cardBg} ${theme.shadow} rounded-lg overflow-hidden`}>
                        <div className="card-body p-4">
                            <h3 className={`card-title text-xl font-semibold text-black uppercase tracking-wider mb-4`}>
                                Nombre d'Incidents par Période
                            </h3>
                            <div className="h-64">
                                <Bar
                                    data={periodData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                                ticks: { color: 'black', font: { size: 12 } },
                                                grid: { display: false },
                                            },
                                            x: {
                                                ticks: { color: 'black', font: { size: 12 } },
                                                grid: { display: false },
                                            },
                                        },
                                        plugins: {
                                            legend: { display: false },
                                            tooltip: { enabled: true, backgroundColor: palette.darkGray, titleColor: 'black', bodyColor: 'black' },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 2. Nombre d'incidents par criticité */}
                    <div className={`card ${theme.cardBg} ${theme.shadow} rounded-lg overflow-hidden`}>
                        <div className="card-body p-4">
                            <h3 className={`card-title text-xl font-semibold text-black uppercase tracking-wider mb-4`}>
                                Nombre d'Incidents par Criticité
                            </h3>
                            <div className="h-64">
                                <Bar
                                    data={criticalityData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                                ticks: { color: 'black', font: { size: 12 } },
                                                grid: { display: false },
                                            },
                                            x: {
                                                ticks: { color: 'black', font: { size: 12 } },
                                                grid: { display: false },
                                            },
                                        },
                                        plugins: {
                                            legend: { display: false },
                                            tooltip: { enabled: true, backgroundColor: palette.darkGray, titleColor: 'black', bodyColor: 'black' },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 3. Nombre d'incidents par DU */}
                    <div className={`card ${theme.cardBg} ${theme.shadow} rounded-lg overflow-hidden`}>
                        <div className="card-body p-4">
                            <h3 className={`card-title text-xl font-semibold text-black uppercase tracking-wider mb-4`}>
                                Nombre d'Incidents par DU
                            </h3>
                            <div className="h-64">
                                <Bar
                                    data={duData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                                ticks: { color: 'black', font: { size: 12 } },
                                                grid: { display: false },
                                            },
                                            x: {
                                                ticks: { color: 'black', font: { size: 12 } },
                                                grid: { display: false },
                                            },
                                        },
                                        plugins: {
                                            legend: { display: false },
                                            tooltip: { enabled: true, backgroundColor: palette.darkGray, titleColor: 'black', bodyColor: 'black' },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 4. Temps de résolution des incidents */}
                    <div className={`card ${theme.cardBg} ${theme.shadow} rounded-lg overflow-hidden`}>
                        <div className="card-body p-4">
                            <h3 className={`card-title text-xl font-semibold text-black uppercase tracking-wider mb-4`}>
                                Temps de Résolution des Incidents
                            </h3>
                            <div className="h-64">
                                <Line
                                    data={resolutionTimeData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                                ticks: { color: 'black', font: { size: 12 } },
                                                grid: { display: false },
                                            },
                                            x: {
                                                ticks: { color: 'black', font: { size: 12 } },
                                                grid: { display: false },
                                            },
                                        },
                                        plugins: {
                                            legend: { display: false },
                                            tooltip: { enabled: true, backgroundColor: palette.darkGray, titleColor: 'black', bodyColor: 'black' },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 5. Services les plus concernés */}
                    <div className={`card ${theme.cardBg} ${theme.shadow} rounded-lg overflow-hidden`}>
                        <div className="card-body p-4">
                            <h3 className={`card-title text-xl font-semibold text-black uppercase tracking-wider mb-4`}>
                                Services les plus Concernés
                            </h3>
                            <div className="h-64">
                                <Pie
                                    data={servicesData}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            tooltip: {
                                                backgroundColor: palette.darkGray,
                                                titleColor: 'black',
                                                bodyColor: 'black',
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 6. Incidents par environnements */}
                    <div className={`card ${theme.cardBg} ${theme.shadow} rounded-lg overflow-hidden`}>
                        <div className="card-body p-4">
                            <h3 className={`card-title text-xl font-semibold text-black uppercase tracking-wider mb-4`}>
                                Incidents par Environnements
                            </h3>
                            <div className="h-64">
                                <Pie
                                    data={environmentData}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            tooltip: {
                                                backgroundColor: palette.darkGray,
                                                titleColor: 'black',
                                                bodyColor: 'black',
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 7. Incidents stabilisation (prod) */}
                    <div className={`card ${theme.cardBg} ${theme.shadow} rounded-lg overflow-hidden`}>
                        <div className="card-body p-4">
                            <h3 className={`card-title text-xl font-semibold text-black uppercase tracking-wider mb-4`}>
                                Incidents Stabilisation (Prod)
                            </h3>
                            <div className="h-64">
                                <Line
                                    data={stabilizationData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                                ticks: { color: 'black', font: { size: 12 } },
                                                grid: { display: false },
                                            },
                                            x: {
                                                ticks: { color: 'black', font: { size: 12 } },
                                                grid: { display: false },
                                            },
                                        },
                                        plugins: {
                                            legend: { display: false },
                                            tooltip: { enabled: true, backgroundColor: palette.darkGray, titleColor: 'black', bodyColor: 'black' },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 8. Incidents créés automatiquement vs manuellement */}
                    <div className={`card ${theme.cardBg} ${theme.shadow} rounded-lg overflow-hidden`}>
                        <div className="card-body p-4">
                            <h3 className={`card-title text-xl font-semibold text-black uppercase tracking-wider mb-4`}>
                                Incidents Créés Automatiquement vs Manuellement
                            </h3>
                            <div className="h-64">
                                <Pie
                                    data={creationMethodData}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            tooltip: {
                                                backgroundColor: palette.darkGray,
                                                titleColor: 'black',
                                                bodyColor: 'black',
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
