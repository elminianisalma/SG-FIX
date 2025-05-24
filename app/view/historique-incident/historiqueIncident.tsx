'use client';

import React, { useState, useEffect, useMemo } from 'react';
import HeaderBar from '@/app/view/components/HeaderBar';
import FilterPopup from './FilterPopup';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowUpDown,
  ListOrdered,
  FileText,
  Circle,
  AlertTriangle,
  Cpu,
  User,
  CalendarDays,
} from 'lucide-react';
import HistoriquePopup from './HistoriquePopup';
import Sidebar from '../SideBarComponent/SideBar';
import { IncidentDetail } from '@/app/models/IncidentDetail';
import { IncidentPriority, getPriorityStyle } from '@/app/utils/IncidentPriority';
import { IncidentStatus } from '@/app/utils/IncidentStatus';
import { IncidentService } from '@/app/service/IncidentService';
import { KPICards } from './KpiCard';

const statusLabels: Record<string, string> = {
  SUBMITTED: 'Soumis',
  ASSIGNED: 'Affecté',
  TAKEN_OVER: 'Pris en charge',
  TRANSFERRED: 'Transféré',
  RESOLVED: 'Résolu',
};

export default function HistoriqueIncident() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIncident, setSelectedIncident] = useState<IncidentDetail | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [filters, setFilters] = useState<{ status?: string }>({});
  const [sortPriority, setSortPriority] = useState<string>('');
  const [page, setPage] = useState(1);
  const [incidents, setIncidents] = useState<IncidentDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        setLoading(true);
        const igg = 'IGG001'; // Replace with dynamic IGG from user context/auth
        const fetchedIncidents = await IncidentService.findMyIncidents(igg);
        setIncidents(fetchedIncidents);
        setError(null);
      } catch (err) {
        setError('Erreur lors de la récupération des incidents');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  const sortedIncidents = useMemo(() => {
    return [...incidents].sort((a, b) =>
      new Date(b.dateDeclaration).getTime() - new Date(a.dateDeclaration).getTime()
    );
  }, [incidents]);

  const availableStatuses = useMemo(() => {
    const set = new Set(sortedIncidents.map((i) => i.statutIncident));
    return Array.from(set);
  }, [sortedIncidents]);

  const incidentsFiltres = useMemo(() => {
    let result = sortedIncidents.filter((incident) => {
      const matchSearch =
        incident.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.id.toString().toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus = !filters.status || incident.statutIncident === filters.status;

      return matchSearch && matchStatus;
    });

    if (sortPriority) {
      result = result.sort(
        (a, b) =>
          ['CRITIQUE', 'HAUTE', 'MOYENNE', 'BASSE'].indexOf(a.priorite) -
          ['CRITIQUE', 'HAUTE', 'MOYENNE', 'BASSE'].indexOf(b.priorite)
      );
    }

    return result;
  }, [filters, searchTerm, sortPriority, sortedIncidents]);

  const incidentsParPage = 5;
  const paginatedIncidents = incidentsFiltres.slice(
    (page - 1) * incidentsParPage,
    page * incidentsParPage
  );
  const totalPages = Math.ceil(incidentsFiltres.length / incidentsParPage);

  const resetFilters = () => {
    setSearchTerm('');
    setFilters({});
    setSortPriority('');
  };

  if (loading) {
    return (
      <div className="flex bg-gray-50 min-h-screen text-[17px] items-center justify-center">
        <p className="text-gray-700">Chargement des incidents...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex bg-gray-50 min-h-screen text-[17px] items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 min-h-screen text-[17px]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderBar />
        <main className="p-6 max-w-[100%] mx-auto w-full relative">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Historique des incidents
          </h1>

          <KPICards incidents={sortedIncidents} />

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowPopup(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
              >
                <Filter className="w-4 h-4" /> Filtrer
              </button>

              <button
                onClick={() => setSortPriority(sortPriority ? '' : 'true')}
                className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded hover:bg-green-200"
              >
                <ArrowUpDown className="w-4 h-4" /> Trier par priorité
              </button>

              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
              >
                Réinitialiser les filtres
              </button>
            </div>

            <div className="relative w-full max-w-md ml-auto">
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par titre ou ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {showPopup && (
            <div className="absolute z-50 top-28 left-10">
              <FilterPopup
                onApply={(f) => setFilters(f)}
                onClose={() => setShowPopup(false)}
                availableStatuses={availableStatuses}
              />
            </div>
          )}

          <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="min-w-full text-left text-gray-700 text-[16px]">
              <thead className="bg-gray-100 text-sm uppercase">
                <tr>
                  <th className="px-6 py-3 flex items-center gap-2"><ListOrdered className="w-4 h-4" /> ID</th>
                  <th className="px-6 py-3 flex items-center gap-2"><FileText className="w-4 h-4" /> Titre</th>
                  <th className="px-6 py-3 flex items-center gap-2"><Circle className="w-4 h-4" /> Statut</th>
                  <th className="px-6 py-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Priorité</th>
                  <th className="px-6 py-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Gravité</th>
                  <th className="px-6 py-3 flex items-center gap-2"><Cpu className="w-4 h-4" /> Application</th>
                  <th className="px-6 py-3 flex items-center gap-2"><User className="w-4 h-4" /> Déclaré par</th>
                  <th className="px-6 py-3 flex items-center gap-2"><CalendarDays className="w-4 h-4" /> Date</th>
                </tr>
              </thead>
              <tbody>
                {paginatedIncidents.map((incident) => (
                  <tr
                    key={incident.id.toString()}
                    className="hover:bg-gray-50 cursor-pointer border-b"
                    onClick={() => setSelectedIncident(incident)}
                  >
                    <td className="px-6 py-4 font-medium">{incident.id.toString()}</td>
                    <td className="px-6 py-4">{incident.titre}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-gray-200 text-sm font-medium text-gray-800">
                        ● {statusLabels[incident.statutIncident] || incident.statutIncident}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPriorityStyle(incident.priorite)}`}>
                        {incident.priorite}
                      </span>
                    </td>
                    <td className="px-6 py-4">{incident.gravite}</td>
                    <td className="px-6 py-4">{incident.application}</td>
                    <td className="px-6 py-4">{incident.client_fullName}</td>
                    <td className="px-6 py-4">{incident.dateDeclaration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`flex items-center gap-2 px-4 py-2 border rounded ${
                page === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Précédent
            </button>
            <span className="text-gray-700">Page {page} sur {totalPages}</span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className={`flex items-center gap-2 px-4 py-2 border rounded ${
                page === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Suivant
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {selectedIncident && (
            <HistoriquePopup
              incident={selectedIncident}
              onClose={() => setSelectedIncident(null)}
            />
          )}
        </main>
      </div>
    </div>
  );
}
