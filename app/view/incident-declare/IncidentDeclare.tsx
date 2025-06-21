import React from 'react';
import { IncidentDetail } from '@/app/models/IncidentDetail';
import { IncidentGravity } from '@/app/utils/IncidentGravity';
import { IncidentPriority } from '@/app/utils/IncidentPriority';
import { IncidentStatus } from '@/app/utils/IncidentStatus';
import IncidentCard from './incident-card';

// ✅ Tableau de données fictives (liste, pas un seul objet)
const mockIncidents: IncidentDetail[] = [
  {
    id: BigInt('12345678901234567890'),
    titre: 'Problème de connexion au serveur principal',
    description: 'Les utilisateurs signalent une déconnexion intermittente depuis 13h00.',
    statutIncident: IncidentStatus.AFFECTE,
    gravite: IncidentGravity.MAJEUR,
    priorite: IncidentPriority.ELEVEE,
    dateAttribution: '2025-06-03T14:00:00Z',
    dateResolution: '',
    dateDeclaration: '2025-06-03T13:30:00Z',
    clientSub: 'SUB-XYZ-123',
    client_fullName: 'Pierre Martin',
    client_igg: 'IGG-789-456',
    coeDevSub: 'DEV-SUB-987',
    environnement: 'Production',
    application: 'AppCore',
    coeDev_firstName: 'Sophie',
    client_serviceName: 'Service Clientèle',
    coeDev_serviceName: 'Équipe DevOps',
    client_firstName: 'Pierre',
    client_role: 'Administrateur',
    client_lastName: 'Martin',
    client_mail: 'pierre.martin@example.com',
    coeDev_lastName: 'Dupont',
    coeDev_igg: 'IGG-321-654',
    coeDev_role: 'Développeur Senior',
    coeDev_fullName: 'Sophie Dupont',
    coeDev_mail: 'sophie.dupont@example.com',
    tags: ['serveur', 'connexion', 'urgent'],
    fichierJoints: ['log_server_03062025.txt', 'screenshot_issue.png'],
  },
  // Tu peux ajouter d'autres incidents ici
];

const IncidentListDisplay: React.FC = () => {
  const statusTabs = [
    { key: 'soumis', label: 'Soumis', count: 5 },
    { key: 'pris_en_charge', label: 'Pris en charge', count: 12 },
    { key: 'resolu', label: 'Résolu', count: 3 },
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">List of tasks</h2>

      <div className="mb-6">
        <ul className="flex space-x-4 border-b pb-2">
          {statusTabs.map((tab) => (
            <li key={tab.key}>
              <button className="text-gray-600 hover:text-blue-600 font-medium">
                {tab.label} ({tab.count})
              </button>
            </li>
          ))}
        </ul>
      </div>

      {mockIncidents.length === 0 ? (
        <p className="text-gray-500">Aucun incident à afficher.</p>
      ) : (
        mockIncidents.map((incident) => (
          <IncidentCard key={incident.id.toString()} incident={incident} />
        ))
      )}
    </div>
  );
};

export default IncidentListDisplay;
