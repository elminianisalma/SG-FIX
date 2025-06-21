import React from 'react';
import { IncidentDetail } from '@/app/models/IncidentDetail';

const IncidentCard: React.FC<{ incident: IncidentDetail }> = ({ incident }) => {
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'affecté':
        return 'bg-blue-100 text-blue-700';
      case 'résolu':
        return 'bg-green-100 text-green-700';
      case 'soumis':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const performance = Math.floor(Math.random() * 10); // À remplacer par une vraie logique

  return (
    <div className="border rounded-md shadow-sm p-4 mb-4">
      <div className="text-sm text-gray-400 mb-1">#{incident.id.toString()}</div>
      <h3 className="text-md font-semibold mb-2">{incident.titre}</h3>

      <div className="flex flex-wrap items-center text-sm text-gray-600 mb-3">
        <span className="mr-4">👤 {incident.coeDev_fullName}</span>
        <span className="mr-4">📍 {incident.environnement}</span>
        <span className="mr-4">🕒 {new Date(incident.dateAttribution).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        <span className="mr-4">📅 {new Date(incident.dateDeclaration).toLocaleDateString()}</span>
      </div>

      <div className="flex justify-between items-center">
        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusStyle(incident.statutIncident)}`}>
          {incident.statutIncident}
        </span>
        <span className="text-sm text-gray-500">Performance - {performance}/10</span>
      </div>
    </div>
  );
};

export default IncidentCard;
