'use client';

import React, { useState, useMemo } from 'react';
import Sidebar from '@/app/core/SideBar/Sidebar';
import HeaderBar from '@/app/core/components/HeaderBar';
import IncidentEnCoursPopup from './IncidentEnCoursPopup';
import {
    Search,
    Filter,
    ArrowUpDown
} from 'lucide-react';

interface Incident {
    id: string;
    title: string;
    createdAt: string;
    status: string;
    priority: string;
    assignedTo?: string;
    description?: string;
    resolvedAt?: string;
    transferredAt?: string;
}

const allIncidents: Incident[] = [
    {
        id: 'INC1001',
        title: 'Erreur authentification',
        createdAt: '2025-05-03',
        status: 'IN_PROGRESS',
        priority: 'CRITIQUE',
        assignedTo: 'Aya Bouznari',
        description: 'Incident critique empêchant l’accès à l’application.'
    },
    {
        id: 'INC1002',
        title: 'Problème API utilisateur',
        createdAt: '2025-05-01',
        status: 'IN_PROGRESS',
        priority: 'HAUTE',
        assignedTo: 'Yassine Farissi',
        description: 'Réponses incohérentes sur l’API /user/data.'
    }
];

const statusLabels: Record<string, string> = {
    IN_PROGRESS: 'Pris en charge'
};

const getPriorityStyle = (priority: string) => {
    const map = {
        CRITIQUE: 'bg-red-100 text-red-700',
        HAUTE: 'bg-orange-100 text-orange-700',
        MOYENNE: 'bg-yellow-100 text-yellow-700',
        BASSE: 'bg-green-100 text-green-700'
    };
    return map[priority] || 'bg-gray-200 text-gray-700';
};

export default function IncidentsEnCoursDeTraitement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortPriority, setSortPriority] = useState('');
    const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
    const [priorityFilter, setPriorityFilter] = useState('');

    const incidentsFiltrés = useMemo(() => {
        let result = allIncidents.filter(
            (incident) =>
                incident.status === 'IN_PROGRESS' &&
                (incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    incident.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
                (!priorityFilter || incident.priority === priorityFilter)
        );

        if (sortPriority) {
            result.sort((a, b) =>
                ['CRITIQUE', 'HAUTE', 'MOYENNE', 'BASSE'].indexOf(a.priority) -
                ['CRITIQUE', 'HAUTE', 'MOYENNE', 'BASSE'].indexOf(b.priority)
            );
        }

        return result;
    }, [searchTerm, sortPriority, priorityFilter]);

    const resetFilters = () => {
        setSearchTerm('');
        setSortPriority('');
        setPriorityFilter('');
    };

    return (
        <div className="flex bg-gray-50 min-h-screen text-[17px]">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <HeaderBar />
                <main className="p-6 max-w-7xl mx-auto w-full relative">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                        Incidents en cours de traitement
                    </h1>

                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
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
                                onClick={() => setSortPriority(sortPriority ? '' : 'true')}
                                className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded hover:bg-green-200"
                            >
                                <ArrowUpDown className="w-4 h-4" /> Trier par priorité
                            </button>

                            <button
                                onClick={resetFilters}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                            >
                                Réinitialiser
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

                    {selectedIncident && (
                        <IncidentEnCoursPopup
                            incident={selectedIncident}
                            onClose={() => setSelectedIncident(null)}
                        />
                    )}
                </main>
            </div>
        </div>
    );
}
