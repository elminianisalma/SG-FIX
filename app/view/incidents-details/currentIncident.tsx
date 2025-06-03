import { IncidentGravity } from "@/app/utils/IncidentGravity";
import { IncidentPriority } from "@/app/utils/IncidentPriority";
import { IncidentStatus } from "@/app/utils/IncidentStatus";

export const currentIncident = {
  id: "ID1238957",
  title: "Violation de sécurité",
  status: IncidentStatus.PRIS_EN_CHARGE,
  service: "Sécurité Informatique",
  assignedTo: "Ghita Boukri",
  assignedDepartment: "OpenR",
  createdAt: "2025-04-01T09:00:00Z",
  priority: IncidentPriority.MOYENNE,
  impact: IncidentGravity.MAJEUR,
  sla: "4 Heures",
  reportedBy: {
    name: "Hassan Khaili",
    email: "hassan.khaili@example.com",
  },
  description: `Un accès non autorisé a été détecté dans le système de sécurité informatique.
Cette violation pourrait potentiellement exposer des données sensibles et perturber les opérations critiques.
Il est crucial de tracer l'origine de la tentative et de sécuriser les systèmes affectés.`,
  customerName: "XYZ Corp",
  lastUpdatedBy: "Admin",
  lastUpdatedAt: "2025-04-02 10:30",
};
