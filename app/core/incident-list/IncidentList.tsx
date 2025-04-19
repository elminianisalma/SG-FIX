'use client';

import { useState } from 'react';
import { Search, Filter, PlusCircle, Settings } from 'lucide-react';
import Sidebar from '@/app/core/SideBar/SideBar';
import IncidentTable from './IncidentTable';
import KpiDashboard from './KpiDashboard';
import { Incident } from '../../utils/TypeIncident';
import { IncidentStatus } from '../../utils/IncidentStatus';
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
  const [filterStatus, setFilterStatus] = useState('');

  const filteredIncidents = incidents.filter(incident =>
      incident.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus ? incident.status === filterStatus : true)
  );

  const incidentsCount = filteredIncidents.length;
  const pendingCount = filteredIncidents.filter(incident => incident.status === IncidentStatus.PENDING).length;
  const completedCount = filteredIncidents.filter(incident => incident.status === IncidentStatus.COMPLETED).length;
  const cancelledCount = filteredIncidents.filter(incident => incident.status === IncidentStatus.CANCELLED).length;

  return (
      <div className="flex min-h-screen bg-gray-50">

        {/* Zone principale */}
        <div className="flex-1 p-8 pl-16">
          <h1 className="text-5xl font-extrabold mb-10 text-gray-800 text-center">Liste des incidents</h1>

          <div className="mb-10 pl-6">
            <KpiDashboard
                incidentsCount={incidentsCount}
                pendingCount={pendingCount}
                completedCount={completedCount}
                cancelledCount={cancelledCount}
            />
          </div>

          {/* Section de filtre et recherche */}
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4 pl-20">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 text-2xl font-semibold">Filtres</span>
              <Settings className="text-gray-500" size={24} />
            </div>

            {/* Champ de recherche */}
            <div className="relative w-full max-w-lg h-14 flex items-center">
              <Search className="absolute left-3 text-gray-400 pointer-events-none" size={24} />
              <input
                  type="text"
                  placeholder="Rechercher un incident..."
                  className="w-full h-full pl-12 pr-4 text-xl rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Bouton de création */}
            <button
                className="flex items-center gap-3 px-6 py-3 text-xl rounded-xl bg-black text-white shadow hover:bg-blue-700 transition duration-200"
                onClick={() => router.push('/core/create-incident')}
            >
              <PlusCircle size={24} />
              <span>Créer un incident</span>
            </button>
          </div>

          <IncidentTable incidents={filteredIncidents} />
        </div>

        <div className="fixed top-0 right-0 h-full">
          <Sidebar />
        </div>
      </div>
  );
}
