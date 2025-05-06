'use client';

import { useState } from 'react';
import { Incident } from '../../utils/TypeIncident';
import { getStatusStyle } from '../../utils/IncidentStatus';
import IncidentDetails from './IncidentDetail';
import { getPriorityStyle, IncidentPriority } from '../../utils/IncidentPriority';

type IncidentTableProps = {
  incidents: Incident[]; // S'assurer que cette prop est bien reçue
};

function getInitials(fullName: string) {
  const parts = fullName.split(' ');
  return parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0][0];
}

function getColorForName(name: string) {
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
  return colors[hash % colors.length];
}

export default function IncidentTable({ incidents }: IncidentTableProps) {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  const handleCloseDetails = () => {
    setSelectedIncident(null);
  };

  if (!incidents || incidents.length === 0) {
    return (
        <div className="text-center text-sm text-gray-500 p-4">
          Aucun incident à afficher.
        </div>
    );
  }

  return (
      <div className={`relative ${selectedIncident ? 'backdrop-blur-md' : ''}`}>
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
            <tr className="border-b bg-gray-100 text-gray-800 font-semibold">
              <th className="p-3">Incident ID</th>
              <th className="p-3">Titre</th>
              <th className="p-3">Service</th>
              <th className="p-3">Assigné à</th>
              <th className="p-3">Créé le</th>
              <th className="p-3">Statut</th>
              <th className="p-3">Priorité</th>
            </tr>
            </thead>
            <tbody className="text-gray-700">
            {incidents.map((incident) => (
                <tr
                    key={incident.id}
                    className="border-b cursor-pointer hover:bg-gray-100 transition"
                    onClick={() => setSelectedIncident(incident)}
                >
                  <td className="p-3">{incident.id}</td>
                  <td className="p-3 break-words">{incident.title}</td>
                  <td className="p-3">{incident.service}</td>
                  <td className="p-3 flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold ${getColorForName(incident.assignedTo || '')}`}>
                      {getInitials(incident.assignedTo || '')}
                    </div>
                    <span className="text-xs md:text-sm">{incident.assignedTo}</span>
                  </td>
                  <td className="p-3">{incident.createdAt}</td>
                  <td className="p-3">
                  <span className={`inline-block px-2 py-1 rounded-full text-white font-semibold text-[10px] md:text-xs ${getStatusStyle(incident.status)}`}>
                    {incident.status}
                  </span>
                  </td>
                  <td className="p-3">
                  <span className={`inline-block px-2 py-1 rounded-full text-white font-semibold text-[10px] md:text-xs ${getPriorityStyle(incident.priority as IncidentPriority)}`}>
                    {incident.priority || 'N/A'}
                  </span>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>

        {selectedIncident && (
            <IncidentDetails incident={selectedIncident} onClose={handleCloseDetails} />
        )}
      </div>
  );
}
