export interface Incident {
  titre: string;
  description: string;
  gravite: string;
  priorite: string;
  clientIgg: string;
  coeDevIgg: string | null;
  environnement: string;
  tags: string[];
  application: string;
  files ?:FileList | File[];
}
