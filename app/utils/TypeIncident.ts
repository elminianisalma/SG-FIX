// ENUM des statuts d'incident
export enum IncidentStatus {
  DECLARE = 'Déclaré',
  AFFECTE = 'Affecté',
  EN_COURS_ANALYSE = 'En cours d’analyse',
  TRANSFERE = 'Transféré',
  RESOLU = 'Résolu',
}

// ENUM des niveaux de priorité
export enum IncidentPriority {
  FAIBLE = 'FAIBLE',
  MOYENNE = 'MOYENNE',
  ÉLEVÉE = 'ÉLEVÉE',
  CRITIQUE = 'CRITIQUE',
}

// ENUM des niveaux d'impact
export enum IncidentImpact {
  MINEUR = 'Mineur',
  MOYEN = 'Moyen',
  MAJEUR = 'Majeur',
  CRITIQUE = 'Critique',
}

// ENUM des niveaux d'urgence
export enum IncidentUrgency {
  FAIBLE = 'Faible',
  MOYENNE = 'Moyenne',
  ÉLEVÉE = 'Élevée',
  IMMÉDIATE = 'Immédiate',
}

// Interface principale d’un incident
export interface Incident {
  id: string;
  title: string;
  status: IncidentStatus;
  du: string;
  assignedTo: string;
  createdAt: string;
  impact: IncidentImpact | string;
  urgency: IncidentUrgency | string;
  priority: IncidentPriority | string;
  dateResolution?: string;
  tags?: string[];
}
