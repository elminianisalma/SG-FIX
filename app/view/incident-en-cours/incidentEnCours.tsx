'use client';
import React, { useState, useMemo, useEffect } from 'react';
import HeaderBar from '@/app/view/components/HeaderBar';
import { Search, ArrowUpDown, SlidersHorizontal, User, Shield, Network, CalendarDays, AlertTriangle } from 'lucide-react';
import { Incident } from '@/app/utils/Incidents';
import { IncidentStatus } from '@/app/utils/IncidentStatus';
import { IncidentPriority, getPriorityStyle } from '@/app/utils/IncidentPriority';
import { IncidentService } from '@/app/service/IncidentService';
import { IncidentDetail } from '@/app/models/IncidentDetail';
import IncidentEnCoursPopup from './IncidentEnCoursPopup';
import Sidebar from '../SideBarComponent/SideBar';

// Define getGraviteStyle for severity styling
const getGraviteStyle = (gravite: string): string => {
    switch (gravite) {
        case 'CRITIQUE':
            return 'bg-red-100 text-red-800 border-red-300';
        case 'ELEVEE':
            return 'bg-yellow-100 text-yellow-800 border-yellow-300';
        case 'MOYENNE':
            return 'bg-green-100 text-green-800 border-green-300';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-300';
    }
};

export default function IncidentsEnCoursDeTraitement() {
    const [sortPriority, setSortPriority] = useState<'asc' | 'desc' | ''>('');
    const [priorityFilter, setPriorityFilter] = useState<string | ''>('');
    const [showFilter, setShowFilter] = useState<boolean>(false);
        const [searchTerm, setSearchTerm] = useState('');

    const [selectedIncident, setSelectedIncident] = useState<IncidentDetail | null>(null);
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [incidentDetails, setIncidentDetails] = useState<IncidentDetail[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [igg, setIgg] = useState<string | null>(null);

    // Initialize igg from localStorage on client side
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedIgg = localStorage.getItem('igg');
            console.log('Stored IGG:', storedIgg); // Debug
            setIgg(storedIgg);
        }
    }, []);

    // Fetch incidents when igg changes
    useEffect(() => {
        const fetchIncidents = async (iggValue: string) => {
            try {
                setLoading(true);
                const data = await IncidentService.findMyIncidents(iggValue);
                console.log('Raw data from API:', data); // Debug
                setIncidentDetails(data);
                // Map IncidentDetail to Incident
                const mappedIncidents: Incident[] = data.map((detail: IncidentDetail) => ({
                    id: detail.id,
                    title: detail.titre,
                    description: detail.description,
                    status: detail.statutIncident as string,
                    priorité: detail.priorite as string,
                    gravite: detail.gravite as string, // Add gravite
                    declarationDate: detail.dateDeclaration,
                    affectedService: detail.client_serviceName,
                    environment: detail.environnement,
                    declaredBy: detail.client_fullName,
                    assignedTo: detail.coeDev_fullName || 'Non assigné',
                }));
                console.log('Mapped incidents:', mappedIncidents); // Debug
                setIncidents(mappedIncidents);
                console.log('Incidents state after setIncidents:', mappedIncidents); // Debug
            } catch (err) {
                setError('Erreur lors du chargement des incidents');
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        if (igg) {
            console.log('Fetching incidents with IGG:', igg); // Debug
            fetchIncidents(igg);
        } else if (igg === null) {
            console.log('Waiting for IGG from localStorage'); // Debug
        } else {
            setError('IGG non trouvé dans le stockage local');
            setLoading(false);
            console.log('No IGG found in localStorage'); // Debug
        }
    }, [igg]);

    // Debug incidents state changes
    useEffect(() => {
        console.log('Incidents state updated:', incidents);
    }, [incidents]);

    const filteredIncidents = useMemo(() => {
        let result = incidents.filter(
            (incident) =>
                [IncidentStatus.PRIS_EN_CHARGE, IncidentStatus.TRANSFERE].includes(incident.status as IncidentStatus) &&
                (incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    incident.id.toString().includes(searchTerm)) &&
                (!priorityFilter || incident.priorité === priorityFilter)
        );

        const priorityOrder = [
            IncidentPriority.CRITIQUE,
            IncidentPriority.ELEVEE,
            IncidentPriority.MOYENNE,
        ];

        if (sortPriority === 'asc') {
            result.sort((a, b) => priorityOrder.indexOf(a.priorité as IncidentPriority) - priorityOrder.indexOf(b.priorité as IncidentPriority));
        } else if (sortPriority === 'desc') {
            result.sort((a, b) => priorityOrder.indexOf(b.priorité as IncidentPriority) - priorityOrder.indexOf(a.priorité as IncidentPriority));
        }

        console.log('Filtered incidents:', result); // Debug
        return result;
    }, [incidents, searchTerm, sortPriority, priorityFilter]);

    const resetFilters = () => {
        setSearchTerm('');
        setSortPriority('');
        setPriorityFilter('');
    };

    if (loading) {
        return (
            <div className="flex bg-gray-50 min-h-screen text-[17px] relative">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <HeaderBar />
                    <main className="p-6 max-w-7xl mx-auto w-full">
                        <p className="text-center text-gray-500">Chargement...</p>
                    </main>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex bg-gray-50 min-h-screen text-[17px] relative">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <HeaderBar />
                    <main className="p-6 max-w-7xl mx-auto w-full">
                        <p className="text-center text-red-500">{error}</p>
                        <div className="mt-4 max-w-md mx-auto">
                            <input
                                type="text"
                                placeholder="Entrez l'IGG"
                                onChange={(e) => {
                                    const newIgg = e.target.value;
                                    setIgg(newIgg);
                                    if (typeof window !== 'undefined' && newIgg) {
                                        localStorage.setItem('igg', newIgg);
                                        setError(null);
                                    }
                                }}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </main>
                </div>
            </div>
        );
    }

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
                                            onChange={(e) => setPriorityFilter(e.target.value)}
                                            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                                        >
                                            <option value="">Toutes</option>
                                            <option value={IncidentPriority.CRITIQUE}>Critique</option>
                                            <option value={IncidentPriority.ELEVEE}>Élevé</option>
                                            <option value={IncidentPriority.MOYENNE}>Moyenne</option>
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
                        {filteredIncidents.map((incident) => {
                            const detail = incidentDetails.find((d) => d.id === incident.id);
                            return (
                                <div
                                    key={incident.id.toString()}
                                    className="border rounded-lg p-4 bg-white shadow-sm cursor-pointer hover:shadow-md transition"
                                    onClick={() => setSelectedIncident(detail || null)}
                                >
                                    <div className="flex justify-between items-center gap-2 flex-wrap">
                                        <h2 className="text-xl font-semibold">{incident.title}</h2>
                                        <div className="flex gap-2">
                                            <span className={`px-2 py-1 text-sm rounded border ${getPriorityStyle(incident.priorité as IncidentPriority)}`}>
                                                Priorité: {incident.priorité}
                                            </span>
                                            <span className={`px-2 py-1 text-sm rounded border ${getGraviteStyle(incident.gravite)}`}>
                                                Gravité: {incident.gravité}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="mt-2 text-lg">{incident.description}</p>

                                    <div className="mt-3 space-y-1 text-lg">
                                        <div className="flex items-center gap-2">
                                            <User size={20} className="text-blue-500" />
                                            Assigné à: {incident.assignedTo}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Network size={20} className="text-green-600" />
                                            Service: {incident.affectedService} | Environnement: <span className="font-medium">{incident.environment}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Shield size={20} className="text-purple-600" />
                                            Déclaré par: {incident.declaredBy}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CalendarDays size={20} className="text-orange-500" />
                                            Date de déclaration: <span className="font-medium">{incident.declarationDate}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

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