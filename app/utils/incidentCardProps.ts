import { Incident } from "./Incidents";

export interface IncidentCardProps {
  incident: Incident;
  onAssign: () => void;
}
