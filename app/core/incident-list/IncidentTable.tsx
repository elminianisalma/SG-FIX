import React, { useState } from 'react';
import { Incident } from '../../utils/TypeIncident';
import { getStatusStyle } from '../../utils/styleHelpers';
import IncidentPopup from './IncidentPopup';

const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 60%, 60%)`;
    return color;
};

interface Props {
    incidents?: Incident[];
}

const IncidentTable: React.FC<Props> = ({ incidents = [] }) => {
    const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

    return (
        <>
            <table className="min-w-full bg-white border rounded shadow-sm">
                <thead>
                <tr className="bg-gray-100 text-left text-sm text-gray-600 font-semibold">
                    <th className="p-3">ID</th>
                    <th className="p-3">Titre</th>
                    <th className="p-3">DU</th>
                    <th className="p-3">Statut</th>
                    <th className="p-3">Priorité</th>
                    <th className="p-3">Assigné à</th>
                    <th className="p-3">Date</th>
                </tr>
                </thead>
                <tbody>
                {incidents.map((incident) => (
                    <tr
                        key={incident.id}
                        onClick={() => setSelectedIncident(incident)}
                        className="border-t hover:bg-gray-50 transition cursor-pointer"
                    >
                        <td className="p-3 font-medium text-gray-700">{incident.id}</td>
                        <td className="p-3">{incident.title}</td>
                        <td className="p-3">{incident.du}</td>
                        <td className="p-3">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusStyle(incident.status)}`}>
                  {incident.status}
                </span>
                        </td>
                        <td className="p-3">
                <span
                    className="inline-block text-xs font-semibold text-white rounded-full px-2 h-6 flex items-center justify-center whitespace-nowrap"
                    style={{
                        backgroundColor:
                            incident.priority === 'CRITIQUE'
                                ? '#7f1d1d'
                                : incident.priority === 'ÉLEVÉE'
                                    ? '#9a3412'
                                    : incident.priority === 'MOYENNE'
                                        ? '#92400e'
                                        : '#6d768f',
                    }}
                >
                  {incident.priority}
                </span>
                        </td>
                        <td className="p-3 flex items-center gap-2">
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
                        </td>
                        <td className="p-3 whitespace-nowrap">{incident.createdAt}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {selectedIncident && (
                <IncidentPopup incident={selectedIncident} onClose={() => setSelectedIncident(null)} />
            )}
        </>
    );
};

export default IncidentTable;
