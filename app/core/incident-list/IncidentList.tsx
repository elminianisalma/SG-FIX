import React, { useState } from 'react';
import {
  Calendar,
  ChevronDown,
  ArrowUpDown,
  SlidersHorizontal,
  Search,
} from 'lucide-react';
import Sidebar from '@/app/core/SideBar/Sidebar';
import IncidentTable from './IncidentTable';
import KpiDashboard from './KpiDashboard';
import { Incident, IncidentStatus } from '../../utils/TypeIncident';
import { calculatePriority } from '../../utils/calculatePriority';

export default function IncidentList() {
  const [incidents] = useState<Incident[]>([
    {
      id: 'ID7261',
      title: 'Problème de sécurité',
      status: IncidentStatus.DECLARE,
      du: 'Plateforme Interop',
      assignedTo: 'Mahmoud Fihri',
      createdAt: '2025-04-01',
      impact: 'CRITIQUE',
      urgency: 'MOYENNE',
      priority: calculatePriority('CRITIQUE', 'MOYENNE'),
      dateResolution:'2025-04-04',
      tags:['sécurité','interop']
    },
    {
      id: 'ID9831',
      title: 'Panne de réseau',
      status: IncidentStatus.AFFECTE,
      du: 'Module OpenR',
      assignedTo: 'Mehdi BOUHLAOUI',
      createdAt: '2025-03-30',
      impact: 'ÉLEVÉ',
      urgency: 'ÉLEVÉE',
      priority: calculatePriority('ÉLEVÉ', 'ÉLEVÉE'),
      dateResolution:'2025-10-30',
      tags:['réseau','openR']
    },
    {
      id: 'ID3365',
      title: 'Défaillance base de données',
      status: IncidentStatus.RESOLU,
      du: 'Base de données Paiement',
      assignedTo: 'Keba Deme',
      createdAt: '2025-03-28',
      impact: 'MOYEN',
      urgency: 'FAIBLE',
      priority: calculatePriority('MOYEN', 'FAIBLE'),
      dateResolution:'2025-04-04',
      tags: ['base de données', 'paiement', 'crash'], 
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<IncidentStatus | ''>(''); 
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [showFilter, setShowFilter] = useState(false);

  const filteredIncidents = incidents.filter(
    (incident) =>
      incident.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus ? incident.status === filterStatus : true)
  );

  return (
    <div className="flex max-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-4 sm:p-8 max-w-6xl mx-auto relative">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Liste des incidents
        </h1>

        <KpiDashboard incidents={filteredIncidents} />

        <div className="flex justify-end mb-3 z-10 relative">
          <div className="flex items-center gap-3 w-full">
            {/* 🔧 Barre de recherche élargie */}
            <div className="relative flex-grow flex items-center">
              <Search className="absolute left-3 text-gray-500" size={16} />
              <input
                type="text"
                placeholder="Rechercher un incident..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            {/* Bouton Sort by */}
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 text-gray-700 text-sm font-medium">
              <ArrowUpDown size={16} />
              Sort by
            </button>
            {/* Bouton Filter */}
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2 px-3 py-1.5 bg-white border border-green-600 rounded-md shadow-sm hover:bg-gray-100 text-green-600 text-sm font-medium"
            >
              <SlidersHorizontal size={16} />
              Filter
            </button>
          </div>
        </div>

        {showFilter && (
          <div className="absolute top-[160px] right-10 z-20 bg-white p-4 rounded-lg shadow-lg w-full max-w-sm text-sm">
            <h2 className="text-xl font-semibold mb-3">Filtres</h2>

            <div className="mb-3">
              <label className="text-gray-700 font-medium">Plage de dates</label>
              <div className="flex flex-wrap gap-3 mt-1">
                <div className="relative flex-1 min-w-[140px]">
                  <Calendar className="absolute left-2.5 top-2.5 text-gray-500" size={16} />
                  <input
                    type="date"
                    className="w-full h-10 pl-9 pr-3 rounded-md border border-gray-300 text-sm"
                    value={dateRange.from}
                    onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                  />
                </div>
                <div className="relative flex-1 min-w-[140px]">
                  <Calendar className="absolute left-2.5 top-2.5 text-gray-500" size={16} />
                  <input
                    type="date"
                    className="w-full h-10 pl-9 pr-3 rounded-md border border-gray-300 text-sm"
                    value={dateRange.to}
                    onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="text-gray-700 font-medium">Statut</label>
              <div className="relative mt-1">
                <ChevronDown className="absolute left-2.5 top-2.5 text-gray-500" size={16} />
                <select
                  className="w-full h-10 pl-9 pr-3 rounded-md border border-gray-300 text-sm"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as IncidentStatus | '')}
                >
                  <option value="">Tous les statuts</option>
                  <option value={IncidentStatus.DECLARE}>Déclaré</option>
                  <option value={IncidentStatus.AFFECTE}>Affecté</option>
                  <option value={IncidentStatus.EN_COURS_ANALYSE}>En cours d’analyse</option>
                  <option value={IncidentStatus.TRANSFERE}>Transféré</option>
                  <option value={IncidentStatus.RESOLU}>Résolu</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => {
                  setFilterStatus('');
                  setDateRange({ from: '', to: '' });
                }}
                className="flex-1 py-2 rounded-md bg-gray-200 text-gray-700 font-medium text-sm"
              >
                Réinitialiser
              </button>
              <button
                onClick={() => setShowFilter(false)}
                className="flex-1 py-2 rounded-md bg-green-500 text-white font-medium text-sm"
              >
                Appliquer
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto z-0">
          <IncidentTable incidents={filteredIncidents} />
        </div>
      </div>
    </div>
  );
}
