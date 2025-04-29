'use client';

import React from 'react'; // Import React ici
import { useState } from 'react';
import { Search, Filter, PlusCircle, Settings } from 'lucide-react';
import Sidebar from '@/app/core/SideBar/Sidebar';
import IncidentTable from './IncidentTable';
import KpiDashboard from './KpiDashboard';
import { Incident, IncidentStatus } from '../../utils/TypeIncident';
import { useRouter } from 'next/navigation';

export default function IncidentList() {
  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: 'ID1238957',
      title: 'Problème de sécurité',
      status: IncidentStatus.PENDING,
      service: "Interop",
      assignedTo: "Mahmoud IDRISSI",
      profileImage: "/images/john.jpeg",
      createdAt: "2025-04-01",
      priority: "HAUTE",
      impact: "CRITIQUE",
      urgency: "MOYENNE",
      sla: "4 Heures",
      description: "Accès non autorisé détecté dans le système de sécurité.",
      customerName: "XYZ Corp",
      lastUpdatedBy: "Admin",
      lastUpdatedAt: "2025-04-02 10:30"
    },
    {
      id: 'ID1238958',
      title: 'Panne de réseau',
      status: IncidentStatus.COMPLETED,
      service: "OpenR",
      assignedTo: "Mehdi BOUHLAOUI",
      profileImage: "/images/jane.jpeg",
      createdAt: "2025-03-30",
      priority: "MOYEN",
      impact: "ÉLEVÉ",
      urgency: "ÉLEVÉE",
      sla: "8 Heures",
      description: "Connexion Internet perdue dans plusieurs bureaux.",
      customerName: "ABC Ltd.",
      lastUpdatedBy: "Admin Réseau",
      lastUpdatedAt: "2025-03-31 15:45"
    },
    {
      id: 'ID1238959',
      title: 'Défaillance de la base de données',
      status: IncidentStatus.CANCELLED,
      service: "Paiement des factures",
      assignedTo: "Keba",
      profileImage: "/images/michael.jpeg",
      createdAt: "2025-03-28",
      priority: "FAIBLE",
      impact: "MOYEN",
      urgency: "FAIBLE",
      sla: "24 Heures",
      description: "Le serveur de base de données est tombé en panne mais n'est plus nécessaire.",
      customerName: "DEF Inc.",
      lastUpdatedBy: "Ingénieur Base de Données",
      lastUpdatedAt: "2025-03-29 12:00"
    }
  ]);

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<IncidentStatus | ''>(''); // Allow empty string for no filter

  const filteredIncidents = incidents.filter(incident =>
      incident.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus ? incident.status === filterStatus : true)
  );

  const incidentsCount = filteredIncidents.length;
  const pendingCount = filteredIncidents.filter(incident => incident.status === IncidentStatus.PENDING).length;
  const completedCount = filteredIncidents.filter(incident => incident.status === IncidentStatus.COMPLETED).length;
  const cancelledCount = filteredIncidents.filter(incident => incident.status === IncidentStatus.CANCELLED).length;
  const resolvedCount = filteredIncidents.filter(incident => incident.status === IncidentStatus.RESOLVED).length;
  const inProgressCount = filteredIncidents.filter(incident => incident.status === IncidentStatus.IN_PROGRESS).length;

  return (
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar à gauche (fixed) */}
        <div className="fixed top-0 left-0 h-full z-10">
          <Sidebar />
        </div>

        {/* Zone principale (décalée à droite) */}
        <div className="flex-1 p-8 sm:pl-64"> {/* Adjust left padding for sidebar */}
          <h1 className="text-3xl font-extrabold mb-6 text-gray-800 text-center sm:text-left">Liste des incidents</h1> {/* Reduced font size and aligned left on larger screens */}

          <div className="mb-8">
            <KpiDashboard
                incidentsCount={incidentsCount}
                pendingCount={pendingCount}
                completedCount={completedCount}
                cancelledCount={cancelledCount}
                resolvedCount={resolvedCount}
                inProgressCount={inProgressCount}
            />
          </div>

          {/* Section de filtre et recherche (alignée à gauche sur les grands écrans) */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 text-lg font-semibold">Filtres</span> {/* Reduced font size */}
              <Settings className="text-gray-500" size={20} /> {/* Reduced icon size */}
            </div>

            {/* Champ de recherche (width ajustée pour les grands écrans) */}
            <div className="relative w-full sm:max-w-md h-12 flex items-center"> {/* Reduced height and max-width */}
              <Search className="absolute left-3 text-gray-400 pointer-events-none" size={20} /> {/* Reduced icon size */}
              <input
                  type="text"
                  placeholder="Rechercher un incident..."
                  className="w-full h-full pl-10 pr-3 text-lg rounded-md border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filtre par statut */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              <select
                  className="w-full h-12 pl-10 pr-3 text-lg rounded-md border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as IncidentStatus | '')}
              >
                <option value="">Tous les statuts</option>
                <option value={IncidentStatus.PENDING}>En attente</option>
                <option value={IncidentStatus.COMPLETED}>Terminé</option>
                <option value={IncidentStatus.CANCELLED}>Annulé</option>
                <option value={IncidentStatus.RESOLVED}>Résolu</option>
                <option value={IncidentStatus.IN_PROGRESS}>En cours</option>
              </select>
            </div>

            {/* Bouton de création (taille ajustée) */}
            <button
                className="flex items-center gap-2 px-4 py-2 text-lg rounded-md bg-black text-white shadow hover:bg-blue-700 transition duration-200"
                onClick={() => router.push('/core/create-incident')}
            >
              <PlusCircle size={20} /> {/* Reduced icon size */}
              <span>Créer</span> {/* Shorter text */}
            </button>
          </div>

          {/* Tableau des incidents */}
          <div className="overflow-x-auto"> {/* Make table scrollable on smaller screens */}
            <IncidentTable incidents={filteredIncidents} />
          </div>
        </div>

        {/* Sidebar à droite (fixed) */}
        <div className="fixed top-0 right-0 h-full z-10">
          <Sidebar />
        </div>
      </div>
  );
}
