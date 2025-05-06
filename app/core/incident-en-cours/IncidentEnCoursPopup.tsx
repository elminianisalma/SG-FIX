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

const getStatusLabel = (status: string) => {
    const base = 'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-sm font-semibold border';
    switch (status) {
        case 'DECLARED':
            return <div className={`${base} bg-yellow-100 text-yellow-700 border-yellow-300`}>📝 Déclaré</div>;
        case 'ASSIGNED':
            return <div className={`${base} bg-purple-100 text-purple-700 border-purple-300`}>👤 Affecté</div>;
        case 'IN_ANALYSIS':
            return <div className={`${base} bg-orange-100 text-orange-700 border-orange-300`}>🔍 Analyse</div>;
        case 'TRANSFERRED':
            return <div className={`${base} bg-blue-100 text-blue-700 border-blue-300`}>📤 Transféré</div>;
        case 'RESOLVED':
            return <div className={`${base} bg-green-100 text-green-700 border-green-300`}>✅ Résolu</div>;
        default:
            return <div className={`${base} bg-gray-100 text-gray-700 border-gray-300`}>❓ Inconnu</div>;
    }
};

const getSteps = (incident: Incident) => [
    {
        label: 'Création',
        status: true,
        details: `Le ${new Date(incident.createdAt).toLocaleDateString()} à ${new Date(incident.createdAt).toLocaleTimeString()}`,
    },
    {
        label: 'Affecté',
        status: !!incident.assignedTo,
        details: incident.assignedTo ? `Assigné à ${incident.assignedTo}` : 'Non assigné',
    },
    {
        label: 'En traitement',
        status: ['IN_PROGRESS', 'RESOLVED', 'TRANSFERRED'].includes(incident.status),
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
        details: incident.resolvedAt
            ? `Résolu le ${incident.resolvedAt}`
            : 'Non résolu.',
    },
    {
        label: 'Transféré',
        status: incident.status === 'TRANSFERRED',
        details: incident.transferredAt
            ? `Transféré le ${incident.transferredAt}`
            : 'Non transféré.',
    },
];

const IncidentEnCoursPopup = ({ incident, onClose }: Props) => {
    const steps = getSteps(incident);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto relative p-4">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                    onClick={onClose}
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-base font-bold text-gray-800 flex items-center gap-2 mb-2">
                    <Info className="text-blue-500 w-5 h-5" />
                    Détails de l’incident
                </h2>

                <div className="mb-3">{getStatusLabel(incident.status)}</div>

                <div className="mb-2">
                    <h3 className="text-sm font-semibold text-gray-700">{incident.title}</h3>
                    <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded font-semibold ${getPriorityStyle(incident.priority)}`}>
                        Priorité : {incident.priority}
                    </span>
                </div>

                <p className="text-sm text-gray-600 mb-4 whitespace-pre-line">{incident.description}</p>

                <div className="mb-3">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Historique</h3>
                    <ol className="relative border-l-2 border-gray-200 ml-4 pl-5 space-y-2">
                        {steps.map((step, index) => (
                            <li key={index} className="relative">
                                <div className="absolute -left-3 top-0.5 w-4 h-4 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
                                    {step.status && <Check className="w-3.5 h-3.5 text-green-500" />}
                                </div>
                                <div className="ml-2">
                                    <p className={`text-sm font-medium ${step.status ? 'text-gray-800' : 'text-gray-400'}`}>{step.label}</p>
                                    <p className="text-xs text-gray-500">{step.details}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="text-center mt-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-lg font-semibold"
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
