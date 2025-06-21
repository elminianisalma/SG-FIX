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

ChartJS.register(ArcElement, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

// Palette professionnelle
const palette = {
  blue: '#374158',
  green: '#4B5943',
  yellow: '#BC632E',
  orange: '#7F5056',
  red: '#EF4444',
  grayDark: '#4B5563',
  gray: '#9CA3AF',
  grayLight: '#9E9F8D',
  white: '#FFFFFF',
  black: '#111827',
};

const chartLegend = {
  position: 'bottom' as const,
  align: 'end' as const,
  labels: {
    color: palette.grayDark,
    font: { size: 13 },
  },
};

const chartOptionsBarOrLine = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: { color: palette.black, font: { size: 14 } },
      grid: { display: false },
    },
    x: {
      ticks: { color: palette.black, font: { size: 14 } },
      grid: { display: false },
    },
  },
  plugins: {
    legend: chartLegend,
    tooltip: {
      backgroundColor: palette.grayLight,
      titleColor: palette.black,
      bodyColor: palette.grayDark,
      borderColor: palette.gray,
      borderWidth: 1,
    },
  },
};

// Données
const DashboardPage = () => {
  const periodData = {
    labels: ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4'],
    datasets: [{
      label: "Nombre d'Incidents",
      data: [10, 25, 35, 40],
      backgroundColor: palette.blue,
    }],
  };

  const criticalityData = {
    labels: ['Critique', 'Haute', 'Modérée', 'Basse'],
    datasets: [{
      label: 'Impact',
      data: [15, 25, 40, 70],
      backgroundColor: [palette.red, palette.orange, palette.yellow, palette.gray],
    }],
  };

  const duData = {
    labels: ['Bill Payment', 'Bankup', 'Interop', 'OpenR', 'Cockpit'],
    datasets: [{
      label: 'Incidents par DU',
      data: [50, 35, 65, 30, 40],
      backgroundColor: [
        palette.blue,
        palette.green,
        palette.orange,
        palette.yellow,
        palette.gray,
      ],
    }],
  };

  const resolutionTimeData = {
    labels: ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4'],
    datasets: [{
      label: 'Temps Moyen (heures)',
      data: [12, 8, 15, 10],
      borderColor: palette.grayLight,
      backgroundColor: 'transparent',
      borderWidth: 2,
      tension: 0.4,
    }],
  };

  const servicesData = {
    labels: ['Interop', 'Bill Payment', 'OpenR', 'Bankup'],
    datasets: [{
      label: "Nombre d'Incidents",
      data: [30, 45, 20, 15],
      backgroundColor: [
        palette.orange,
        palette.green,
        palette.yellow,
        palette.red,
      ],
    }],
  };

  const environmentData = {
    labels: ['DEV', 'HT', 'HF'],
    datasets: [{
      data: [60, 25, 15],
      backgroundColor: [
        palette.blue,
        palette.gray,
        palette.green,
      ],
    }],
  };

  const stabilizationData = {
    labels: ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4'],
    datasets: [{
      label: 'Incidents en Production',
      data: [5, 10, 8, 12],
      backgroundColor: palette.red,
    }],
  };

  const creationMethodData = {
    labels: ['Automatique', 'Manuel'],
    datasets: [{
      data: [70, 30],
      backgroundColor: [palette.green, palette.orange],
    }],
  };

  // Rendu
  return (
    <div className="min-h-screen ml-52 w-[calc(100vw-48px)] p-6 bg-gray-50 overflow-x-hidden">
      <div className="bg-white rounded-xl shadow-md border border-gray-300 p-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Tableau de Bord — Incidents</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            { title: 'Incidents par Période', content: <Bar data={periodData} options={chartOptionsBarOrLine} /> },
            { title: 'Incidents par Criticité', content: <Bar data={criticalityData} options={chartOptionsBarOrLine} /> },
            { title: 'Incidents par DU', content: <Bar data={duData} options={chartOptionsBarOrLine} /> },
            { title: 'Temps de Résolution', content: <Line data={resolutionTimeData} options={chartOptionsBarOrLine} /> },
            { title: 'Services les Plus Concernés', content: <Pie data={servicesData} options={{ plugins: { legend: chartLegend } }} /> },
            { title: 'Incidents par Environnement', content: <Pie data={environmentData} options={{ plugins: { legend: chartLegend } }} /> },
            { title: 'Incidents Production (Stabilisation)', content: <Line data={stabilizationData} options={chartOptionsBarOrLine} /> },
            { title: 'Création Auto vs Manuel', content: <Pie data={creationMethodData} options={{ plugins: { legend: chartLegend } }} /> },
          ].map(({ title, content }, idx) => (
            <div key={idx} className="bg-white shadow-md p-4 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">{title}</h3>
              <div className="h-64 flex justify-center items-center max-w-full overflow-hidden">
                {content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
