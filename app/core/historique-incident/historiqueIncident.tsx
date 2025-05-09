'use client';

import React, { useState, useMemo } from 'react';
import Sidebar from '@/app/core/SideBar/Sidebar';
import HeaderBar from '@/app/core/components/HeaderBar';
import FilterPopup from './FilterPopup';
import {
    Search,
    ChevronLeft,
    ChevronRight,
    Filter,
    ArrowUpDown,
} from 'lucide-react';
import HistoriquePopup from './HistoriquePopup';

interface Incident {
    id: string;
    title: string;
    createdAt: string;
    status: string;
    priority: string;
    assignedTo?: string;
    handledBy?: string;
}

const allIncidents: Incident[] = [
    { id: 'INC001', title: 'Erreur de login', createdAt: '2025-04-01', status: 'SUBMITTED', priority: 'MOYENNE' },
    { id: 'INC002', title: 'Blocage API', createdAt: '2025-04-02', status: 'ASSIGNED', priority: 'HAUTE' },
    { id: 'INC003', title: 'Analyse lente', createdAt: '2025-04-03', status: 'TAKEN_OVER', priority: 'CRITIQUE' },
    { id: 'INC004', title: 'Redirection sécurité', createdAt: '2025-04-04', status: 'TRANSFERRED', priority: 'MOYENNE' },
    { id: 'INC005', title: 'Incident terminé', createdAt: '2025-04-05', status: 'RESOLVED', priority: 'BASSE' },
];

const statusLabels: Record<string, string> = {
    SUBMITTED: 'Soumis',
    ASSIGNED: 'Affecté',
    TAKEN_OVER: 'Pris en charge',
    TRANSFERRED: 'Transféré',
    RESOLVED: 'Résolu',
};

const getPriorityStyle = (priority: string) => {
    const styleMap = {
        CRITIQUE: 'bg-red-100 text-red-700',
        HAUTE: 'bg-orange-100 text-orange-700',
        MOYENNE: 'bg-yellow-100 text-yellow-700',
        BASSE: 'bg-green-100 text-green-700',
    };
    return styleMap[priority] || 'bg-gray-100 text-gray-700';
};

export default function HistoriqueIncident() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [filters, setFilters] = useState<{ status?: string }>({});
    const [sortPriority, setSortPriority] = useState<string>('');
    const [page, setPage] = useState(1);

    const sortedIncidents = [...allIncidents].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const availableStatuses = useMemo(() => {
        const set = new Set(sortedIncidents.map((i) => i.status));
        return Array.from(set);
    }, []);

    const incidentsFiltrés = useMemo(() => {
        let result = sortedIncidents.filter((incident) => {
            const matchSearch =
                incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                incident.id.toLowerCase().includes(searchTerm.toLowerCase());

            const matchStatus = !filters.status || incident.status === filters.status;

            return matchSearch && matchStatus;
        });

        if (sortPriority) {
            result = result.sort(
                (a, b) =>
                    ['CRITIQUE', 'HAUTE', 'MOYENNE', 'BASSE'].indexOf(a.priority) -
                    ['CRITIQUE', 'HAUTE', 'MOYENNE', 'BASSE'].indexOf(b.priority)
            );
        }

        return result;
    }, [filters, searchTerm, sortPriority]);

    const incidentsParPage = 5;
    const paginatedIncidents = incidentsFiltrés.slice(
        (page - 1) * incidentsParPage,
        page * incidentsParPage
    );
    const totalPages = Math.ceil(incidentsFiltrés.length / incidentsParPage);

    const resetFilters = () => {
        setSearchTerm('');
        setFilters({});
        setSortPriority('');
    };

    return (
        <div className="flex bg-gray-50 min-h-screen text-[17px]">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <HeaderBar />
                <main className="p-6 max-w-7xl mx-auto w-full relative">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                        Historique des incidents
                    </h1>

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
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Titre</th>
                                <th className="px-6 py-3">Statut</th>
                                <th className="px-6 py-3">Priorité</th>
                                <th className="px-6 py-3">Créé le</th>
                            </tr>
                            </thead>
                            <tbody>
                            {paginatedIncidents.map((incident) => (
                                <tr
                                    key={incident.id}
                                    className="hover:bg-gray-50 cursor-pointer border-b"
                                    onClick={() => setSelectedIncident(incident)}
                                >
                                    <td className="px-6 py-4 font-medium">{incident.id}</td>
                                    <td className="px-6 py-4">{incident.title}</td>
                                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-gray-200 text-sm font-medium text-gray-800">
                        ● {statusLabels[incident.status] || incident.status}
                      </span>
                                    </td>
                                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPriorityStyle(incident.priority)}`}>
                        {incident.priority}
                      </span>
                                    </td>
                                    <td className="px-6 py-4">{incident.createdAt}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-6">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="text-gray-700 disabled:opacity-50"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <span className="text-gray-800 font-medium">
                Page {page} sur {totalPages}
              </span>
                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="text-gray-700 disabled:opacity-50"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    )}

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
