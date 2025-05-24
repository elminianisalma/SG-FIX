'use client';

import React, { useState } from "react";
import { Card, CardContent } from "../../common/Card";
import { Button } from "../../common/Button";
import { Avatar } from "../../common/avatar";
import ReassignModal from "./ReaffectModal";
import { useRouter } from "next/navigation";
import { getPriorityStyle, IncidentPriority } from "@/app/utils/IncidentPriority";
import Sidebar from "../SideBarComponent/SideBar";
import { IncidentStatus } from "@/app/utils/IncidentStatus";
import {
  User,
  AppWindow,
  Server,
  CalendarDays,
  Eye,
  CheckCircle,
  AlertTriangle,
  Search,
  ArrowUpDown,
  SlidersHorizontal
} from "lucide-react";
import { IncidentDetail } from "@/app/models/IncidentDetail";
import HeaderBar from "../components/HeaderBar";
import IncidentKPIs from "./IncidentKpi";

export default function IncidentNotificationPage() {
  const [showReassignDialog, setShowReassignDialog] = useState(false);
  const [removedIncidents, setRemovedIncidents] = useState<BigInt[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [sortPriority, setSortPriority] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
 
  const [incidents, setIncidents] = useState<IncidentDetail[]>([
    {
      id: BigInt(1),
      titre: "Erreur critique sur l'API de messagerie",
      description: "L'envoi de messages échoue de manière aléatoire.",
      statutIncident: IncidentStatus.SOUMIS,
      gravite: "CRITIQUE",
      priorite: IncidentPriority.ELEVEE,
      dateAttribution: "2025-04-10T14:32:00",
      dateResolution: "",
      dateDeclaration: "2025-04-10T14:32:00",
      clientSub: "client-sub-001",
      client_fullName: "Ahmed Yassine",
      client_igg: "igg001",
      client_firstName: "Ahmed",
      client_lastName: "Yassine",
      client_role: "Responsable IT",
      client_mail: "ahmed.yassine@example.com",
      client_serviceName: "Informatique",
      coeDevSub: "dev-sub-001",
      coeDev_fullName: "Sarah Ben",
      coeDev_firstName: "Sarah",
      coeDev_lastName: "Ben",
      coeDev_igg: "igg-dev-001",
      coeDev_mail: "sarah.ben@company.com",
      coeDev_role: "Développeuse backend",
      coeDev_serviceName: "Développement",
      environnement: "Production",
      application: "API Messaging",
    },
  ]);
    const totalIncidents = incidents.length;
    const critiquesCount = incidents.filter((i) => i.gravite === "CRITIQUE").length;
    const enCoursCount = incidents.filter((i) => i.statutIncident === IncidentStatus.PRIS_EN_CHARGE).length;


  const getRandomAvatarUrl = (name: string) =>
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`;

  const handleTakeCharge = (id: BigInt) => {
    setIncidents((prev) =>
      prev.map((incident) =>
        incident.id === id
          ? { ...incident, statutIncident: IncidentStatus.PRIS_EN_CHARGE }
          : incident
      )
    );
    setRemovedIncidents((prev) => [...prev, id]);

    setTimeout(() => {
      setIncidents((prev) => prev.filter((incident) => incident.id !== id));
      setRemovedIncidents((prev) => prev.filter((incidentId) => incidentId !== id));
    }, 500);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSortPriority(false);
    setShowFilter(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderBar />
      

        <main className="p-6 max-w-7xl mx-auto w-full">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Incidents à traiter</h2>
            <IncidentKPIs total={totalIncidents} critiques={critiquesCount} enCours={enCoursCount} />

          {/* Zone de recherche et boutons */}
        <div className="flex flex-wrap md:flex-nowrap items-center mb-6 gap-4">
        {/* Barre de recherche : prend tout l'espace possible */}
        <div className="relative flex-grow min-w-0">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
            type="text"
            placeholder="Rechercher par titre ou ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md min-w-0"
            />
        </div>

        {/* Groupe de boutons : largeur fixe, ne rétrécit pas */}
        <div className="flex gap-2 justify-end flex-shrink-0">
            <button
            onClick={() => setShowFilter(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-400 rounded hover:bg-red-200 whitespace-nowrap"
            >
            <SlidersHorizontal size={16} />
            Filter
            </button>

            <button
            onClick={() => setSortPriority((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2 bg-green-200 text-gray-800 rounded hover:bg-green-300 whitespace-nowrap"
            >
            <ArrowUpDown className="w-4 h-4" />
            Trier par priorité
            </button>

            <button
            onClick={resetFilters}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 whitespace-nowrap"
            >
            Réinitialiser les filtres
            </button>
        </div>
        </div>

                  {/* Liste des incidents */}
          {incidents.map((incident) => (
            <Card
              key={incident.id.toString()}
              className={`transition-all duration-500 ease-in-out transform ${removedIncidents.includes(incident.id)
                  ? "opacity-0 scale-95"
                  : "opacity-100 scale-100"
                } bg-white rounded-xl shadow mb-4`}
            >
              <CardContent className="space-y-5 p-5">
                <div className="flex gap-4 items-start">
                  <Avatar>
                    <img
                      src={getRandomAvatarUrl(incident.client_fullName)}
                      alt={incident.client_fullName}
                      className="w-12 h-12 rounded-full"
                    />
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <p className="text-xl font-semibold text-gray-800">{incident.titre}</p>
                        <div
                          className={`flex items-center px-2 py-1 rounded-md ${getPriorityStyle(incident.priorite)}`}
                        >
                          <span className="text-base font-bold">{incident.priorite}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <CalendarDays size={16} className="text-indigo-500" />
                          <span><strong>Déclaration :</strong> {incident.dateDeclaration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle size={16} className="text-red-500" />
                          <span><strong>Gravité :</strong> {incident.gravite}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-base text-gray-700">{incident.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-blue-500" />
                        <span><strong>Déclaré par :</strong> {incident.client_fullName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AppWindow size={16} className="text-purple-500" />
                        <span><strong>Application :</strong> {incident.application}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Server size={16} className="text-red-500" />
                        <span><strong>Environnement :</strong> {incident.environnement}</span>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-4">
                      <Button
                        size="lg"
                        variant="outline"
                        className="flex items-center gap-2 text-blue-500 border-blue-500 hover:bg-blue-50"
                        onClick={() => router.push(`/incident/${incident.id}`)}
                      >
                        <Eye className="w-4 h-4 text-blue-500" />
                        Voir Détails
                      </Button>
                    <Button
                        size="lg"
                        variant="default"
                        className="flex items-center gap-2 bg-red-500 text-white hover:bg-red-600"
                        disabled={incident.statutIncident === IncidentStatus.PRIS_EN_CHARGE}
                        onClick={() => handleTakeCharge(incident.id)}
                        >
                        <CheckCircle className="w-4 h-4 text-white" />
                        Prendre en charge
                        </Button>

                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <ReassignModal
            isOpen={showReassignDialog}
            onClose={() => setShowReassignDialog(false)}
          />
        </main>
      </div>
    </div>
  );
}
