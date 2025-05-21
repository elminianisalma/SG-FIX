'use client';
import React, { useState, useMemo } from 'react';
import HeaderBar from '@/app/view/components/HeaderBar';
import { Search, ArrowUpDown, SlidersHorizontal, User, Shield, Network, CalendarDays, MessageCircle } from 'lucide-react';
import { Incident } from '@/app/utils/Incidents';
import { IncidentStatus } from '@/app/utils/IncidentStatus';
import { IncidentPriority, getPriorityStyle } from '@/app/utils/IncidentPriority';
import { initialIncidents } from '../assign-incident/data';
import IncidentEnCoursPopup from './IncidentEnCoursPopup'; // Assure-toi que le chemin est correct
import Sidebar from '../SideBarComponent/SideBar';

export default function IncidentsEnCoursDeTraitement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortPriority, setSortPriority] = useState<'asc' | 'desc' | ''>('');
    const [priorityFilter, setPriorityFilter] = useState<IncidentPriority | ''>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

    const filteredIncidents = useMemo(() => {
        let result = initialIncidents.filter(
            (incident) =>
                [IncidentStatus.EN_COURS_ANALYSE, IncidentStatus.TRANSFERE].includes(incident.status) &&
                (incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    incident.id.toString().includes(searchTerm)) &&
                (!priorityFilter || incident.priorité === priorityFilter)
        );

        const priorityOrder = [
            IncidentPriority.CRITIQUE,
            IncidentPriority.ELEVE,
            IncidentPriority.MOYEN,
            IncidentPriority.FAIBLE,
        ];

        if (sortPriority === 'asc') {
            result.sort((a, b) => priorityOrder.indexOf(a.priorité!) - priorityOrder.indexOf(b.priorité!));
        } else if (sortPriority === 'desc') {
            result.sort((a, b) => priorityOrder.indexOf(b.priorité!) - priorityOrder.indexOf(a.priorité!));
        }

        return result;
    }, [searchTerm, sortPriority, priorityFilter]);

    const resetFilters = () => {
        setSearchTerm('');
        setSortPriority('');
        setPriorityFilter('');
    };

    return (
        <div className="flex bg-gray-50 min-h-screen text-[17px] relative">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <HeaderBar />
                <main className="p-6 max-w-7xl mx-auto w-full">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                        Incidents en cours de traitement
                    </h1>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                type="text"
                                placeholder="Rechercher un incident..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <button
                                    onClick={() => setShowFilter(!showFilter)}
                                    className="inline-flex items-center gap-1 px-4 py-3 bg-white border border-green-600 rounded-md shadow-sm hover:bg-gray-100 text-green-600 text-base font-medium"
                                >
                                    <SlidersHorizontal size={20} />
                                    Filtres
                                </button>

                                {showFilter && (
                                    <div className="absolute top-full mt-2 right-0 w-64 bg-white p-4 border border-gray-300 rounded-md shadow-lg z-20">
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            Filtrer par priorité
                                        </label>
                                        <select
                                            value={priorityFilter}
                                            onChange={(e) => setPriorityFilter(e.target.value as IncidentPriority)}
                                            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                                        >
                                            <option value="">Toutes</option>
                                            <option value={IncidentPriority.CRITIQUE}>Critique</option>
                                            <option value={IncidentPriority.ELEVE}>Élevé</option>
                                            <option value={IncidentPriority.MOYEN}>Moyenne</option>
                                            <option value={IncidentPriority.FAIBLE}>Faible</option>
                                        </select>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => setSortPriority(sortPriority === 'asc' ? 'desc' : 'asc')}
                                className="inline-flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 text-base font-medium"
                            >
                                <ArrowUpDown size={20} />
                                Trier par
                            </button>
                            <button
                                onClick={resetFilters}
                                className="inline-flex items-center gap-2 px-4 py-3 bg-red-100 text-red-700 rounded hover:bg-red-200"
                            >
                                Réinitialiser les filtres
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {filteredIncidents.map((incident) => (
                            <div
                                key={incident.id}
                                className="border rounded-lg p-4 bg-white shadow-sm cursor-pointer hover:shadow-md transition"
                                onClick={() => setSelectedIncident(incident)}
                            >
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-semibold">{incident.title}</h2>
                                    <span className={`px-2 py-1 text-sm rounded ${getPriorityStyle(incident.priorité)}`}>
                                        {incident.priorité}
                                    </span>
                                </div>

                                <p className="mt-2 text-lg">{incident.description}</p>

                                <div className="mt-3 space-y-1 text-lg">
                                    <div className="flex items-center gap-2">
                                        <User size={20} className="text-blue-500" />
                                        Assigné à : {incident.assignedTo}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Network size={20} className="text-green-600" />
                                        Service : {incident.affectedService} | Env : {incident.environment}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Shield size={20} className="text-purple-600" />
                                        Déclaré par : {incident.declaredBy}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CalendarDays size={20} className="text-orange-500" />
                                        Date : {incident.declarationDate}
                                    </div>
                                   
                                </div>
                            </div>
                        ))}

                        {filteredIncidents.length === 0 && (
                            <p className="text-center text-gray-500 mt-8">Aucun incident trouvé.</p>
                        )}
                    </div>
                </main>
            </div>

            {selectedIncident && (
                    <IncidentEnCoursPopup incident={selectedIncident} onClose={() => setSelectedIncident(null)} />
                
                )}


        </div>
    );
}
