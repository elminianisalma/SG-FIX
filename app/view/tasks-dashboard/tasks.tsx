"use client";
import React, { useState } from "react";
import Sidebar from "../SideBarComponent/Sidebar";
import HeaderBar from "../components/HeaderBar";
import {
  Search,
  User,
  Calendar,
  Layers,
  AlertTriangle,
  Clock,
  CheckCircle,
  LayoutGrid,
  List,
  Table,
  SlidersHorizontal,
} from "lucide-react";
import { Incident } from "@/app/utils/Incidents";
import { initialIncidents } from "../assign-incident/data";
import { IncidentStatus } from "@/app/utils/IncidentStatus";
import { IncidentPriority } from "@/app/utils/IncidentPriority";

export type ColumnType = "A Faire" | "En cours d’analyse" | "Résolu";

export default function IncidentStatutBoard() {
  const organizeIncidentsByStatus = (incidents: Incident[]): Record<ColumnType, Incident[]> => {
    return incidents.reduce(
      (acc, incident) => {
        if (incident.status === IncidentStatus.DECLARE) {
          acc["A Faire"].push(incident);
        } else if (incident.status === IncidentStatus.EN_COURS_ANALYSE) {
          acc["En cours d’analyse"].push(incident);
        } else if (incident.status === IncidentStatus.RESOLU) {
          acc["Résolu"].push(incident);
        }
        return acc;
      },
      {
        "A Faire": [],
        "En cours d’analyse": [],
        "Résolu": [],
      } as Record<ColumnType, Incident[]>
    );
  };
  const getInitials = (fullName: string) => {
  if (!fullName) return "";
  const names = fullName.trim().split(" ");
  const initials = names.slice(0, 2).map((n) => n[0].toUpperCase());
  return initials.join("");
};
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filterPriority, setFilterPriority] = useState<IncidentPriority | ''>('');
  const [filterDate, setFilterDate] = useState<string>("");

  const [columns, setColumns] = useState<Record<ColumnType, Incident[]>>(() =>
    organizeIncidentsByStatus(initialIncidents)
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeView, setActiveView] = useState("Board");

  const getColumnIcon = (col: ColumnType) => {
    switch (col) {
      case "A Faire":
        return <AlertTriangle className="text-red-500" size={30} />;
      case "En cours d’analyse":
        return <Clock className="text-yellow-500" size={30} />;
      case "Résolu":
        return <CheckCircle className="text-green-500" size={30} />;
      default:
        return null;
    }
  };

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("fr-FR", options);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen text-[17px]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderBar />
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6 pt-10">
          Historique des incidents
        </h1>
        {/* Onglets de navigation */}
        <div className="flex justify-center items-center gap-6 px-10 border-b border-gray-300 mb-6">
          {[
            { name: "Overview", value: "Overview" },
            { name: "Board", value: "Board" },
            { name: "List", value: "List" },
            { name: "Table", value: "Table" },
            { name: "Timeline", value: "Timeline" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveView(tab.value)}
              className={`flex items-center gap-2 py-3 px-2 border-b-2 text-lg font-medium transition-all ${
                activeView === tab.value
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-gray-600 hover:text-purple-600 hover:border-purple-600"
              }`}
            >
              {tab.name === "Overview" && <Search size={16} />}
              {tab.name === "Board" && <LayoutGrid size={16} />}
              {tab.name === "List" && <List size={16} />}
              {tab.name === "Table" && <Table size={16} />}
              {tab.name === "Timeline" && <Clock size={16} />}
              {tab.name}
            </button>
          ))}
        </div>

        {/* Board View */}
        {activeView === "Board" && (
          <div className="flex justify-center gap-6 overflow-x-auto pb-9 px-4">
            {(Object.keys(columns) as ColumnType[]).map((col) => (
              <div
                key={col}
                className="min-w-[320px] max-w-[360px] bg-white rounded-3xl shadow-lg p-5 flex-shrink-0"
              >
               <h2 className="text-xl font-bold mb-4 text-center flex items-center justify-center gap-2"> 
                {getColumnIcon(col)} {col}
              </h2>
                <div className="space-y-4">
               {columns[col]
                  .filter((incident) =>
                    incident.title.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((incident: Incident) => {
                    const cardColor =
                      incident.status === IncidentStatus.DECLARE
                        ? "bg-red-30"
                        : incident.status === IncidentStatus.EN_COURS_ANALYSE
                        ? "bg-yellow-30"
                        : "bg-green-30";

                    return (
                      <div
                        key={incident.id}
                        className={`${cardColor} p-6 rounded-2xl border shadow-md text-[20px]`}

                      >
                        <h3 className="font-semibold text-lg mb-2 break-words ">
                          {incident.title}
                        </h3>
                       <div className="flex items-center text-lg mb-1 break-words">
                        <div className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center mr-2 font-bold text-xs">
                          {getInitials(incident.declaredBy || "")}
                        </div>
                        <span>
                          Déclaré par : {incident.declaredBy || "—"} le {formatDate(incident.declarationDate)}
                        </span>
                      </div>
                        <p className="flex items-center text-lg mb-1 break-words">
                          <Layers className="mr-2 text-indigo-500" size={16} />
                          Service affecté : {incident.affectedService || "—"}
                        </p>
                        <p className="flex items-center text-lg  mb-1 break-words">
                          <AlertTriangle className="mr-2 text-red-500" size={16} />
                          Priorité : {incident.priorité || "—"}
                        </p>
                        <p className="flex items-center text-lg  mb-1 break-words">
                          <Calendar className="mr-2 text-green-600" size={16} />
                          Environnement : {incident.environment || "—"}
                        </p>
                      </div>
                    );
                  })}

                </div>
              </div>
            ))}
          </div>
        )}
        {activeView === "List" && (
          <div className="px-12 py-6 overflow-x-auto ml-20">
            <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden border">
              <thead className="bg-gray-100">
                <tr className="text-left text-sm text-gray-700">
                  <th className="px-4 py-3 mr-0">
                    <div className="flex items-center gap-2">
                      <LayoutGrid size={20} /> Titre
                    </div>
                  </th>
                  <th className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <User size={20} /> Déclaré par
                    </div>
                  </th>
                  <th className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Calendar size={20} /> Date
                    </div>
                  </th>
                  <th className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Layers size={20} /> Service
                    </div>
                  </th>
                  <th className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle size={20} /> Priorité
                    </div>
                  </th>
                  <th className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Clock size={20} /> Environnement
                    </div>
                  </th>
                  <th className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={20} /> Statut
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.values(columns)
                  .flat()
                  .filter((incident) =>
                    incident.title.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((incident) => {
                    const priorityColor =
                      incident.priorité === IncidentPriority.ELEVE
                        ? "text-red-600 font-semibold"
                        : incident.priorité === IncidentPriority.MOYEN
                        ? "text-yellow-600 font-semibold"
                        : "text-green-600 font-semibold";

                    const statusBadge =
                      incident.status === IncidentStatus.DECLARE
                        ? "bg-red-100 text-red-700"
                        : incident.status === IncidentStatus.EN_COURS_ANALYSE
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700";

                    const statusLabel =
                      incident.status === IncidentStatus.DECLARE
                        ? "Déclaré"
                        : incident.status === IncidentStatus.EN_COURS_ANALYSE
                        ? "Analyse"
                        : "Résolu";

                    return (
                      <tr key={incident.id} className="border-t hover:bg-gray-50 text-base text-gray-800">
                        <td className="px-4 py-3 font-medium">{incident.title}</td>
                        <td className="px-4 py-3">{incident.declaredBy || "—"}</td>
                        <td className="px-4 py-3">{formatDate(incident.declarationDate)}</td>
                        <td className="px-4 py-3">{incident.affectedService || "—"}</td>
                        <td className={`px-4 py-3 ${priorityColor}`}>{incident.priorité || "—"}</td>
                        <td className="px-4 py-3">{incident.environment || "—"}</td>
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 rounded-full text-base font-medium ${statusBadge}`}>
                            {statusLabel}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {Object.values(columns).flat().filter((incident) =>
              incident.title.toLowerCase().includes(searchTerm.toLowerCase())
            ).length === 0 && (
              <p className="text-center text-gray-500 italic mt-4">Aucun incident trouvé.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}