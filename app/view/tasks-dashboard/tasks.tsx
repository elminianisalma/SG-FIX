"use client";
import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { IncidentDetail } from "@/app/models/IncidentDetail";
import { IncidentStatus } from "@/app/utils/IncidentStatus";
import { IncidentPriority } from "@/app/utils/IncidentPriority";
import Sidebar from "../SideBarComponent/SideBar";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { IncidentService } from "@/app/service/IncidentService";

export type ColumnType = "Affecté à moi" | "En cours de traitement" | "Résolu";

export default function IncidentStatutBoard({ igg }: { igg: string }) {
  const organizeIncidentsByStatus = (incidents: IncidentDetail[]): Record<ColumnType, IncidentDetail[]> => {
    return incidents.reduce(
      (acc, incident) => {
        if (incident.statutIncident === IncidentStatus.AFFECTE) {
          acc["Affecté à moi"].push(incident);
        } else if (incident.statutIncident === IncidentStatus.PRIS_EN_CHARGE) {
          acc["En cours de traitement"].push(incident);
        } else if (incident.statutIncident === IncidentStatus.RESOLU) {
          acc["Résolu"].push(incident);
        }
        return acc;
      },
      {
        "Affecté à moi": [],
        "En cours de traitement": [],
        "Résolu": [],
      } as Record<ColumnType, IncidentDetail[]>
    );
  };

  const getInitials = (fullName: string) => {
    if (!fullName) return "";
    const names = fullName.trim().split(" ");
    const initials = names.slice(0, 2).map((n) => n[0].toUpperCase());
    return initials.join("");
  };

  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filterPriority, setFilterPriority] = useState<IncidentPriority | "">("");
  const [filterDate, setFilterDate] = useState<string>("");
  const [columns, setColumns] = useState<Record<ColumnType, IncidentDetail[]>>({
    "Affecté à moi": [],
    "En cours de traitement": [],
    "Résolu": [],
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeView, setActiveView] = useState("Board");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch incidents from the backend using IncidentService
  useEffect(() => {
    const fetchIncidents = async (iggValue: string) => {
      setLoading(true);
      setError(null);
      try {
        const statuses = [
          IncidentStatus.AFFECTE,
          IncidentStatus.PRIS_EN_CHARGE,
          IncidentStatus.RESOLU,
        ];
        const fetchPromises = statuses.map(async (statut) => {
          const data = await IncidentService.findAffectedIncidents(iggValue, statut);
          return data;
        });

        // Wait for all fetch requests to complete
        const results = await Promise.all(fetchPromises);
        const allIncidents: IncidentDetail[] = results.flat(); // Combine all incidents

        // Organize incidents by status
        const organizedIncidents = organizeIncidentsByStatus(allIncidents);
        setColumns(organizedIncidents);
      } catch (err) {
        setError("Erreur lors de la récupération des incidents.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (igg) {
      fetchIncidents(igg);
    } else {
      setError("IGG non fourni.");
      setLoading(false);
    }
  }, [igg]); // Re-fetch if igg changes

  const getColumnIcon = (col: ColumnType) => {
    switch (col) {
      case "Affecté à moi":
        return <AlertTriangle className="text-red-500" size={30} />;
      case "En cours de traitement":
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

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }

    // Handle dragging from "Affecté à moi" to "En cours de traitement"
    if (source.droppableId === "Affecté à moi" && destination.droppableId === "En cours de traitement") {
      const sourceColumn = columns["Affecté à moi"];
      const destColumn = columns["En cours de traitement"];
      const draggedIncident = sourceColumn[source.index];

      // Update the incident's status
      const updatedIncident = { ...draggedIncident, statutIncident: IncidentStatus.PRIS_EN_CHARGE };

      // Remove from source and add to destination
      const newSourceColumn = [...sourceColumn];
      newSourceColumn.splice(source.index, 1);
      const newDestColumn = [...destColumn];
      newDestColumn.splice(destination.index, 0, updatedIncident);

      // Update state
      setColumns({
        ...columns,
        "Affecté à moi": newSourceColumn,
        "En cours de traitement": newDestColumn,
      });

    }
    // Handle dragging from "En cours de traitement" to "Résolu"
    else if (source.droppableId === "En cours de traitement" && destination.droppableId === "Résolu") {
      const sourceColumn = columns["En cours de traitement"];
      const destColumn = columns["Résolu"];
      const draggedIncident = sourceColumn[source.index];

      // Update the incident's status
      const updatedIncident = { ...draggedIncident, statutIncident: IncidentStatus.RESOLU };

      // Remove from source and add to destination
      const newSourceColumn = [...sourceColumn];
      newSourceColumn.splice(source.index, 1);
      const newDestColumn = [...destColumn];
      newDestColumn.splice(destination.index, 0, updatedIncident);

      // Update state
      setColumns({
        ...columns,
        "En cours de traitement": newSourceColumn,
        "Résolu": newDestColumn,
      });
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen text-[17px]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderBar />
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6 pt-10">
          Historique des incidents
        </h1>
        {/* Loading and Error States */}
        {loading && <p className="text-center text-gray-600">Chargement des incidents...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}
        {/* Navigation Tabs */}
        {!loading && !error && (
          <>
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

            {/* Board View with Drag and Drop */}
            {activeView === "Board" && (
              <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex justify-center gap-6 overflow-x-auto pb-9 px-4">
                  {(Object.keys(columns) as ColumnType[]).map((col) => (
                    <Droppable
                      droppableId={col}
                      key={col}
                      isDropDisabled={col === "Affecté à moi"}
                    >
                      {(provided) => (
                        <div
                          className="min-w-[320px] max-w-[360px] bg-white rounded-3xl shadow-lg p-5 flex-shrink-0"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          <h2 className="text-xl font-bold mb-4 text-center flex items-center justify-center gap-2">
                            {getColumnIcon(col)} {col}
                          </h2>
                          <div className="space-y-4">
                            {columns[col]
                              .filter((incident) =>
                                incident.titre.toLowerCase().includes(searchTerm.toLowerCase())
                              )
                              .map((incident: IncidentDetail, index: number) => (
                                <Draggable
                                  key={incident.id.toString()}
                                  draggableId={incident.id.toString()}
                                  index={index}
                                  isDragDisabled={col === "Résolu"}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`${
                                        incident.statutIncident === IncidentStatus.AFFECTE
                                          ? "bg-red-30"
                                          : incident.statutIncident === IncidentStatus.PRIS_EN_CHARGE
                                          ? "bg-yellow-30"
                                          : "bg-green-30"
                                      } p-6 rounded-2xl border shadow-md text-[20px]`}
                                    >
                                      <h3 className="font-semibold text-lg mb-2 break-words">
                                        {incident.titre}
                                      </h3>
                                      <div className="flex items-center text-lg mb-1 break-words">
                                        <div className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center mr-2 font-bold text-xs">
                                          {getInitials(incident.client_fullName || "")}
                                        </div>
                                        <span>
                                          Déclaré par : {incident.client_fullName || "—"} le{" "}
                                          {formatDate(incident.dateDeclaration)}
                                        </span>
                                      </div>
                                      <p className="flex items-center text-lg mb-1 break-words">
                                        <Layers className="mr-2 text-indigo-500" size={16} />
                                        Service affecté : {incident.application || "—"}
                                      </p>
                                      <p className="flex items-center text-lg mb-1 break-words">
                                        <AlertTriangle className="mr-2 text-red-500" size={16} />
                                        Priorité : {incident.priorite || "—"}
                                      </p>
                                      <p className="flex items-center text-lg mb-1 break-words">
                                        <Calendar className="mr-2 text-green-600" size={16} />
                                        Environnement : {incident.environnement || "—"}
                                      </p>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                            {provided.placeholder}
                          </div>
                        </div>
                      )}
                    </Droppable>
                  ))}
                </div>
              </DragDropContext>
            )}

            {/* List View */}
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
                        incident.titre.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((incident) => {
                        const priorityColor =
                          incident.priorite === IncidentPriority.ELEVEE
                            ? "text-red-600 font-semibold"
                            : incident.priorite === IncidentPriority.MOYENNE
                            ? "text-yellow-600 font-semibold"
                            : "text-green-600 font-semibold";

                        const statusBadge =
                          incident.statutIncident === IncidentStatus.AFFECTE
                            ? "bg-red-100 text-red-700"
                            : incident.statutIncident === IncidentStatus.PRIS_EN_CHARGE
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700";

                        const statusLabel =
                          incident.statutIncident === IncidentStatus.AFFECTE
                            ? "Déclaré"
                            : incident.statutIncident === IncidentStatus.PRIS_EN_CHARGE
                            ? "En cours"
                            : "Résolu";

                        return (
                          <tr
                            key={incident.id.toString()}
                            className="border-t hover:bg-gray-50 text-base text-gray-800"
                          >
                            <td className="px-4 py-3 font-medium">{incident.titre}</td>
                            <td className="px-4 py-3">{incident.client_fullName || "—"}</td>
                            <td className="px-4 py-3">{formatDate(incident.dateDeclaration)}</td>
                            <td className="px-4 py-3">{incident.application || "—"}</td>
                            <td className={`px-4 py-3 ${priorityColor}`}>{incident.priorite || "—"}</td>
                            <td className="px-4 py-3">{incident.environnement || "—"}</td>
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
                {Object.values(columns)
                  .flat()
                  .filter((incident) => incident.titre.toLowerCase().includes(searchTerm.toLowerCase()))
                  .length === 0 && (
                  <p className="text-center text-gray-500 italic mt-4">Aucun incident trouvé.</p>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}