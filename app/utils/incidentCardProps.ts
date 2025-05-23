import { IncidentDetail } from "../models/IncidentDetail";
import { Incident } from "./Incidents";

export interface IncidentCardProps {
  key:BigInt
  incident: IncidentDetail;
  onAssign: () => void;
}
