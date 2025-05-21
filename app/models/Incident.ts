export interface Incident {
  titre: string;
  description: string;
  gravité: string;
  priorité: string;
  clientIgg: string;
  coeDevIgg: string | null;
  environnement: string;
  tags: string[];
  application: string;
}
