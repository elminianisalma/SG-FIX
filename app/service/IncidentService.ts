import axios from "axios";
import { IncidentDetail } from "../models/IncidentDetail";
import { Incident } from "../models/Incident";

const API_URL = "http://localhost:8080/incident";

export const IncidentService = {
createIncident: async (formData: FormData): Promise<any> => {
  try {
    const response = await axios.post(API_URL, formData, {
      headers: { "X-EntityId": "BF" },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
},


  getAllIncidents: async (): Promise<IncidentDetail[]> => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          "Content-Type": "application/json",
          "X-EntityId": "incident",
        },
      });
      const incidents = response.data.map((incident: any) => ({
        ...incident,
        id: BigInt(incident.id),
        dateAttribution: incident.dateAttribution ? new Date(incident.dateAttribution).toISOString() : "",
        dateResolution: incident.dateResolution ? new Date(incident.dateResolution).toISOString() : "",
        dateDeclaration: incident.dateDeclaration ? new Date(incident.dateDeclaration).toISOString() : "",
      }));
      return incidents;
    } catch (error) {
      console.error("Erreur lors de la récupération des incidents:", error);
      throw error;
    }
  },

  findMyIncidents: async (igg: string): Promise<IncidentDetail[]> => {
    try {
      const response = await axios.get(`${API_URL}/client/${igg}`, {
        headers: {
          "Content-Type": "application/json",
          "X-EntityId": "incident",
        },
      });
      const incidents = response.data.map((incident: any) => ({
        ...incident,
        id: BigInt(incident.id),
        dateAttribution: incident.dateAttribution ? new Date(incident.dateAttribution).toISOString() : "",
        dateResolution: incident.dateResolution ? new Date(incident.dateResolution).toISOString() : "",
        dateDeclaration: incident.dateDeclaration ? new Date(incident.dateDeclaration).toISOString() : "",
      }));
      return incidents;
    } catch (error) {
      console.error("Erreur lors de la récupération des incidents pour l'IGG:", error);
      throw error;
    }
  },
  
};