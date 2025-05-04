'use client';

import React from 'react';
import { X, Info, Check } from 'lucide-react';

interface Incident {
    id: string;
    title: string;
    createdAt: string;
    assignedTo: string;
    priority: string;
    description: string;
    status: string;
    resolvedAt?: string;
    transferredAt?: string;
}

interface Props {
    incident: Incident;
    onClose: () => void;
}

const getPriorityStyle = (priority: string) => {
    switch (priority?.toUpperCase()) {
        case 'CRITIQUE':
            return 'bg-red-100 text-red-700 border border-red-300';
        case 'HAUTE':
            return 'bg-orange-100 text-orange-700 border border-orange-300';
        case 'MOYENNE':
            return 'bg-yellow-100 text-yellow-700 border border-yellow-300';
        case 'BASSE':
            return 'bg-green-100 text-green-700 border border-green-300';
        default:
            return 'bg-gray-200 text-gray-700 border border-gray-300';
    }
};

const getSteps = (incident: Incident) => {
    return [
        {
            label: 'Création',
            status: true,
            details: `Le ${new Date(incident.createdAt).toLocaleDateString()} à ${new Date(
                incident.createdAt
            ).toLocaleTimeString()}`,
        },
        {
            label: 'Affecté',
            status: !!incident.assignedTo,
            details: incident.assignedTo ? `Assigné à ${incident.assignedTo}` : 'Non assigné',
        },
        {
            label: 'En traitement',
            status:
                incident.status === 'IN_PROGRESS' ||
                incident.status === 'RESOLVED' ||
                incident.status === 'TRANSFERRED',
            details:
                incident.status === 'IN_PROGRESS'
                    ? "L'incident est en cours d'analyse."
                    : incident.status === 'RESOLVED'
                        ? "L'incident a été traité et est en cours de clôture."
                        : incident.status === 'TRANSFERRED'
                            ? "L'incident a été transmis à une autre équipe."
                            : 'En attente de traitement.',
        },
        {
            label: 'Résolu',
            status: incident.status === 'RESOLVED',
            details: incident.status === 'RESOLVED'
                ? `Résolu le ${incident.resolvedAt || 'non spécifié'}`
                : 'Non résolu.',
        },
        {
            label: 'Transféré',
            status: incident.status === 'TRANSFERRED',
            details: incident.status === 'TRANSFERRED'
                ? `Transféré le ${incident.transferredAt || 'non spécifié'}`
                : 'Non transféré.',
        },
    ];
};

const IncidentEnCoursPopup = ({ incident, onClose }: Props) => {
    const steps = getSteps(incident);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md md:max-w-lg lg:max-w-xl relative animate-fade-in-up">
                {/* Fermer */}
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                    onClick={onClose}
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-6">
                    {/* Titre & priorité */}
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
                        <Info className="text-blue-500 w-5 h-5" />
                        Détails de l’incident
                    </h2>

                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-700">{incident.title}</h3>
                        <span
                            className={`inline-block mt-1 px-2 py-0.5 text-xs rounded font-semibold ${getPriorityStyle(
                                incident.priority
                            )}`}
                        >
                            Priorité : {incident.priority}
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                        {incident.description}
                    </p>

                    {/* Historique de l'incident (Timeline) */}
                    <div className="mt-4">
                        <h3 className="text-base font-semibold text-gray-800 mb-3">Historique de l'incident</h3>
                        <ol className="relative border-l-2 border-gray-200 ml-4 pl-6 space-y-6">
                            {steps.map((step, index) => (
                                <li key={index} className="relative">
                                    <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
                                        {step.status && <Check className="w-4 h-4 text-green-500" />}
                                    </div>
                                    <div className="ml-4"> {/* Ajout de ml-4 pour l'espacement */}
                                        <p className={`text-sm font-medium ${step.status ? 'text-gray-800' : 'text-gray-400'}`}>
                                            {step.label}
                                        </p>
                                        {step.details && <p className="text-xs text-gray-500">{step.details}</p>}
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IncidentEnCoursPopup;