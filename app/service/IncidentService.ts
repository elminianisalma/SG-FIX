import axios from 'axios';
import { Incident } from '../models/Incident';

const API_URL = 'http://localhost:8080/incident';

export const IncidentService = {
  createIncident: async (incident: FormData): Promise<any> => {
    return axios.post(API_URL, incident, {
      headers: { 'Content-Type': 'application/json' }
    });
  },

  getAllIncidents: async (): Promise<Incident[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getIncidentById: async (id: number): Promise<Incident> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  deleteIncident: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  }
};
