'use client';

import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
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
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<IncidentStatus | ''>('');

  const filteredIncidents = incidents.filter(
      (incident) =>
          incident.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (filterStatus ? incident.status === filterStatus : true)
  );

  return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-6 sm:p-10 max-w-6xl mx-auto">
          <h1 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">
            Liste des incidents
          </h1>

          <KpiDashboard incidents={filteredIncidents} />

          {/* Filtres (sous les dashboards) */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 my-8">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                  type="text"
                  placeholder="Rechercher un incident..."
                  className="w-full h-10 pl-10 pr-3 rounded-md border border-gray-200 bg-white shadow-sm text-base focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative w-full sm:w-60">
              <Filter className="absolute left-3 top-3 text-gray-400" size={20} />
              <select
                  className="w-full h-10 pl-10 pr-3 rounded-md border border-gray-200 bg-white shadow-sm text-base focus:ring-2 focus:ring-blue-500"
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

          <div className="overflow-x-auto">
            <IncidentTable incidents={filteredIncidents} />
          </div>
        </div>
      </div>
  );
}
