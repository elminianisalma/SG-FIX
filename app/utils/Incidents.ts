import { Comment } from "../view/incident-en-cours/CommentModal";
import { IncidentGravity } from "./IncidentGravity";
import { IncidentPriority } from "./IncidentPriority";
import { IncidentStatus } from "./IncidentStatus";

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
  gravité?: IncidentGravity; // Urgence
  description?: string; // Description de l'incident
  attachments?: Attachment[];
}
