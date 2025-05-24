import { Comment } from "../view/incident-en-cours/CommentModal";
import { EnvironmentIncident } from "./EnvironnemntIncident";
import { IncidentGravity } from "./IncidentGravity";
import { IncidentPriority } from "./IncidentPriority";
import { IncidentStatus } from "./IncidentStatus";

export interface Attachment {
  name: string;
  size: number;  // en octets
  url: string;
}



export interface Incident {
        id: BigInt,
        title: string,
        description:string,
        status:string,
        priorité: string,
        declarationDate: string,
        affectedService: string,
        environment:string,
        declaredBy: string,
        assignedTo:string,
}