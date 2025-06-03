import { IncidentDetail } from "@/app/models/IncidentDetail";
import { IncidentStatus } from "@/app/utils/IncidentStatus";
import { IncidentGravity } from "@/app/utils/IncidentGravity";
import { IncidentPriority } from "@/app/utils/IncidentPriority";
import TimelineHeader from './timelineHeader';

// Définir l'interface pour IncidentCard basée sur IncidentDetail
interface IncidentCardProps {
  id: bigint;
  titre: string;
  statutIncident: IncidentStatus; // Utiliser l'enum au lieu de string
  gravite: IncidentGravity; // Utiliser l'enum au lieu de string
  priorite: IncidentPriority; // Utiliser l'enum au lieu de string
  dateDeclaration: string;
  dateResolution: string | null; // Permet null car certains incidents peuvent ne pas être résolus
  client_fullName: string;
  overdue?: boolean;
  base64Images?: string[]; // Ajouter pour gérer les images si nécessaire
}

export default function Page() {
  // Données d'exemple typées avec IncidentDetail
  const sampleIncidents: IncidentDetail[] = [
    {
      id: BigInt(1),
      titre: "Server Outage - Data Center A",
      description: "Serveur principal hors service dans le centre de données A",
      statutIncident: IncidentStatus.PRIS_EN_CHARGE,
      gravite: IncidentGravity.MAJEUR,
      priorite: IncidentPriority.ELEVEE,
      dateAttribution: "May 4, 2023",
      dateDeclaration: "May 4, 2023",
      dateResolution: "May 5, 2023",
      clientSub: "SUB123",
      client_fullName: "Ryan Howard",
      client_igg: "IGG001",
      coeDevSub: "DEV456",
      environnement: "Production",
      application: "DataCenterApp",
      coeDev_firstName: "John",
      client_serviceName: "IT Support",
      coeDev_serviceName: "DevOps",
      client_firstName: "Ryan",
      client_role: "Admin",
      client_lastName: "Howard",
      client_mail: "ryan.howard@example.com",
      coeDev_lastName: "Doe",
      coeDev_igg: "IGG002",
      coeDev_role: "Developer",
      coeDev_fullName: "John Doe",
      coeDev_mail: "john.doe@example.com",
      base64Images: ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAECwI4YgAAAABJRU5ErkJggg=="],
    },
    {
      id: BigInt(2),
      titre: "Security Breach - App X",
      description: "Tentative d'intrusion détectée dans l'application X",
      statutIncident: IncidentStatus.RESOLU,
      gravite: IncidentGravity.MINEUR,
      priorite: IncidentPriority.ELEVEE,
      dateAttribution: "May 4, 2023",
      dateDeclaration: "May 4, 2023",
      dateResolution:"May 6, 2023",
      clientSub: "SUB789",
      client_fullName: "Nijum Chy",
      client_igg: "IGG003",
      coeDevSub: "DEV101",
      environnement: "Test",
      application: "AppX",
      coeDev_firstName: "Jane",
      client_serviceName: "Security",
      coeDev_serviceName: "DevSecOps",
      client_firstName: "Nijum",
      client_role: "User",
      client_lastName: "Chy",
      client_mail: "nijum.chy@example.com",
      coeDev_lastName: "Smith",
      coeDev_igg: "IGG004",
      coeDev_role: "Security Engineer",
      coeDev_fullName: "Jane Smith",
      coeDev_mail: "jane.smith@example.com",
      base64Images: [],
    },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      {/* Passez sampleIncidents comme prop incidents à TimelineHeader */}
      <TimelineHeader incidents={sampleIncidents} />

      <div className="space-y-4">
        {sampleIncidents.map(incident => (
          <IncidentCard
            key={incident.id.toString()} // Convertir BigInt en string pour la clé React
            id={incident.id}
            titre={incident.titre}
            statutIncident={incident.statutIncident}
            gravite={incident.gravite}
            priorite={incident.priorite}
            dateDeclaration={incident.dateDeclaration}
            dateResolution={incident.dateResolution}
            client_fullName={incident.client_fullName}
            base64Images={incident.base64Images}
          />
        ))}
      </div>
    </main>
  );
}

export function IncidentCard({
  id,
  titre,
  statutIncident,
  gravite,
  priorite,
  dateDeclaration,
  dateResolution,
  client_fullName,
  overdue,
  base64Images,
}: IncidentCardProps) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex justify-between">
        <div
          className={`p-2 w-24 text-center rounded ${
            overdue ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
          }`}
        >
          <p className="text-sm">{statutIncident}</p>
          <p className="text-xs">Priority: {priorite}</p>
          <p className="text-xs">{overdue ? 'Overdue' : `Declared: ${dateDeclaration}`}</p>
        </div>

        <div className="flex-1 px-4">
          <h2 className="text-lg font-semibold">{titre}</h2>
          <p className="text-sm text-gray-500">Client: <strong>{client_fullName}</strong></p>
          <div className="flex space-x-2 mt-2">
            <div className="flex-1 bg-purple-200 text-purple-800 text-sm px-2 py-1 rounded">
              Gravity: {gravite}
            </div>
            <div className="flex-1 bg-yellow-200 text-yellow-800 text-sm px-2 py-1 rounded">
              Resolution: {dateResolution || 'Pending'}
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            <p>Incident ID: {id.toString()}</p>
            <p>Declared: {dateDeclaration}</p>
          </div>
          {/* Affichage des images base64 si elles existent */}
          {base64Images && base64Images.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Images:</p>
              <div className="flex space-x-2">
                {base64Images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Incident image ${index + 1}`}
                    className="w-16 h-16 object-cover rounded"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}