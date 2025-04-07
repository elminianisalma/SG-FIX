export enum IncidentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  RESOLVED = "RESOLVED",
  NEW = "NEW",
  IN_PROGRESS = "IN_PROGRESS",
}

export type Incident = {
  id: string;
  title: string;
  status: IncidentStatus;
  service: string;
  assignedTo: string;
  profileImage: string;
  createdAt: string;
  priority?: string;
  impact?: string;
  urgency?: string;
  sla?: string;
  description?: string;
  customerName?: string;
  lastUpdatedBy?: string;
  lastUpdatedAt?: string;
};

