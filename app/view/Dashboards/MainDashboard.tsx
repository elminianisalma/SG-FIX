'use client';

import React, { useState, useEffect } from 'react';
import HeaderBar from '@/app/view/components/HeaderBar';
import KPIPage from './KPIPage';
import DashboardPage from './DashboardPage';
import { FaSearch } from 'react-icons/fa';
import Sidebar from '../SideBarComponent/SideBar';

const palette = {
    lightRed: '#F5E6E6',
    darkGray: '#808080',
    mediumGray: '#A9A9A9',
    tan: '#D2B48C',
    darkRed: '#8B0000',
    lightPurple: '#E6E6FA',
};

const theme = {
    textPrimary: 'text-black',
    accent: 'text-gray-300',
    subtleText: 'text-gray-400',
    border: 'border-gray-300',
    shadow: 'shadow-lg',
    glass: 'bg-white/10 backdrop-blur-md',
    hover: 'hover:shadow-xl transition-all duration-300',
    whiteContainer: 'bg-white rounded-lg p-4 shadow-md',
};

const MainDashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value);
    };

    const applyFilters = () => {
        console.log('Applying Filters - Search Query:', searchQuery, 'Start Date:', startDate, 'End Date:', endDate);
        // Add your filter logic here (e.g., update DashboardPage data)
    };

    const handleResetFilters = () => {
        setSearchQuery('');
        setStartDate('');
        setEndDate('');
    };

    useEffect(() => {
        applyFilters();
    }, [searchQuery, startDate, endDate]);

    return (
        <div className="flex min-h-screen bg-white">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <HeaderBar />

                {/* Page Content */}
                <main className="flex-1 p-6 md:p-10 overflow-auto flex justify-center">
                    <div className="max-w-5xl w-full">
                        {/* Titre principal */}
                        <div className="text-center mb-8">
                            <h2 className={`text-xl md:text-2xl font-semibold ${theme.textPrimary} mb-1`}>
                                Tableau de bord
                            </h2>
                            <h1 className={`text-3xl md:text-4xl font-extrabold ${theme.textPrimary}`}>
                                Suivi des incidents
                            </h1>
                        </div>

                        {/* KPI Section */}
                        <KPIPage />

                        {/* Search and Date Range Filter */}
                        <div className={`${theme.whiteContainer} mb-8`}>
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                {/* Search Bar with External Icon */}
                                <div className="flex items-center w-full md:w-1/2 gap-2">
                                    <div className={theme.subtleText}>
                                        <FaSearch className="h-5 w-5" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Rechercher par mot-clé, ID ou texte..."
                                        className="w-full p-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                </div>

                                {/* Date Range Filter */}
                                <div className="flex items-center w-full md:w-1/2 gap-2">
                                    <div className="flex-1">
                                        <label className="text-sm text-gray-600 mr-2">Du:</label>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={handleStartDateChange}
                                            className="w-full p-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-sm text-gray-600 mr-2">Au:</label>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={handleEndDateChange}
                                            className="w-full p-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-gray-400"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Search and Reset Buttons */}
                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    onClick={applyFilters}
                                    style={{
                                        backgroundColor: '#bb0d0d',
                                        color: 'white',
                                        padding: '8px 16px',
                                        borderRadius: '6px',
                                        fontWeight: 'bold',
                                        transition: 'background-color 0.2s ease'
                                    }}
                                   
                               onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                                    (e.target as HTMLButtonElement).style.backgroundColor = '#0056b3';
                                }}

                               onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                                    (e.target as HTMLButtonElement).style.backgroundColor = '#007bff';
                                }}

                                >
                                    Rechercher
                                </button>
                                <button
                                    onClick={handleResetFilters}
                                    style={{
                                        backgroundColor: '#6c757d',
                                        color: 'white',
                                        padding: '8px 16px',
                                        borderRadius: '6px',
                                        fontWeight: 'bold',
                                        transition: 'background-color 0.2s ease'
                                    }}
                                    onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
    (e.target as HTMLButtonElement).style.backgroundColor = '#0056b3';
}}

                                    onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                                          (e.target as HTMLButtonElement).style.backgroundColor= '#6c757d';
                                    }}
                                >
                                    Réinitialiser
                                </button>
                            </div>
                        </div>

                        {/* Dashboard Section */}
                        <DashboardPage />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MainDashboard;