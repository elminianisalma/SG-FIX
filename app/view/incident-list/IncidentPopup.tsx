import React from 'react';
import { Incident } from '../../utils/TypeIncident';
import { getStatusStyle } from '../../utils/styleHelpers';

interface Props {
    incident: Incident;
    onClose: () => void;
}

const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${hash % 360}, 60%, 60%)`;
};

const IncidentPopup: React.FC<Props> = ({ incident, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md relative">
                <button
                    className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
                    onClick={onClose}
                >
                    ×
                </button>

                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                    Détails de l incident
                </h2>

                <div className="space-y-3 text-sm text-gray-700">
                    <div><strong>ID :</strong> {incident.id}</div>
                    <div><strong>Titre :</strong> {incident.title}</div>
                    <div><strong>DU :</strong> {incident.du}</div>

                    <div>
                        <strong>Statut :</strong>{' '}
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusStyle(incident.status)}`}>
              {incident.status}
            </span>
                    </div>

                    <div>
                        <strong>Priorité :</strong>{' '}
                        <span className="inline-block text-xs font-semibold text-gray-700 bg-gray-200 rounded-full px-2 h-6 flex items-center justify-center whitespace-nowrap">
              {incident.priority}
            </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <strong>Assigné à :</strong>
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                            style={{ backgroundColor: stringToColor(incident.assignedTo) }}
                        >
                            {incident.assignedTo
                                .split(' ')
                                .map((n) => n[0])
                                .join('')
                                .toUpperCase()}
                        </div>
                        <span>{incident.assignedTo}</span>
                    </div>

                    <div><strong>Date de création :</strong> {incident.createdAt}</div>
                    <div><strong>Impact :</strong> {incident.impact}</div>
                    <div><strong>Urgence :</strong> {incident.urgency}</div>
                </div>
            </div>
        </div>
    );
};

export default IncidentPopup;
