'use client';

import React from 'react';
import { X, Info, CheckCircle, AlertCircle, CalendarDays, User, Tag, Clock, Copy, Check } from 'lucide-react';

interface Incident {
    id: string;
    title: string;
    createdAt: string;
    updatedAt?: string;
    resolvedAt?: string;
    status: string;
    priority: string;
    description?: string;
    assignedTo?: string;
    assignedToName?: string;
    createdBy?: string;
    category?: string;
    similarIncidents?: Pick<Incident, 'id', 'title', 'priority', 'status'>[];
    transferredAt?: string; // Ajoutez transferredAt à votre interface si nécessaire
}

interface Props {
    incident: Incident;
    onClose: () => void;
}

const PriorityBadge = ({ priority }: { priority: string }) => {
    let style = '';
    let label = '';
    switch (priority?.toUpperCase()) {
        case 'CRITIQUE':
            style = 'bg-red-100 text-red-700';
            label = 'Critique';
            break;
        case 'HAUTE':
            style = 'bg-orange-100 text-orange-700';
            label = 'Haute';
            break;
        case 'MOYENNE':
            style = 'bg-yellow-100 text-yellow-700';
            label = 'Moyenne';
            break;
        case 'BASSE':
            style = 'bg-green-100 text-green-700';
            label = 'Basse';
            break;
        default:
            style = 'bg-gray-100 text-gray-700';
            label = 'Inconnue';
            break;
    }
    return <span className={`inline-block px-2 py-0.5 rounded-full font-medium text-xs ${style}`}>{label}</span>;
};

const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
        case 'RESOLVED':
            return (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700 border border-green-300">
                    <CheckCircle className="w-4 h-4" /> Résolu
                </div>
            );
        case 'TRANSFERRED':
            return (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700 border border-blue-300">
                    <AlertCircle className="w-4 h-4" /> Transféré
                </div>
            );
        default:
            return (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-700 border border-gray-300">
                    <AlertCircle className="w-4 h-4" /> Inconnu
                </div>
            );
    }
};

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string | React.ReactNode }) => (
    <p className="flex items-center gap-2 text-sm text-gray-700">
        {icon}
        <span className="font-semibold">{label} :</span> {value}
    </p>
);

const SimilarIncidentItem = ({ id, title, priority, status }: Pick<Incident, 'id', 'title', 'priority', 'status'>) => (
    <div className="flex items-center gap-3 py-2 border-b border-gray-200 last:border-b-0">
        <Copy className="w-4 h-4 text-gray-400" />
        <div className="flex-grow">
            <p className="text-sm font-medium text-gray-800">{title}</p>
            <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="font-semibold">ID:</span> {id}
                <PriorityBadge priority={priority} />
                <StatusBadge status={status} />
            </div>
        </div>
        {/* Vous pourriez ajouter un bouton ici pour afficher les détails de cet incident similaire */}
    </div>
);

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
            details: incident.assignedToName ? `Assigné à ${incident.assignedToName}` : incident.assignedTo ? `Assigné à (ID) ${incident.assignedTo}` : 'Non assigné',
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
            details: incident.resolvedAt ? `Résolu le ${new Date(incident.resolvedAt).toLocaleDateString()} à ${new Date(incident.resolvedAt).toLocaleTimeString()}` : 'Non résolu.',
        },
        {
            label: 'Transféré',
            status: incident.status === 'TRANSFERRED',
            details: incident.transferredAt ? `Transféré le ${new Date(incident.transferredAt).toLocaleDateString()} à ${new Date(incident.transferredAt).toLocaleTimeString()}` : 'Non transféré.',
        },
    ];
};

const HistoriquePopup = ({ incident, onClose }: Props) => {
    const steps = getSteps(incident);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl relative animate-fade-in-up p-6 md:p-8">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
                    onClick={onClose}
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
                    <Info className="text-blue-500 w-5 h-5" />
                    Détails de l’incident
                </h2>

                <div className="mb-4">
                    <StatusBadge status={incident.status} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <InfoItem icon={<span className="font-bold text-gray-800">#</span>} label="ID" value={incident.id} />
                    <InfoItem icon={<Tag className="w-4 h-4 text-blue-400" />} label="Titre" value={incident.title} />
                    <InfoItem icon={<CalendarDays className="w-4 h-4 text-blue-400" />} label="Créé le" value={incident.createdAt} />
                    {incident.updatedAt && (
                        <InfoItem icon={<Clock className="w-4 h-4 text-yellow-500" />} label="Mis à jour le" value={incident.updatedAt} />
                    )}
                    {incident.resolvedAt && (
                        <InfoItem icon={<CheckCircle className="w-4 h-4 text-green-500" />} label="Résolu le" value={incident.resolvedAt} />
                    )}
                    <InfoItem icon={<span className="w-4 h-4 text-orange-500">P</span>} label="Priorité" value={<PriorityBadge priority={incident.priority} />} />
                    {incident.assignedToName ? (
                        <InfoItem icon={<User className="w-4 h-4 text-gray-400" />} label="Assigné à" value={incident.assignedToName} />
                    ) : incident.assignedTo ? (
                        <InfoItem icon={<User className="w-4 h-4 text-gray-400" />} label="Assigné à (ID)" value={incident.assignedTo} />
                    ) : null}
                    {incident.createdBy && (
                        <InfoItem icon={<User className="w-4 h-4 text-purple-500" />} label="Créé par" value={incident.createdBy} />
                    )}
                    {incident.category && (
                        <InfoItem icon={<Tag className="w-4 h-4 text-indigo-500" />} label="Catégorie" value={incident.category} />
                    )}
                </div>

                {incident.description && (
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                        <p className="text-sm text-gray-600 whitespace-pre-line rounded-md border border-gray-200 p-3">{incident.description}</p>
                    </div>
                )}

                <div className="mb-6">
                    <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-gray-600" /> Historique de l'incident
                    </h3>
                    <ol className="relative border-l-2 border-gray-200 ml-4 pl-6 space-y-6">
                        {steps.map((step, index) => (
                            <li key={index} className="relative">
                                <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
                                    {step.status && <Check className="w-4 h-4 text-green-500" />}
                                </div>
                                <div className="ml-4">
                                    <p className={`text-sm font-medium ${step.status ? 'text-gray-800' : 'text-gray-400'}`}>
                                        {step.label}
                                    </p>
                                    {step.details && <p className="text-xs text-gray-500">{step.details}</p>}
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>

                {incident.similarIncidents && incident.similarIncidents.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                            <Copy className="w-5 h-5 text-gray-600" /> Incidents similaires
                        </h3>
                        <div>
                            {incident.similarIncidents.map((similarIncident) => (
                                <SimilarIncidentItem key={similarIncident.id} {...similarIncident} />
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-6 text-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold text-sm"
                        onClick={onClose}
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HistoriquePopup;