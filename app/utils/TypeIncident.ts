export enum IncidentStatus {
  DECLARED = "Déclaré",
  ASSIGNED = "Affecté",
  ANALYSING = "En cours d’analyse",
  TRANSFERRED = "Transféré",
  RESOLVED = "Résolu"
}

export type Incident = {
  id: string;
  title: string;
  status: IncidentStatus;
  service: string;
  assignedTo: string;
  createdAt: string;
  impact: string;
  urgency: string;
  priority: string;
  sla?: string;
  description?: string;
  customerName?: string;
  lastUpdatedBy?: string;
  lastUpdatedAt?: string;
};
