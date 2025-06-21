'use client';

import React from 'react';
import { FaBug, FaClock, FaTags, FaChartBar } from 'react-icons/fa';

const palette = {
  softBlue: '#bfdbfe',
  softOrange: '#fdba74',
  softGreen: '#bbf7d0',
  softPurple: '#ddd6fe',
  border: '#e5e7eb',
  text: '#1f2937',
  bgCard: '#f9fafb',
};

const theme = {
  shadow: 'shadow-sm hover:shadow-md transition-shadow duration-300',
};

const KPIPage = () => {
  const kpis = [
    { label: 'Incidents Déclarés', value: 150, color: palette.softBlue, icon: <FaBug /> },
    { label: 'Incidents en Cours de Résolution', value: 35, color: palette.softOrange, icon: <FaClock /> },
    { label: 'Temps Moyen de Résolution', value: '2 jours', color: palette.softGreen, icon: <FaTags /> },
    { label: 'Top DU Impacté', value: 'Bill Payment', color: palette.softPurple, icon: <FaChartBar /> },
  ];

  return (
    <div className="p-4 ml-52">
      <div className={`p-4 rounded-lg border border-[${palette.border}] bg-white`}>
        <h2 className="text-xl font-bold text-gray-800 mb-4">KPIs des Incidents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, index) => (
            <div
              key={index}
              className={`rounded-lg p-3 ${theme.shadow}`}
              style={{ backgroundColor: kpi.color }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="text-xl text-gray-800">{kpi.icon}</div>
                <h3 className="text-base font-medium text-gray-900">{kpi.label}</h3>
              </div>
              <p className="text-lg font-semibold text-gray-800">{kpi.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KPIPage;
