'use client';

import React from 'react';
import { FaBug, FaClock, FaTags, FaChartBar } from 'react-icons/fa';

const palette = {
    darkRed: '#3e0c11',
    red: '#b00002',
    grey: '#a0a4ab',
    darkGrey: '#302a2c',
    wine: '#2C1D27',
    beige: '#cec5bb',
    orangeRed: '#CF3E29',
};

const theme = {
    textPrimary: 'text-black',
    textSecondary: 'text-gray-600',
    cardBg: `bg-[${palette.darkGrey}]`,
    shadow: 'shadow-xl',
};

const KPIPage = () => {
    const kpis = [
        { label: 'Incidents Déclarés', value: 150, color: palette.red, icon: <FaBug /> },
        { label: 'Incidents en Cours de Résolution', value: 35, color: palette.orangeRed, icon: <FaClock /> },
        { label: 'Temps Moyen de Résolution', value: '2 jours', color: palette.beige, icon: <FaTags /> },
        { label: 'Top DU Impacté', value: 'Bill Payment', color: palette.grey, icon: <FaChartBar /> },
    ];

    return (
        <div className="p-6">
            <div className={`p-6 bg-[${palette.darkGrey}] border border-[${palette.grey}] rounded-lg ${theme.shadow}`}>
                <h2 className={`col-span-4 text-2xl font-bold text-black mb-4`}>KPIs des Incidents</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {kpis.map((kpi, index) => (
                        <div key={index} className={`card ${theme.cardBg} ${theme.shadow}`} style={{ backgroundColor: kpi.color }}>
                            <div className="card-body">
                                <div className="flex items-center gap-2">
                                    <div className="text-3xl text-white">{kpi.icon}</div>
                                    <h3 className="card-title text-lg font-semibold text-white drop-shadow-md">{kpi.label}</h3>
                                </div>
                                <p className="text-2xl font-bold text-white tracking-wide">{kpi.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default KPIPage;