import { IncidentDetail } from "@/app/models/IncidentDetail";
import { IncidentGravity } from "@/app/utils/IncidentGravity";
import { IncidentPriority } from "@/app/utils/IncidentPriority";
import { IncidentStatus } from "@/app/utils/IncidentStatus";

export const currentIncident: IncidentDetail = {
  id: BigInt(1238957),
  titre: "Violation de sécurité",
  description: `
    Un accès non autorisé a été détecté dans le système de sécurité informatique. Cette violation pourrait potentiellement exposer des données sensibles et perturber les opérations critiques. Une enquête immédiate et des actions de mitigation sont nécessaires pour prévenir une escalade.
    L'intrus pourrait avoir accédé au système via un mot de passe compromis. Il est crucial de tracer l'origine de la tentative et de sécuriser les systèmes affectés. Une vérification complète des systèmes concernés doit être effectuée pour évaluer les dommages potentiels.
  `,
  statutIncident: IncidentStatus.PRIS_EN_CHARGE,
  gravite: IncidentGravity.CRITIQUE,
  priorite: IncidentPriority.ELEVEE,
  dateAttribution: "2025-04-01T09:00:00Z",
  dateResolution: "", // À remplir lorsqu'une date est disponible
  dateDeclaration: "2025-04-01T09:00:00Z",
  clientSub: "xyzcorp_sub_001",
  client_fullName: "El Mehdi BOUHLAOUI",
  client_igg: "xyzcorp_igg_001",
  client_firstName: "El Mehdi",
  client_lastName: "BOUHLAOUI",
  client_mail: "mehdiBouhalaoui@socgen.com",
  client_role: "Client",
  client_serviceName: "Sécurité Informatique",
  coeDevSub: "openr_sub_001",
  coeDev_firstName: "Ghita",
  coeDev_lastName: "Boukri",
  coeDev_fullName: "Ghita Boukri",
  coeDev_mail: "ghita.boukri@openr.com",
  coeDev_igg: "openr_igg_001",
  coeDev_role: "Développeuse Sécurité",
  coeDev_serviceName: "OpenR",
  environnement: "DEV",
  application: "Open R",
  tags: ["Sécurité", "Urgent", "Confidentiel"],
  base64Images: [] // ou avec des images encodées en base64 si disponible
};