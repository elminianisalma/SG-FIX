'use client';

import React, { useState } from 'react';
import {
  ArrowUpDown, Download, Search, SlidersHorizontal
} from "lucide-react";
import Sidebar from '../SideBarComponent/Sidebar';
import HeaderBar from '../components/HeaderBar';
import { IncidentStatus } from '@/app/utils/IncidentStatus';
import { Incident } from '@/app/utils/Incidents';
import { initialIncidents } from './data';
import { IncidentCard } from './Incident-card';
import { IncidentPriority } from '@/app/utils/IncidentPriority';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const IncidentAssignment: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents || []);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [assignee, setAssignee] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filterPriority, setFilterPriority] = useState<IncidentPriority | ''>('');
  const [filterDate, setFilterDate] = useState<string>("");
  const [isSortedByPriority, setIsSortedByPriority] = useState<boolean>(false);

  // Fonction pour obtenir la valeur numérique de la priorité (pour le tri)
  const priorityValue = (p?: IncidentPriority): number => {
    if (p === IncidentPriority.ELEVE) return 3;
    if (p === IncidentPriority.MOYEN) return 2;
    if (p === IncidentPriority.FAIBLE) return 1;
    return 0;
  };

  const handleAssign = (incident: Incident) => {
    setSelectedIncident(incident);
    setAssignee(incident.assignedTo || "");
  };

  const handleSortByPriority = () => {
    const sorted = [...incidents].sort((a, b) =>
      priorityValue(b.priorité) - priorityValue(a.priorité)
    );
    setIncidents(sorted);
    setIsSortedByPriority(true);
  };

  const handleSubmitAssignment = () => {
    if (selectedIncident && assignee.trim() !== "") {
      setIncidents(incidents.map(inc =>
        inc.id === selectedIncident.id ? { ...inc, assignedTo: assignee } : inc
      ));
      toast.success(`Incident "${selectedIncident.title}" affecté à ${assignee} avec succès !`, {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      setSelectedIncident(null);
      setAssignee("");
    } else {
      toast.error("Veuillez saisir un nom valide pour l'assigné.", {
        position: "bottom-center",
        autoClose: 4000,
      });
    }
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const incidentsPerPage = 3;

  const filteredIncidents = incidents
    .filter(i => i.status !== IncidentStatus.RESOLU)
    .filter(i =>
      (!filterPriority || i.priorité === filterPriority) &&
      (!searchTerm || i.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!filterDate || i.declarationDate === filterDate)
    );

  const paginatedIncidents = filteredIncidents.slice(
    (currentPage - 1) * incidentsPerPage,
    currentPage * incidentsPerPage
  );

  const totalPages = Math.ceil(filteredIncidents.length / incidentsPerPage);

  return (
    <div className="min-h-screen flex flex-col -ml-11">
      <HeaderBar />
      <div className="flex flex-1">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-4/5 p-4 -ml-11">
          <div className="flex justify-between items-center mb-6">
            <div className="text-center w-full">
              <h2 className="text-4xl font-bold mb-1 -pl-2">Affectation des incidents</h2>
              <p className="text-gray-600 text-lg">Assignez les incidents aux membres de l'équipe</p>
            </div>
            <button className="bg-gray-200 px-4 py-2 rounded flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Exporter</span>
            </button>
          </div>

          {/* Barre de recherche et filtres */}
          <div className="flex space-x-4 mb-4 relative">
            <div className="relative flex items-center w-full">
              <Search className="absolute left-3 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Rechercher un incident..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="ml-auto flex items-center space-x-4 relative">
              <button
                onClick={handleSortByPriority}
                className="flex items-center gap-2 px-3 py-3 ml-4 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 text-gray-700 text-lg font-medium"
              >
                <ArrowUpDown size={16} />
                Trier
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className="flex items-center gap-2 px-3 py-3 bg-white border border-green-600 rounded-md shadow-sm hover:bg-gray-100 text-green-600 text-lg font-medium"
                >
                  <SlidersHorizontal size={16} />
                  Filtres
                </button>

                {showFilter && (
                  <div className="absolute right-0 mt-2 w-64 bg-white p-4 border border-gray-300 rounded-md shadow-lg z-20">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Priorité</label>
                    <select
                      value={filterPriority}
                      onChange={(e) => setFilterPriority(e.target.value as IncidentPriority)}
                      className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                    >
                      <option value="">Toutes</option>
                      <option value={IncidentPriority.ELEVE}>Élevée</option>
                      <option value={IncidentPriority.MOYEN}>Moyenne</option>
                      <option value={IncidentPriority.FAIBLE}>Faible</option>
                    </select>

                    <label className="block mb-2 text-sm font-medium text-gray-700">Date de déclaration</label>
                    <input
                      type="date"
                      value={filterDate}
                      onChange={(e) => setFilterDate(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Liste des incidents */}
          <div className="ml-2 space-y-4">
            {paginatedIncidents.map((incident) => (
              <IncidentCard
                key={incident.id}
                incident={incident}
                onAssign={() => handleAssign(incident)}
              />
            ))}

            {/* Pagination */}
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Précédent
              </button>
              <span className="px-4 py-2 text-gray-700 font-semibold">
                Page {currentPage} sur {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Suivant
              </button>
            </div>
          </div>

          {/* Ici tu peux afficher le formulaire d'assignation avec un bouton qui appelle handleSubmitAssignment */}
          {selectedIncident && (
              <ToastContainer />            
          )}

          {/* ToastContainer doit être présent une seule fois dans ton app ou dans ce composant */}
          
        </div>
      </div>
    </div>
  );
};

export default IncidentAssignment;
