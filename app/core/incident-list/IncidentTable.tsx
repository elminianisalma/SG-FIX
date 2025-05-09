import React, { useState } from 'react';
import { Incident } from '../../utils/TypeIncident';
import { getStatusStyle } from '../../utils/styleHelpers';
import IncidentPopup from './IncidentPopup';
import { FaUser, FaCalendarAlt, FaFlag, FaInfoCircle, FaHashtag, FaTags } from 'react-icons/fa';

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
        <table className="w-full table-auto bg-white shadow-sm">
            <thead>
                <tr className="bg-gray-100 text-sm font-medium text-left">
                    <th className="p-3"><div className="flex items-center gap-2"><FaHashtag /> ID</div></th>
                    <th className="p-3"><div className="flex items-center gap-2"><FaInfoCircle /> Titre</div></th>
                    <th className="p-3"><div className="flex items-center gap-2"><FaUser /> DU</div></th>
                    <th className="p-3"><div className="flex items-center gap-2"><FaFlag /> Statut</div></th>
                    <th className="p-3"><div className="flex items-center gap-2"><FaFlag /> Priorité</div></th>
                    <th className="p-3"><div className="flex items-center gap-2"><FaUser /> Assigné à</div></th>
                    <th className="p-3"><div className="flex items-center gap-2"><FaCalendarAlt /> Date Création</div></th>
                    <th className="p-3"><div className="flex items-center gap-2"><FaCalendarAlt /> Date Résolution</div></th>
                    <th className="p-3"><div className="flex items-center gap-2"><FaTags /> Tags</div></th>
                </tr>
            </thead>
            <tbody>
        {incidents.map((incident) => (
            <tr
                key={incident.id}
                onClick={() => setSelectedIncident(incident)}
                className="hover:bg-gray-50 transition cursor-pointer"
            >
                <td className="p-3 font-medium text-gray-700">{incident.id}</td>
                <td className="p-3">{incident.title}</td>
                <td className="p-3 flex items-center gap-2 whitespace-nowrap">{incident.title}</td>
                <td className="p-3 flex items-center gap-2 whitespace-nowrap">{incident.du}</td>
                <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(incident.status)}`}>
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
                <td className="p-3 whitespace-nowrap">{incident.dateResolution || '—'}</td>
                <td className="p-3">
                    <div className="flex flex-row gap-2 flex-wrap items-center">
                        {incident.tags && incident.tags.length > 0 ? (
                            incident.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full whitespace-nowrap"
                                >
                                    {tag}
                                </span>
                            ))
                        ) : (
                            <span className="text-gray-400 italic text-sm">Aucun</span>
                        )}
                    </div>
                </td>
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
