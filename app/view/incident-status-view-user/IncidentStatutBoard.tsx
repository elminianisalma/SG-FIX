"use client";
import React, { useState } from "react";
import {
  ExclamationTriangleIcon,
  Cog6ToothIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import HeaderBar from "../components/HeaderBar";
import Sidebar from "../SideBarComponent/SideBar";

type Incident = {
  id: number;
  title: string;
  progress: number;
  assignedTo?: string;
  comments?: string;
};

type ColumnType = "Déclaré" | "Pris en charge" | "Résolu";

const initialIncidents: Record<ColumnType, Incident[]> = {
  Déclaré: [
    {
      id: 1,
      title: "Erreur de connexion à la base SG_ABS_PROD",
      progress: 0,
      assignedTo: "Mahmoud Fassi",
      comments: "Signalé après la maintenance.",
    },
    {
      id: 2,
      title: "Timeout lors de l'ouverture d'un compte client",
      progress: 0,
      assignedTo: "Mehdi Bouhlaoui",
      comments: "Client a relancé deux fois.",
    },
  ],
  "Pris en charge": [
    {
      id: 3,
      title: "Problème de lenteur sur interface de virements",
      progress: 50,
      assignedTo: "Fatima Ezzahra Arbaoui",
      comments: "Analyse en cours, soupçon de surcharge réseau.",
    },
    {
      id: 4,
      title: "Bug lors de la validation d’un prêt personnel",
      progress: 80,
      assignedTo: "Hicham Zeroual",
      comments: "Correctif en cours de test.",
    },
    {
      id: 5,
      title: "Données erronées dans l’export Excel des relevés",
      progress: 75,
      assignedTo: "Keba",
      comments: "Erreur de mapping identifiée.",
    },
  ],
  Résolu: [
    {
      id: 6,
      title: "Problème d’authentification des agents internes",
      progress: 100,
      assignedTo: "Amine Abdelhak",
      comments: "Résolu après mise à jour des certificats.",
    },
  ],
};

export default function IncidentStatutBoard() {
  const [columns, setColumns] = useState(initialIncidents);
  const [activeView, setActiveView] = useState("Board");

  const getColumnIcon = (col: ColumnType) => {
    switch (col) {
      case "Déclaré":
        return (
          <ExclamationTriangleIcon className="w-6 h-6 text-red-500 animate-bounce" />
        );
      case "Pris en charge":
        return <Cog6ToothIcon className="w-6 h-6 text-yellow-500 animate-spin" />;
      case "Résolu":
        return <CheckCircleIcon className="w-6 h-6 text-green-500 animate-pulse" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen text-[17px]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderBar />
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-9 pb-9 py-10">
          Historique des incidents
        </h1>

        {/* Barre de sélection de vue + recherche */}
        <div className="flex justify-center gap-10 overflow-x-auto pb-9 px-4">
          <div className="flex space-x-1 bg-white py-1 px-1 rounded-xl border shadow-sm">
            {["Board", "Table", "List"].map((view) => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                className={`px-4 py-1.5 text-sm font-medium border rounded-xl transition ${
                  activeView === view
                    ? "bg-gray-300 text-white"
                    : "hover:bg-gray-200 text-gray-700"
                }`}
              >
                {view}
              </button>
            ))}
          </div>

          <div className="flex space-x-2 items-center">
            <div className="relative w-80">
              <input
                type="text"
                placeholder="Rechercher un incident..."
                className="pl-12 pr-4 py-2 text-base border rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
            </div>
            <button className="flex items-center space-x-2 px-5 py-2 text-base border rounded-xl hover:bg-gray-100">
              <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-500" />
              <span>Filtrer</span>
            </button>
          </div>
        </div>

        {/* Board View */}
        {activeView === "Board" && (
          <div className="flex justify-center gap-10 overflow-x-auto pb-9 px-4">
            {(Object.keys(columns) as ColumnType[]).map((col) => (
              <div
                key={col}
                className="min-w-[400px] max-w-[500px] bg-white rounded-3xl shadow-lg p-6 flex-shrink-0"
              >
                <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
                  {getColumnIcon(col)}
                  {col}
                </h2>
                <div className="space-y-6">
                  {columns[col].map((incident) => (
                    <div
                      key={incident.id}
                      className="bg-gray-100 p-6 rounded-2xl border shadow-md"
                    >
                      <h3 className="font-semibold  text-m text-xl mb-3">{incident.title}</h3>
                      <p className="text-m text-gray-700-600 mb-1">
                        Assigné à : {incident.assignedTo || "—"}
                      </p>
          
                      <p className="text-sm text-gray-600 mb-3 italic">
                        {incident.comments || "Pas de commentaire"}
                      </p>
                      <div className="text-sm text-gray-500 mb-3">📅 07 Mai 2025</div>
                      <div className="w-full bg-gray-300 rounded-full h-4">
                        <div
                          className={`h-4 rounded-full ${
                            incident.progress === 100
                              ? "bg-green-500"
                              : incident.progress >= 75
                              ? "bg-blue-500"
                              : incident.progress >= 50
                              ? "bg-yellow-500"
                              : "bg-gray-400"
                          }`}
                          style={{ width: `${incident.progress}%` }}
                        />
                      </div>
                      <p className="text-right text-sm mt-2 text-gray-700 font-semibold">
                        {incident.progress}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List View avec infos supplémentaires */}
        {activeView === "List" && (
          <div className="w-full px-4 pb-10">
            <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
              <div className="grid grid-cols-8 gap-4 bg-gray-100 p-4 font-semibold text-sm text-gray-700">
                <div>Titre</div>
                <div>Catégorie</div>
                <div>Date</div>
                <div>Assigné à</div>
                <div>Pris en charge par</div>
                <div>Commentaire</div>
                <div>Progression</div>
                <div className="text-right">%</div>
              </div>

              {(Object.keys(columns) as ColumnType[]).flatMap((col) =>
                columns[col].map((incident) => (
                  <div
                    key={incident.id}
                    className="grid grid-cols-8 gap-4 p-4 border-t text-sm items-center"
                  >
                    <div className="font-medium text-gray-800">{incident.title}</div>
                    <div className="text-gray-600">{col}</div>
                    <div className="text-gray-500">📅 07 Mai 2025</div>
                    <div className="text-gray-700">{incident.assignedTo || "—"}</div>
                    <div className="text-gray-600 italic truncate">{incident.comments || "—"}</div>
                    <div>
                      <div className="w-full bg-gray-300 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${
                            incident.progress === 100
                              ? "bg-green-500"
                              : incident.progress >= 75
                              ? "bg-blue-500"
                              : incident.progress >= 50
                              ? "bg-yellow-500"
                              : "bg-gray-400"
                          }`}
                          style={{ width: `${incident.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right text-gray-700 font-semibold">
                      {incident.progress}%
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
