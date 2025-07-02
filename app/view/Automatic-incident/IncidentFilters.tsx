// src/app/view/Automatic-incident/IncidentFilters.tsx
'use client';

import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

export type IncidentFiltersProps = {
  search: string;
  setSearch: (value: string) => void;
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
  filterPrio: 'HAUTE' | 'MOYENNE' | 'BASSE' | '';
  setFilterPrio: (value: 'HAUTE' | 'MOYENNE' | 'BASSE' | '') => void;
  filterDate: string;
  setFilterDate: (value: string) => void;
  isModelActive: boolean;
  handleToggleModel: () => void;
  toastMessage: string | null;
};

export default function IncidentFilters({
  search,
  setSearch,
  showFilters,
  setShowFilters,
  filterPrio,
  setFilterPrio,
  filterDate,
  setFilterDate,
  isModelActive,
  handleToggleModel,
  toastMessage,
}: IncidentFiltersProps) {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
        {/* Barre de recherche alignée via flex */}
        <div className="flex items-center w-full border border-gray-300 rounded-lg px-3 py-2">
          <Search className="text-gray-400" size={18} />
          <input
            type="search"
            placeholder="Rechercher un incident..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 ml-2 py-1 outline-none"
          />
        </div>

        {/* Boutons Filtres et Toggle */}
        <div className="flex space-x-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition text-sm"
          >
            <SlidersHorizontal className="mr-2" size={18} />
            Filtres
          </button>
          <button
            onClick={handleToggleModel}
            className="px-4 py-2 bg-red-100 border-2 border-red-600 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-200 focus:ring-2 focus:ring-red-500 transition"
            title={isModelActive ? 'Désactiver le modèle' : 'Activer le modèle'}
            aria-label={isModelActive ? 'Désactiver le modèle' : 'Activer le modèle'}
          >
            {isModelActive ? 'Désactiver le modèle' : 'Activer le modèle'}
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="fixed top-20 right-6 bg-green-100 text-green-800 px-4 py-2 rounded-md shadow-md animate-fade-in z-40">
          {toastMessage}
        </div>
      )}

      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
            <div>
              <label className="block text-sm font-semibold mb-1">Priorité</label>
              <select
                value={filterPrio}
                onChange={e => setFilterPrio(e.target.value as 'HAUTE' | 'MOYENNE' | 'BASSE' | '')}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Toutes</option>
                <option value="HAUTE">Haute</option>
                <option value="MOYENNE">Moyenne</option>
                <option value="BASSE">Basse</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Date</label>
              <input
                type="date"
                value={filterDate}
                onChange={e => setFilterDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="self-end">
              <button
                onClick={() => { setFilterPrio(''); setFilterDate(''); }}
                className="px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition text-sm"
              >
                Effacer
              </button>
            </div>
          </div>
        </div>
      )}

      {!isModelActive && (
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md mb-6 text-sm">
          La réception des incidents automatiques est suspendue.
        </div>
      )}
    </>
  );
}
