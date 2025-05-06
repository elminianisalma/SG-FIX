
'use client';

import React, { useState } from 'react';
import { Search, Filter, Settings } from 'lucide-react';
import Sidebar from '@/app/core/SideBar/Sidebar';
import IncidentTable from './IncidentTable';
import KpiDashboard from './KpiDashboard';
import { Incident, IncidentStatus } from '../../utils/TypeIncident';

export default function IncidentList() {
  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: 'ID1238957',
      title: 'Problème de sécurité',
      status: IncidentStatus.DECLARED,
      service: "Interop",
      assignedTo: "Mahmoud IDRISSI",
      createdAt: "2025-04-01",
      priority: "CRITIQUE",
      impact: "CRITIQUE",
      urgency: "ÉLEVÉE",
    },
    {
      id: 'ID1238958',
      title: 'Panne de réseau',
      status: IncidentStatus.IN_PROGRESS,
      service: "OpenR",
      assignedTo: "Mehdi BOUHLAOUI",
      createdAt: "2025-03-30",
      priority: "MOYEN",
      impact: "MOYEN",
      urgency: "MOYEN",
    },
    {
      id: 'ID1238959',
      title: 'Défaillance de la base de données',
      status: IncidentStatus.RESOLVED,
      service: "Paiement des factures",
      assignedTo: "Keba",
      createdAt: "2025-03-28",
      priority: "FAIBLE",
      impact: "FAIBLE",
      urgency: "FAIBLE",
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<IncidentStatus | ''>('');

  const filteredIncidents = incidents.filter(incident =>
      incident.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus ? incident.status === filterStatus : true)
  );

  const incidentsCount = filteredIncidents.length;
  const pendingCount = filteredIncidents.filter(i => i.status === IncidentStatus.DECLARED).length;
  const completedCount = filteredIncidents.filter(i => i.status === IncidentStatus.RESOLVED).length;
  const cancelledCount = filteredIncidents.filter(i => i.status === IncidentStatus.TRANSFERRED).length;
  const resolvedCount = completedCount;
  const inProgressCount = filteredIncidents.filter(i => i.status === IncidentStatus.IN_PROGRESS).length;

  return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 p-6 sm:p-10 max-w-6xl mx-auto">
          <h1 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">
            Liste des incidents
          </h1>
          <div className="mb-6">
            <KpiDashboard
                incidentsCount={incidentsCount}
                pendingCount={pendingCount}
                completedCount={completedCount}
                cancelledCount={cancelledCount}
                resolvedCount={resolvedCount}
                inProgressCount={inProgressCount}
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 text-lg font-semibold">Filtres</span>
              <Settings className="text-gray-500" size={20} />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Rechercher un incident..."
                    className="w-full h-10 pl-10 pr-3 rounded-md border border-gray-200 bg-white shadow-sm text-sm focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative w-full sm:w-60">
                <Filter className="absolute left-3 top-3 text-gray-400" size={20} />
                <select
                    className="w-full h-10 pl-10 pr-3 rounded-md border border-gray-200 bg-white shadow-sm text-sm focus:ring-2 focus:ring-blue-500"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as IncidentStatus | '')}
                >
                  <option value="">Tous les statuts</option>
                  <option value={IncidentStatus.DECLARED}>Déclaré</option>
                  <option value={IncidentStatus.IN_PROGRESS}>En cours</option>
                  <option value={IncidentStatus.RESOLVED}>Résolu</option>
                  <option value={IncidentStatus.TRANSFERRED}>Transféré</option>
                </select>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <IncidentTable incidents={filteredIncidents} />
          </div>
        </div>
      </div>
  );
}
