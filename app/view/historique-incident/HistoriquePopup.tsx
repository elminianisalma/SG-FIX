'use client';

import React from 'react';
import {
    X, Info, CheckCircle, AlertCircle, CalendarDays, User, Tag, Clock, Copy, Check
} from 'lucide-react';
import { IncidentDetail } from '@/app/models/IncidentDetail';
import { IncidentStatus } from '@/app/utils/IncidentStatus';

interface Props {
    incident: IncidentDetail;
    onClose: () => void;
}

const StatusBadge = ({ status }: { status: string }) => {
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

const PriorityBadge = ({ priority }: { priority: string }) => {
    const map = {
        CRITIQUE: ['bg-red-100 text-red-700', 'Critique'],
        HAUTE: ['bg-orange-100 text-orange-700', 'Haute'],
        MOYENNE: ['bg-yellow-100 text-yellow-700', 'Moyenne'],
        BASSE: ['bg-green-100 text-green-700', 'Basse']
    };
    const [style, label] = map[priority?.toUpperCase() as keyof typeof map] || ['bg-gray-100 text-gray-700', 'Inconnue'];
    return <span className={`inline-block px-2 py-0.5 rounded-full font-medium text-sm ${style}`}>{label}</span>;
};

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string | React.ReactNode }) => (
    <p className="flex items-center gap-1 text-sm text-gray-700">
        {icon}
        <span className="font-semibold">{label} :</span> <span className="text-gray-600">{value}</span>
    </p>
);

const SimilarIncidentItem = ({ id, titre, priorite, statutIncident }: any) => (
    <div className="flex items-center gap-2 py-1.5 border-b border-gray-200 last:border-b-0">
        <Copy className="w-4 h-4 text-gray-400" />
        <div className="flex-grow">
            <p className="text-sm font-medium text-gray-800 line-clamp-1">{titre}</p>
            <div className="flex items-center gap-1 text-xs text-gray-600">
                <span className="font-semibold">ID:</span> <span className="text-gray-500">{id}</span>
                <PriorityBadge priority={priorite} />
                <StatusBadge status={statutIncident} />
            </div>
        </div>
    </div>
);

const getSteps = (incident: IncidentDetail) => [
    {
        label: 'Déclaré le',
        status: !!incident.dateDeclaration,
        details: incident.dateDeclaration
            ? `${new Date(incident.dateDeclaration).toLocaleDateString()} à ${new Date(incident.dateDeclaration).toLocaleTimeString()}`
            : 'Inconnu'
    },
    {
        label: 'Assigné',
        status: !!incident.coeDev_fullName,
        details: incident.coeDev_fullName || 'Non assigné'
    },
    {
        label: 'Traitement',
        status: ['IN_PROGRESS', 'RESOLVED', 'TRANSFERRED'].includes(incident.statutIncident),
        details:
          incident.statutIncident === IncidentStatus.PRIS_EN_CHARGE
            ? "En cours d’analyse"
            : incident.statutIncident === IncidentStatus.RESOLU
                ? "Résolu"
                : incident.statutIncident === IncidentStatus.TRANSFERE
                ? "Transféré"
                : incident.statutIncident === IncidentStatus.AFFECTE
                    ? "Affecté"
                    : "Déclaré"


    },
    {
        label: 'Résolu le',
        status: !!incident.dateResolution,
        details: incident.dateResolution
            ? `${new Date(incident.dateResolution).toLocaleDateString()} à ${new Date(incident.dateResolution).toLocaleTimeString()}`
            : 'Non résolu'
    }
];

const HistoriquePopup = ({ incident, onClose }: Props) => {
    const steps = getSteps(incident);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto relative p-3 md:p-4">
                <button className="absolute top-2 right-2 text-gray-500 hover:text-red-600" onClick={onClose}>
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-2">
                    <Info className="text-blue-500 w-5 h-5" />
                    Détails de l’incident
                </h2>

                <div className="mb-2"><StatusBadge status={incident.statutIncident} /></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mb-2">
                    <InfoItem icon={<span className="font-semibold text-gray-800 text-sm">#</span>} label="ID" />
                    <InfoItem icon={<Tag className="w-4 h-4 text-blue-400" />} label="Titre" value={incident.titre} />
                    <InfoItem icon={<CalendarDays className="w-4 h-4 text-blue-400" />} label="Créé le" value={incident.dateDeclaration} />
                    <InfoItem icon={<span className="w-4 h-4 text-orange-500 text-sm">P</span>} label="Priorité" value={<PriorityBadge priority={incident.priorite} />} />
                    {incident.coeDev_fullName && <InfoItem icon={<User className="w-4 h-4 text-gray-400" />} label="Assigné à" value={incident.coeDev_fullName} />}
                    {incident.client_firstName && <InfoItem icon={<User className="w-4 h-4 text-purple-500" />} label="Déclaré par" value={incident.client_fullName} />}
                    {incident.application && <InfoItem icon={<Tag className="w-4 h-4 text-indigo-500" />} label="Catégorie" value={incident.application} />}
                </div>

                {incident.description && (
                    <div className="mb-3">
                        <h3 className="text-sm font-semibold text-gray-800 mb-1">Description</h3>
                        <p className="text-sm text-gray-600 whitespace-pre-line rounded-md border border-gray-200 p-2">{incident.description}</p>
                    </div>
                )}

                <div className="mb-3">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-1">
                        <Clock className="w-5 h-5 text-gray-600" /> Historique
                    </h3>
                    <ol className="relative border-l-2 border-gray-200 ml-3 pl-4 space-y-2">
                        {steps.map((step, index) => (
                            <li key={index} className="relative">
                                <div className="absolute -left-2 top-0.5 w-4 h-4 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
                                    {step.status && <Check className="w-4 h-4 text-green-500" />}
                                </div>
                                <div className="ml-3">
                                    <p className={`text-sm font-medium ${step.status ? 'text-gray-800' : 'text-gray-400'}`}>{step.label}</p>
                                    {step.details && <p className="text-sm text-gray-500">{step.details}</p>}
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>

              
            </div>
        </div>
    );
};

export default HistoriquePopup;
