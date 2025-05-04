'use client';

import React, { useState, useMemo } from 'react';
import Sidebar from '@/app/core/SideBar/Sidebar';
import HeaderBar from '@/app/core/components/HeaderBar';
import { Search } from 'lucide-react';

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
    { id: 'INC100', title: 'Analyse API lente', createdAt: '2025-05-01', status: 'IN_ANALYSIS', priority: 'CRITIQUE' },
    { id: 'INC101', title: 'Erreur intermittente', createdAt: '2025-05-02', status: 'IN_ANALYSIS', priority: 'HAUTE' },
    { id: 'INC102', title: 'Blocage JSON', createdAt: '2025-05-03', status: 'IN_ANALYSIS', priority: 'MOYENNE' },
];

const getPriorityStyle = (priority: string) => {
    const styleMap = {
        CRITIQUE: 'bg-red-100 text-red-700',
        HAUTE: 'bg-orange-100 text-orange-700',
        MOYENNE: 'bg-yellow-100 text-yellow-700',
        BASSE: 'bg-green-100 text-green-700'
    };
    return styleMap[priority] || 'bg-gray-100 text-gray-700';
};

const statusLabels: Record<string, string> = {
    IN_ANALYSIS: 'En cours d’analyse',
};

export default function IncidentEnCours() {
    const [searchTerm, setSearchTerm] = useState('');
    const [priorityFilter, setPriorityFilter] = useState<string>('');
    const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

    const incidentsFiltrés = useMemo(() => {
        return allIncidents.filter((incident) => {
            const matchSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                incident.id.toLowerCase().includes(searchTerm.toLowerCase());

            const matchPriority = !priorityFilter || incident.priority === priorityFilter;

            return incident.status === 'IN_ANALYSIS' && matchSearch && matchPriority;
        });
    }, [searchTerm, priorityFilter]);

    return (
        <div className="flex bg-gray-50 min-h-screen text-[17px]">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <HeaderBar />
                <main className="p-6 max-w-7xl mx-auto w-full">
                    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                        Incidents en cours d’analyse
                    </h1>

                    <div className="flex items-center justify-between mb-6 gap-4">
                        <div className="flex gap-4 items-center">
                            <select
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-2"
                            >
                                <option value="">Toutes les priorités</option>
                                <option value="CRITIQUE">Critique</option>
                                <option value="HAUTE">Haute</option>
                                <option value="MOYENNE">Moyenne</option>
                                <option value="BASSE">Basse</option>
                            </select>

                            <button
                                onClick={() => {
                                    setPriorityFilter('');
                                    setSearchTerm('');
                                }}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                            >
                                Réinitialiser
                            </button>
                        </div>

                        <div className="relative w-full max-w-md">
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
                            {incidentsFiltrés.map((incident) => (
                                <tr
                                    key={incident.id}
                                    className="hover:bg-gray-50 cursor-pointer border-b"
                                    onClick={() => setSelectedIncident(incident)}
                                >
                                    <td className="px-6 py-4 font-medium">{incident.id}</td>
                                    <td className="px-6 py-4">{incident.title}</td>
                                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-gray-200 text-sm font-medium text-gray-800">
                        ● {statusLabels[incident.status]}
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
                </main>
            </div>
        </div>
    );
}
