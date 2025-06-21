"use client";

import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { IncidentDetail } from "@/app/models/IncidentDetail";
import { IncidentStatus } from "@/app/utils/IncidentStatus";
import { IncidentGravity } from "@/app/utils/IncidentGravity";
import { IncidentPriority } from "@/app/utils/IncidentPriority";

// Mock data (remplacez par votre source de données réelle, ex. API ou state global)
const mockIncidents: IncidentDetail[] = [
  {
    id: BigInt(1),
    titre: "Panne du serveur principal",
    description: "Le serveur principal a cessé de répondre en raison d’une surcharge.",
    statutIncident:IncidentStatus.AFFECTE,
    gravite: IncidentGravity.MINEUR,
    priorite: IncidentPriority.CRITIQUE,
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
  // Ajoutez d'autres incidents si nécessaire
];

interface GlobalSearchProps {
  onSearchResult: (incidents: IncidentDetail[]) => void; // Callback pour renvoyer les résultats
}

export default function GlobalSearch({ onSearchResult }: GlobalSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrer les incidents en fonction de la recherche
  const filteredIncidents = useMemo(() => {
    if (!searchTerm) return [];
    return mockIncidents.filter((incident) =>
      incident.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.id.toString().includes(searchTerm) ||
      incident.client_fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Mettre à jour les résultats à chaque changement
  React.useEffect(() => {
    onSearchResult(filteredIncidents);
  }, [filteredIncidents, onSearchResult]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Rechercher un incident par titre, ID ou nom du client..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>
    </div>
  );
}

