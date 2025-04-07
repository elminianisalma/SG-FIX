import { useState } from 'react';  
import { Incident } from '../utils/TypeIncident';
import { getStatusStyle } from '../utils/IncidentStatus';
import IncidentDetails from './IncidentDetail'; 
import { getPriorityStyle, IncidentPriority } from '../utils/IncidentPriority';
import { getImpactStyle, IncidentImpact } from '../utils/IncidentImpact';

type IncidentTableProps = {
  incidents: Incident[];
};

export default function IncidentTable({ incidents }: IncidentTableProps) {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  const handleCloseDetails = () => {
    setSelectedIncident(null);
  };

  return (
    <div className={`relative ${selectedIncident ? 'backdrop-blur-md' : ''}`}>
      <div className="bg-white p-4 rounded-lg shadow-lg z-10 relative">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-3 w-10"><input type="checkbox" disabled /></th>
              <th className="p-3">Incident ID</th>
              <th className="p-3">Title</th>
              <th className="p-3">Affected Service</th>
              <th className="p-3">Assigned To</th>
              <th className="p-3">Date Creation</th>
              <th className="p-3">Status</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Impact</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident) => (
              <tr
                key={incident.id}
                className="border-b cursor-pointer hover:bg-gray-200"
                onClick={() => setSelectedIncident(incident)}
              >
                <td className="p-3 w-10"><input type="checkbox" /></td>
                <td className="p-3">{incident.id}</td>
                <td className="p-3">{incident.title}</td>
                <td className="p-3">{incident.service}</td>
                <td className="p-3 flex items-center">
                  <img src={incident.profileImage} alt={incident.assignedTo} className="w-8 h-8 rounded-full mr-2" />
                  {incident.assignedTo}
                </td>
                <td className="p-3">{incident.createdAt}</td>
                <td className="p-3">
                  <span className={`px-3 py-1 rounded-full font-bold text-xs ${getStatusStyle(incident.status)}`}>
                    {incident.status}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`px-3 py-1 rounded-full font-bold text-xs ${getPriorityStyle(incident.priority as IncidentPriority)}`}>
                    {incident.priority || 'N/A'}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`px-3 py-1 rounded-full font-bold text-xs ${getImpactStyle(incident.impact as IncidentImpact)}`}>
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
