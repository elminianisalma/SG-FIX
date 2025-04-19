import { useState } from 'react';
import { Incident } from '../../utils/TypeIncident';
import { getStatusStyle } from '../../utils/IncidentStatus';
import IncidentDetails from './IncidentDetail';
import { getPriorityStyle, IncidentPriority } from '../../utils/IncidentPriority';
import { getImpactStyle, IncidentImpact } from '../../utils/IncidentImpact';

type IncidentTableProps = {
  incidents: Incident[];
};

export default function IncidentTable({ incidents }: IncidentTableProps) {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  const handleCloseDetails = () => {
    setSelectedIncident(null);
  };

  return (
      <div className={`relative ${selectedIncident ? 'backdrop-blur-md' : ''} pl-6`}>
        <div className="bg-white p-6 rounded-2xl shadow-xl z-10 relative">
          <table className="w-full text-left border-collapse text-lg">
            <thead>
            <tr className="border-b bg-gray-100 text-xl font-semibold text-gray-800">
              <th className="p-4 w-10"><input type="checkbox" disabled /></th>
              <th className="p-4">Incident ID</th>
              <th className="p-4">Titre</th>
              <th className="p-4">Service affecté</th>
              <th className="p-4">Assigné à</th>
              <th className="p-4">Date de Création</th>
              <th className="p-4">Status</th>
              <th className="p-4">Priorité</th>
              <th className="p-4">Impact</th>
            </tr>
            </thead>
            <tbody className="text-lg text-gray-700">
            {incidents.map((incident) => (
                <tr
                    key={incident.id}
                    className="border-b cursor-pointer hover:bg-gray-200"
                    onClick={() => setSelectedIncident(incident)}
                >
                  <td className="p-4 w-10"><input type="checkbox" /></td>
                  <td className="p-4">{incident.id}</td>
                  <td className="p-4">{incident.title}</td>
                  <td className="p-4">{incident.service}</td>
                  <td className="p-4 flex items-center">
                    <img src={incident.profileImage} alt={incident.assignedTo} className="w-9 h-9 rounded-full mr-3" />
                    {incident.assignedTo}
                  </td>
                  <td className="p-4">{incident.createdAt}</td>
                  <td className="p-4">
                      <span className={`min-w-[140px] inline-block text-center px-4 py-1 rounded-full font-bold text-base ${getStatusStyle(incident.status)}`}>
                        {incident.status}
                      </span>
                            </td>
                      <td className="p-4">
                      <span className={`min-w-[140px] inline-block text-center px-4 py-1 rounded-full font-bold text-base ${getPriorityStyle(incident.priority as IncidentPriority)}`}>
                        {incident.priority || 'N/A'}
                      </span>
                         </td>
                          <td className="p-4">
                      <span className={`min-w-[140px] inline-block text-center px-4 py-1 rounded-full font-bold text-base ${getImpactStyle(incident.impact as IncidentImpact)}`}>
                        {incident.impact || 'N/A'}
                      </span>
                  </td>

                </tr>
            ))}
            </tbody>
          </table>
        </div>

        {/* Affiche les détails avec le fond flou */}
        {selectedIncident && (
            <IncidentDetails incident={selectedIncident} onClose={handleCloseDetails} />
        )}
      </div>
  );
}
