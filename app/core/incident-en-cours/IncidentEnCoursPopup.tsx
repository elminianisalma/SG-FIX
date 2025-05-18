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
import { Incident } from '@/app/utils/Incidents';
import AttachmentsSection from './AttachementSection';

interface Props {
  incident: Incident;
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

const getSteps = (incident: Incident) => [
  {
    label: 'Création',
    status: true,
    icon: <Clock className="w-6 h-6 text-blue-600" />,
    color: 'text-blue-600',
    details: `Le ${new Date(incident.declarationDate).toLocaleDateString()} à ${new Date(
      incident.declarationDate
    ).toLocaleTimeString()}`,
  },
  {
    label: 'Affecté',
    status: !!incident.assignedTo,
    icon: <User className="w-6 h-6 text-orange-500" />,
    color: 'text-orange-500',
    details: incident.assignedTo ? `Assigné à ${incident.assignedTo}` : 'Non assigné',
  },
  {
    label: 'En traitement',
    status: [
      IncidentStatus.EN_COURS_ANALYSE,
      IncidentStatus.RESOLU,
      IncidentStatus.TRANSFERE,
    ].includes(incident.status),
    icon: <Loader2 className="w-6 h-6 text-yellow-500 animate-spin" />,
    color: 'text-yellow-500',
    details:
      incident.status === IncidentStatus.EN_COURS_ANALYSE
        ? "L'incident est en cours d'analyse."
        : incident.status === IncidentStatus.RESOLU
        ? "L'incident a été traité et est en cours de clôture."
        : incident.status === IncidentStatus.TRANSFERE
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
        <span className="break-words max-w-full">{incident.title}</span>
        {incident.priorité && (
          <span
            className={`inline-flex items-end px-3 py-1 rounded-full text-base font-medium ${getPriorityStyle(
              incident.priorité
            )}`}
          >
            {incident.priorité}
          </span>
        )}
      </h3>
    </div>


        <div className="grid grid-cols-2 gap-4 text-base text-gray-700 mb-6">
          <div className="flex items-center gap-2">
            <Info className="w-6 h-6 text-blue-600" />
            <strong className="font-semibold">Status :</strong>{' '}
            <span className={`${getStatusStyle(incident.status)} font-semibold rounded-full px-3`}>
              {incident.status}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <strong className="font-semibold">Urgence :</strong> {incident.urgency || 'Non spécifiée'}
          </div>
          <div className="flex items-center gap-2">
            <Cloud className="w-6 h-6 text-cyan-600" />
            <strong className="font-semibold">Environnement :</strong> {incident.environment || 'Non précisé'}
          </div>
          <div className="flex items-center gap-2">
            <Network className="w-6 h-6 text-green-600" />
            <strong className="font-semibold">Service impacté :</strong> {incident.affectedService}
          </div>
          <div className="flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-purple-600" />
            <strong className="font-semibold">Déclaré par :</strong>{' '}
            {incident.declaredBy ? <AvatarInitials name={incident.declaredBy} /> : 'Inconnu'}
            <span>{incident.declaredBy}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-6 h-6 text-orange-500" />
            <strong className="font-semibold">Assigné à :</strong>{' '}
            {incident.assignedTo ? <AvatarInitials name={incident.assignedTo} /> : 'Non assigné'}
            <span>{incident.assignedTo}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            <strong className="font-semibold">Date de déclaration :</strong>{' '}
            {new Date(incident.declarationDate).toLocaleString()}
          </div>
          {incident.resolutionDate && (
            <div className="flex items-center gap-2">
              <Check className="w-6 h-6 text-green-600" />
              <strong className="font-semibold">Date de résolution :</strong>{' '}
              {new Date(incident.resolutionDate).toLocaleString()}
            </div>
          )}
        </div>

        {incident.tags && incident.tags.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-6 h-6 text-pink-600" />
              <strong className="text-base font-semibold text-gray-800 mr-2">Tags :</strong>
              {incident.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-3 py-1 rounded-full text-base font-medium bg-gray-200 text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

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
            {incident.comments && (
              <button
                className={`px-4 py-2 text-base font-medium ${
                  activeTab === 'comments'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('comments')}
              >
                Commentaires
                <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-600 rounded-full">
                  3
                </span>
              </button>
            )}
            {incident.documentation && (
              <button
                className={`px-4 py-2 text-base font-medium ${
                  activeTab === 'documentation'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('documentation')}
              >
                Attachements
              </button>
            )}
         
          </div>

          <div className="p-4 bg-gray-50 rounded-lg mt-4">
            {activeTab === 'comments' && incident.comments && (
              <div>
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {incident.comments.map((comment, idx) => (
                    <div key={idx} className="p-3">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-500 text-white font-bold text-sm">
                            {comment.author
                              .split(' ')
                              .map(word => word[0]?.toUpperCase())
                              .slice(0, 2)
                              .join('')}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold text-gray-800">{comment.author}</span>
                            <span className="text-xs text-gray-500">
                              {comment.date ? new Date(comment.date).toLocaleString() : ''}
                            </span>
                          </div>
                          <p className="text-gray-700">{comment.message}</p>
                          <div className="flex gap-2 mt-2">
                            <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600 text-sm">
                              <ThumbsUp className="w-4 h-4" />
                              Like
                            </button>
                            <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600 text-sm">
                              <MessageSquare className="w-4 h-4" />
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Section pour ajouter un commentaire */}
                <div className="border-t pt-4 mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Ajouter un commentaire</h3>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <AvatarInitials name="Meriem Oulja" />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <textarea
                        rows={3}
                        className="w-full p-3 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Écrivez un commentaire..."
                      />
                      <div className="flex justify-end">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                          Envoyer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'documentation' && incident.documentation && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-6 h-6 text-blue-600" />
                  <strong className="text-base font-semibold text-gray-800">Documentation :</strong>
                </div>
                <p className="text-lg text-gray-600">{incident.documentation}</p>
              </div>
            )}

            {activeTab === 'historique' && (
              <div>
                <h3 className="text-base font-semibold text-gray-800 mb-3">Historique</h3>
                <ol className="relative border-l-2 border-gray-200 ml-4 pl-4 space-y-4">
                  {steps.map((step, index) => (
                    <li key={index} className="relative flex gap-3 items-start">
                      <div>{step.icon}</div>
                      <div>
                        <p className={`text-base font-semibold ${step.status ? step.color : 'text-gray-400'}`}>
                          {step.label}
                        </p>
                        <p className="text-sm text-gray-500 max-w-lg">{step.details}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}
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