import axios from "axios";
import { IncidentDetail } from "../models/IncidentDetail"; // Ajuste le chemin selon ton projet
import { Incident } from "../models/Incident";

const API_URL = "http://localhost:8080/incident";

export const IncidentService = {
  createIncident: async (incident: Incident): Promise<any> => {
    try {
      const response = await axios.post(API_URL, incident, {
        headers: { "Content-Type": "application/json",
                    "X-EntityId": "incident",

         },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création de l'incident:", error);
      throw error;
    }
  }, // Ajout de la virgule ici

  getAllIncidents: async (): Promise<IncidentDetail[]> => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          "Content-Type": "application/json",
          "X-EntityId": "incident", 
        },
      });
      // Conversion des champs pour correspondre à IncidentDetail
      const incidents = response.data.map((incident: any) => ({
        ...incident,
        id: BigInt(incident.id), 
        dateAttribution: new Date(incident.dateAttribution), 
        dateResolution: new Date(incident.dateResolution), // Convertir en Date
        dateDeclaration: new Date(incident.dateDeclaration), // Convertir en Date
      }));
      return incidents;
    } catch (error) {
      console.error("Erreur lors de la récupération des incidents:", error);
      throw error;
    }
  },
};