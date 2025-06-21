"use client";

import React, { useState, useMemo } from "react";
import HeaderBar from "@/app/view/components/HeaderBar";
import FilterPopup from "./FilterPopup";
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
  SlidersHorizontal,
} from "lucide-react";
import HistoriquePopup from "./HistoriquePopup";
import Sidebar from "../SideBarComponent/SideBar";
import { IncidentDetail } from "@/app/models/IncidentDetail";
import { getPriorityStyle, IncidentPriority } from "@/app/utils/IncidentPriority";
import { KPICards } from "./KpiCard";
import { getStatusStyle, IncidentStatus } from "@/app/utils/IncidentStatus";
import { getGravityStyle, IncidentGravity } from "@/app/utils/IncidentGravity";

// Mock data for incidents
const mockIncidents: IncidentDetail[] = [
  {
    id: BigInt(1),
    titre: "Panne du serveur principal",
    description: "Le serveur principal a cessé de répondre en raison d’une surcharge.",
    statutIncident: IncidentStatus.AFFECTE,
    gravite: IncidentGravity.MAJEUR,
    priorite: IncidentPriority.MOYENNE,
    dateAttribution: "2025-06-01T09:00:00Z",
    dateResolution: "2025-06-01T15:00:00Z",
    dateDeclaration: "2025-06-01T10:00:00Z",
    clientSub: "SUB123",
    client_fullName: "Jean Dupont",
    client_igg: "IGG001",
    coeDevSub: "DEV456",
    environnement: "Production",
    application: "Serveur A",
    coeDev_firstName: "Alice",
    client_serviceName: "Support Client",
    coeDev_serviceName: "Équipe Dev",
    client_firstName: "Jean",
    client_role: "Administrateur",
    client_lastName: "Dupont",
    client_mail: "jean.dupont@example.com",
    coeDev_lastName: "Smith",
    coeDev_igg: "IGG008",
    coeDev_role: "Développeur",
    coeDev_fullName: "Alice Smith",
    coeDev_mail: "alice.smith@example.com",
    tags: ["serveur", "urgence", "surcharge"],
    fichierJoints: ["log_serveur.txt", "screenshot.png"],
  },
  {
    id: BigInt(2),
    titre: "Erreur de connexion utilisateur",
    description: "Les utilisateurs ne peuvent pas se connecter à l’application mobile.",
    statutIncident: IncidentStatus.AFFECTE,
    gravite: IncidentGravity.MAJEUR,
    priorite: IncidentPriority.MOYENNE,
    dateAttribution: "2025-06-02T13:00:00Z",
    dateResolution: "",
    dateDeclaration: "2025-06-02T14:30:00Z",
    clientSub: "SUB124",
    client_fullName: "Marie Martin",
    client_igg: "IGG003",
    coeDevSub: "DEV457",
    environnement: "Test",
    application: "App Mobile",
    coeDev_firstName: "Bob",
    client_serviceName: "Support Utilisateur",
    coeDev_serviceName: "Équipe Mobile",
    client_firstName: "Marie",
    client_role: "Utilisateur",
    client_lastName: "Martin",
    client_mail: "marie.martin@example.com",
    coeDev_lastName: "Johnson",
    coeDev_igg: "IGG004",
    coeDev_role: "Développeur Mobile",
    coeDev_fullName: "Bob Johnson",
    coeDev_mail: "bob.johnson@example.com",
    tags: ["connexion", "mobile"],
    fichierJoints: ["error_log.txt"],
  },
  {
    id: BigInt(3),
    titre: "Problème de base de données",
    description: "La base de données ne répond pas aux requêtes complexes.",
    statutIncident: IncidentStatus.AFFECTE,
    gravite: IncidentGravity.MAJEUR,
    priorite: IncidentPriority.MOYENNE,
    dateAttribution: "2025-05-30T08:00:00Z",
    dateResolution: "",
    dateDeclaration: "2025-05-30T09:15:00Z",
    clientSub: "SUB125",
    client_fullName: "Paul Durand",
    client_igg: "IGG005",
    coeDevSub: "DEV458",
    environnement: "Production",
    application: "DB Serveur",
    coeDev_firstName: "Clara",
    client_serviceName: "Support DB",
    coeDev_serviceName: "Équipe DB",
    client_firstName: "Paul",
    client_role: "DBA",
    client_lastName: "Durand",
    client_mail: "paul.durand@example.com",
    coeDev_lastName: "Brown",
    coeDev_igg: "IGG006",
    coeDev_role: "Administrateur BD",
    coeDev_fullName: "Clara Brown",
    coeDev_mail: "clara.brown@example.com",
    tags: ["database", "performance"],
    fichierJoints: ["query_log.sql", "db_report.pdf"],
  },
  {
    id: BigInt(4),
    titre: "Bug d’affichage UI",
    description: "L’interface utilisateur affiche des éléments mal alignés.",
    statutIncident: IncidentStatus.AFFECTE,
    gravite: IncidentGravity.MAJEUR,
    priorite: IncidentPriority.MOYENNE,
    dateAttribution: "",
    dateResolution: "",
    dateDeclaration: "2025-06-03T08:45:00Z",
    clientSub: "SUB126",
    client_fullName: "Sophie Lefevre",
    client_igg: "IGG007",
    coeDevSub: "DEV459",
    environnement: "Développement",
    application: "Web App",
    coeDev_firstName: "David",
    client_serviceName: "Support UI",
    coeDev_serviceName: "Équipe Frontend",
    client_firstName: "Sophie",
    client_role: "Testeur",
    client_lastName: "Lefevre",
    client_mail: "sophie.lefevre@example.com",
    coeDev_lastName: "Wilson",
    coeDev_igg: "IGG008",
    coeDev_role: "Développeur Frontend",
    coeDev_fullName: "David Wilson",
    coeDev_mail: "david.wilson@example.com",
    tags: ["ui", "bug"],
    fichierJoints: ["screenshot_ui.jpg"],
  },
];

const statusLabels: Record<string, string> = {
  SUBMITTED: "Soumis",
  ASSIGNED: "Affecté",
  TAKEN_OVER: "Pris en charge",
  TRANSFERRED: "Transféré",
  RESOLVED: "Résolu",
};

export default function HistoriqueIncident() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIncident, setSelectedIncident] = useState<IncidentDetail | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [filters, setFilters] = useState<{ status?: string; priority?: IncidentPriority }>({});
  const [sortPriority, setSortPriority] = useState<string>("");
  const [page, setPage] = useState(1);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filterPriority, setFilterPriority] = useState<IncidentPriority | "">("");
  const [filterStatus, setFilterStatus] = useState<string>("");

  const sortedIncidents = useMemo(() => {
    return [...mockIncidents].sort((a, b) =>
      new Date(b.dateDeclaration).getTime() - new Date(a.dateDeclaration).getTime()
    );
  }, []);

  const priorityValue = (p?: IncidentPriority): number => {
    if (p === IncidentPriority.ELEVEE) return 3;
    if (p === IncidentPriority.MOYENNE) return 2;
    if (p === IncidentPriority.FAIBLE) return 1;
    return 0;
  };

  const incidentsFiltres = useMemo(() => {
    let result = sortedIncidents.filter((incident) => {
      const matchSearch =
        incident.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.id.toString().toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus = !filters.status || incident.statutIncident === filters.status;
      const matchPriority = !filters.priority || incident.priorite === filters.priority;

      return matchSearch && matchStatus && matchPriority;
    });

    if (sortPriority) {
      result = result.sort(
        (a, b) =>
          ["CRITIQUE", "ELEVEE", "MOYENNE", "FAIBLE"].indexOf(a.priorite) -
          ["CRITIQUE", "ELEVEE", "MOYENNE", "FAIBLE"].indexOf(b.priorite)
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

  const applyFilters = () => {
    setFilters({
      status: filterStatus,
      priority: filterPriority as IncidentPriority,
    });
    setShowFilter(false);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen text-[17px]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderBar />
        <main className="p-6 max-w-[100%] mx-auto w-full relative">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Historique des incidents
          </h1>
          <div className="flex space-x-4 mb-4 relative ml-52 max-w-[80%]">
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
                className="flex items-center gap-2 px-3 py-3 ml-4 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 text-gray-700 text-lg font-medium"
                onClick={() => setSortPriority(sortPriority ? "" : "asc")}
              >
                <ArrowUpDown size={16} />
                Trier
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className="flex items-center gap-2 px-3 py-3 bg-white border border-black-600 rounded-md shadow-sm hover:bg-gray-100 text-black-600 text-lg font-medium"
                >
                  <SlidersHorizontal size={16} />
                  Filtres
                </button>

                {showFilter && (
                  <div className="absolute right-0 mt-2 w-64 bg-white p-4 border border-gray-300 rounded-md shadow-lg z-20">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Statut
                    </label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                    >
                      <option value="">Tous</option>
                      {Object.values(IncidentStatus).map((status) => (
                        <option key={status} value={status}>
                          {statusLabels[status] || status}
                        </option>
                      ))}
                    </select>

                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Priorité
                    </label>
                    <select
                      value={filterPriority}
                      onChange={(e) => setFilterPriority(e.target.value as IncidentPriority)}
                      className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                    >
                      <option value="">Toutes</option>
                      <option value={IncidentPriority.ELEVEE}>Élevée</option>
                      <option value={IncidentPriority.MOYENNE}>Moyenne</option>
                      <option value={IncidentPriority.FAIBLE}>Faible</option>
                    </select>

                    <button
                      onClick={applyFilters}
                      className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Appliquer
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow overflow-x-auto ml-52 max-w-[80%]">
            <table className="min-w-full text-left text-gray-700 text-[16px]">
              <thead className="bg-gray-100 text-sm uppercase">
                <tr>
                  <th className="px-6 py-3">
                    <span className="inline-block align-middle">
                      <ListOrdered className="w-4 h-4 inline-block mr-2 align-middle" />
                      ID
                    </span>
                  </th>
                  <th className="px-6 py-3">
                    <span className="inline-block align-middle">
                      <FileText className="w-4 h-4 inline-block mr-2 align-middle" />
                      Titre
                    </span>
                  </th>
                  <th className="px-6 py-3">
                    <span className="inline-block align-middle">
                      <Circle className="w-4 h-4 inline-block mr-2 align-middle" />
                      Statut
                    </span>
                  </th>
                  <th className="px-6 py-3">
                    <span className="inline-block align-middle">
                      <AlertTriangle className="w-4 h-4 inline-block mr-2 align-middle" />
                      Priorité
                    </span>
                  </th>
                  <th className="px-6 py-3">
                    <span className="inline-block align-middle">
                      <AlertTriangle className="w-4 h-4 inline-block mr-2 align-middle" />
                      Gravité
                    </span>
                  </th>
                  <th className="px-6 py-3">
                    <span className="inline-block align-middle">
                      <Cpu className="w-4 h-4 inline-block mr-2 align-middle" />
                      Application
                    </span>
                  </th>
                  <th className="px-6 py-3">
                    <span className="inline-block align-middle">
                      <User className="w-4 h-4 inline-block mr-2 align-middle" />
                      Déclaré par
                    </span>
                  </th>
                  <th className="px-6 py-3">
                    <span className="inline-block align-middle">
                      <CalendarDays className="w-4 h-4 inline-block mr-2 align-middle" />
                      Date
                    </span>
                  </th>
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
                      <span
                        className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                          incident.statutIncident
                        )}`}
                      >
                        {statusLabels[incident.statutIncident] || incident.statutIncident}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full ${getPriorityStyle(
                          incident.priorite
                        )}`}
                      >
                        {incident.priorite}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full ${getGravityStyle(
                          incident.gravite
                        )}`}
                      >
                        {incident.gravite}
                      </span>
                    </td>
                    <td className="px-6 py-4">{incident.application}</td>
                    <td className="px-6 py-4">{incident.client_fullName}</td>
                    <td className="px-6 py-4">{incident.dateDeclaration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-6 ml-8 max-w-[80%]">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`flex items-center gap-2 px-4 py-2 border rounded ${
                page === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
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
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
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