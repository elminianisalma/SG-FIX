'use client';

import React, { useState, useEffect } from 'react';
import HeaderBar from '@/app/view/components/HeaderBar';
import KPIPage from './KPIPage';
import DashboardPage from './DashboardPage';
import { FaSearch } from 'react-icons/fa';
import Sidebar from '../SideBarComponent/SideBar';
import { IncidentPriority } from '@/app/utils/IncidentPriority';
import { ArrowUpDown, Search, SlidersHorizontal } from 'lucide-react';

const theme = {
  textPrimary: 'text-black',
  subtleText: 'text-gray-400',
  whiteContainer: 'bg-white rounded-lg p-4 shadow-md',
};

const MainDashboard = () => {
  
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [filterPriority, setFilterPriority] = useState<IncidentPriority | ''>('');
    const [filterDate, setFilterDate] = useState<string>("");
    const [isSortedByPriority, setIsSortedByPriority] = useState<boolean>(false);
     const [isLoading, setIsLoading] = useState(true);
  
    // Fonction pour obtenir la valeur numérique de la priorité (pour le tri)
    const priorityValue = (p?: IncidentPriority): number => {
      if (p === IncidentPriority.ELEVEE) return 3;
      if (p === IncidentPriority.MOYENNE) return 2;
      if (p === IncidentPriority.FAIBLE) return 1;
      return 0;
    };
 
  

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar fixée à gauche (48px) */}
      <Sidebar />

      {/* Contenu principal décalé à droite */}
      <div className="flex-1 ml-[48px] flex flex-col">
        <HeaderBar />

        <main className="flex-1 p-6 md:p-8 bg-gray-50 overflow-auto">
          {/* Titre */}
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-black mb-1">Tableau de bord</h2>
            <h1 className="text-3xl md:text-4xl font-extrabold text-black">Suivi des incidents</h1>
          </div>

          {/* KPI */}
          <KPIPage />

          {/* Filtres */}
            <div className="flex space-x-4 mb-4 relative">
            <div className="relative flex items-center w-full  ml-52 w-[calc(100vw-48px)]">
              <Search className="absolute left-3  text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Rechercher un incident..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-md text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-black-500"
              />
            </div>
            <div className="ml-auto flex items-center space-x-4 relative">
              <button
                className="flex items-center gap-2 px-3 py-3 ml-4 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 text-gray-700 text-lg font-medium"
              >
                <ArrowUpDown size={16} />
                Trier
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className="flex items-center gap-2 px-3 py-3 bg-white border border-black-600 rounded-md shadow-sm hover:bg-gray-100 text-black-600 text-lg font-medium"
                >
                  <SlidersHorizontal size={16} />
                  Filtres
                </button>

                {showFilter && (
                  <div className="absolute right-0 mt-2 w-64 bg-white p-4 border border-gray-300 rounded-md shadow-lg z-20">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Priorité</label>
                    <select
                      value={filterPriority}
                      onChange={(e) => setFilterPriority(e.target.value as IncidentPriority)}
                      className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                    >
                      <option value="">Toutes</option>
                      <option value={IncidentPriority.ELEVEE}>Élevée</option>
                      <option value={IncidentPriority.MOYENNE}>Moyenne</option>
                      <option value={IncidentPriority.FAIBLE}>Faible</option>
                    </select>

                    <label className="block mb-2 text-sm font-medium text-gray-700">Date de déclaration</label>
                    <input
                      type="date"
                      value={filterDate}
                      onChange={(e) => setFilterDate(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Dashboard avec graphes élargis */}
          <DashboardPage />
        </main>
      </div>
    </div>
  );
};

export default MainDashboard;
