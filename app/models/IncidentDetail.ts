// TS_IncidentDetail.ts

import { IncidentGravity } from "../utils/IncidentGravity";
import { IncidentPriority } from "../utils/IncidentPriority";
import { IncidentStatus } from "../utils/IncidentStatus";

export interface IncidentDetail {
  id: bigint; // Identifiant de l'incident, de type BigInt pour gérer les grands nombres
  titre: string; // Titre de l'incident
  description: string; // Description de l'incident
  statutIncident: IncidentStatus; // Statut de l'incident (par exemple, "EN_COURS", "RESOLU")
  gravite: IncidentGravity; // Gravité de l'incident
  priorite: IncidentPriority; // Priorité de l'incident
  dateAttribution: string; // Date d'attribution de l'incident
  dateResolution: string; // Date de résolution de l'incident
  dateDeclaration: string; // Date de déclaration de l'incident
  clientSub: string; // Souscription du client
  client_fullName: string; // Nom complet du client
  client_igg: string; // Identifiant global du client
  coeDevSub: string; // Souscription du développeur
  environnement: string; // Environnement concerné
  application: string; // Application concernée
  coeDev_firstName: string; // Prénom du développeur
  client_serviceName: string; // Nom du service du client
  coeDev_serviceName: string; // Nom du service du développeur
  client_firstName: string; // Prénom du client
  client_role: string; // Rôle du client
  client_lastName: string; // Nom de famille du client
  client_mail: string; // Email du client
  coeDev_lastName: string; // Nom de famille du développeur
  coeDev_igg: string; // Identifiant global du développeur
  coeDev_role: string; // Rôle du développeur
  coeDev_fullName: string; // Nom complet du développeur
  coeDev_mail: string; 
  tags:string[];
    fichierJoints?: string[]; // <-- Ajouté ici

}