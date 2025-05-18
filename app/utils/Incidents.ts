import { Comment } from "../core/incident-en-cours/CommentModal";
import { IncidentPriority } from "./IncidentPriority";
import { IncidentStatus } from "./IncidentStatus";
import { IncidentUrgency } from "./IncidentUrgency";

export interface Attachment {
  name: string;
  size: number;  // en octets
  url: string;
}



export interface Incident {
  id: string;
  title: string;
  progress: number;
  assignedTo?: string;
  comments?: Comment[];  // Modifié pour contenir un tableau de Comment
  documentation?: string;
  declarationDate: string;
  resolutionDate?: string;
  declaredBy: string;
  status: IncidentStatus;
  affectedService: string;
  tags?: string[]; // Ajout de tags
  priorité?: IncidentPriority; // Priorité (Low, Medium, High)
  environment?: 'Dev' | 'HF' | 'HT' | 'Prod'; // Environnement
  urgency?: IncidentUrgency; // Urgence
  description?: string; // Description de l'incident
  attachments?: Attachment[];
}
