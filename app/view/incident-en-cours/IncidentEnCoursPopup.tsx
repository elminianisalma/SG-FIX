'use client';

import React, { useState } from 'react';
import {
  X,
  Info,
  Check,
  Clock,
  User,
  Loader2,
  ArrowRight,
  AlertTriangle,
  Cloud,
  UserCheck,
  Network,
  Calendar,
  Tag,
  ThumbsUp,
  MessageSquare,
} from 'lucide-react';
import { getStatusStyle, IncidentStatus } from '@/app/utils/IncidentStatus';
import { getPriorityStyle, IncidentPriority } from '@/app/utils/IncidentPriority';

import AttachmentsSection from './AttachementSection';
import { IncidentDetail } from '@/app/models/IncidentDetail';

interface Props {
  incident: IncidentDetail;
  onClose: () => void;
}

const AvatarInitials = ({ name }: { name: string }) => {
  const initials = name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');

  const colors = [
    'bg-blue-500 text-white',
    'bg-green-500 text-white',
    'bg-purple-600 text-white',
    'bg-yellow-400 text-black',
    'bg-red-500 text-white',
    'bg-indigo-500 text-white',
  ];
  const colorClass = colors[name.charCodeAt(0) % colors.length];

  return (
    <div
      className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-base font-semibold ${colorClass}`}
      title={name}
      aria-label={`Avatar de ${name}`}
    >
      {initials}
    </div>
  );
};

const getSteps = (incident: IncidentDetail) => [
  {
    label: 'Création',
    status: true,
    icon: <Clock className="w-6 h-6 text-blue-600" />,
    color: 'text-blue-600',
    details: `Le ${new Date(incident.dateDeclaration)} à ${new Date(
      incident.dateDeclaration
    ).toLocaleTimeString()}`,
  },
  {
    label: 'Affecté',
    status: !!incident.client_fullName,
    icon: <User className="w-6 h-6 text-orange-500" />,
    color: 'text-orange-500',
    details: incident.client_fullName? `Assigné à ${incident.client_firstName}` : 'Non assigné',
  },
  {
    label: 'En traitement',
    status: [
      IncidentStatus.PRIS_EN_CHARGE,
      IncidentStatus.RESOLU,
      IncidentStatus.TRANSFERE,
    ].includes(incident.statutIncident),
    icon: <Loader2 className="w-6 h-6 text-yellow-500 animate-spin" />,
    color: 'text-yellow-500',
    details:
      incident.statutIncident === IncidentStatus.PRIS_EN_CHARGE
        ? "L'incident est en cours d'analyse."
        : incident.statutIncident === IncidentStatus.RESOLU
        ? "L'incident a été traité et est en cours de clôture."
        : incident.statutIncident === IncidentStatus.TRANSFERE
        ? "L'incident a été transmis à une autre équipe."
        : 'En attente de traitement.',
  },
  
];

const IncidentEnCoursPopup = ({ incident, onClose }: Props) => {
  const steps = getSteps(incident);
  const [activeTab, setActiveTab] = useState('comments');

  return (
    <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 p-4 z-50">
     <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden p-6 relative">
    {/* HEADER */}
    <div className="flex justify-between items-start mb-4">
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-3 break-words">
        <Info className="text-blue-600 w-7 h-7" />
        Détails de l’incident
      </h2>
      <button
        className="text-gray-400 hover:text-gray-600 transition-colors"
        onClick={onClose}
        aria-label="Fermer la fenêtre"
      >
        <X className="w-7 h-7" />
      </button>
    </div>

    {/* TITRE INCIDENT */}
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-gray-800 flex flex-wrap items-center gap-3 break-words">
        <span className="break-words max-w-full">{incident.titre}</span>
        {incident.priorite && (
          <span
            className={`inline-flex items-end px-3 py-1 rounded-full text-base font-medium ${getPriorityStyle(
              incident.priorite
            )}`}
          >
            {incident.priorite}
          </span>
        )}
      </h3>
    </div>


        <div className="grid grid-cols-2 gap-4 text-base text-gray-700 mb-6">
          <div className="flex items-center gap-2">
            <Info className="w-6 h-6 text-blue-600" />
            <strong className="font-semibold">Status :</strong>{' '}
            <span className={`${getStatusStyle(incident.statutIncident)} font-semibold rounded-full px-3`}>
              {incident.statutIncident}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <strong className="font-semibold">Gravité :</strong> {incident.gravite || 'Non spécifiée'}
          </div>
          <div className="flex items-center gap-2">
            <Cloud className="w-6 h-6 text-cyan-600" />
            <strong className="font-semibold">Environnement :</strong> {incident.environnement|| 'Non précisé'}
          </div>
          <div className="flex items-center gap-2">
            <Network className="w-6 h-6 text-green-600" />
            <strong className="font-semibold">Service impacté :</strong> {incident.application}
          </div>
          <div className="flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-purple-600" />
            <strong className="font-semibold">Déclaré par :</strong>{' '}
            {incident.clientSub ? <AvatarInitials name={incident.client_fullName} /> : 'Inconnu'}
            <span>{incident.client_fullName}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-6 h-6 text-orange-500" />
            <strong className="font-semibold">Assigné à :</strong>{' '}
            {incident.coeDev_fullName ? <AvatarInitials name={incident.coeDev_firstName} /> : 'Non assigné'}
            <span>{incident.coeDev_fullName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            <strong className="font-semibold">Date de déclaration :</strong>{' '}
            {new Date(incident.dateDeclaration).toLocaleString()}
          </div>
          {incident.dateResolution && (
            <div className="flex items-center gap-2">
              <Check className="w-6 h-6 text-green-600" />
              <strong className="font-semibold">Date de résolution :</strong>{' '}
              {new Date(incident.dateResolution).toLocaleString()}
            </div>
          )}
        </div>

       

        {incident.description && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-6 h-6 text-blue-600" />
              <strong className="text-base font-semibold text-gray-800">Description :</strong>
            </div>
            <p className="text-lg text-gray-600 p-4 rounded-lg bg-gray-50">{incident.description}</p>
          </div>
        )}

        <div className="mb-6">
          <div className="flex border-b border-gray-200">
               <button
              className={`px-4 py-2 text-base font-medium ${
                activeTab === 'historique'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('historique')}
            >
              Activités
            </button>
          
          </div>

         
        </div>

        <div className="text-center mt-6">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white text-base px-6 py-2 rounded-lg font-semibold transition-colors"
            onClick={onClose}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncidentEnCoursPopup;