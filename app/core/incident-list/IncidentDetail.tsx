import { Incident } from '../../utils/TypeIncident';
import { getStatusStyle } from '../../utils/IncidentStatus';
import { getPriorityStyle, IncidentPriority } from '../../utils/IncidentPriority';
import { getImpactStyle, IncidentImpact } from '../../utils/IncidentImpact';
import { getUrgencyStyle, IncidentUrgency } from '../../utils/IncidentUrgency';

 type IncidentDetailsProps = {
   incident: Incident | null;
   onClose: () => void;
 };
 export default function IncidentDetails({ incident, onClose }: { incident: Incident | null; onClose: () => void; }) {
  if (!incident) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-lg bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-4">Incident Details</h2>

        <p><strong>ID:</strong> {incident.id}</p>
        <p><strong>Title:</strong> {incident.title}</p>
        <p><strong>Service:</strong> {incident.service}</p>
        <p><strong>Description:</strong> {incident.description || 'N/A'}</p>

        <div className="flex items-center gap-3 mt-3">
          <span><strong>Assigned To:</strong> {incident.assignedTo}</span>
          <img src={incident.profileImage} alt={incident.assignedTo} className="w-10 h-10 rounded-full" />
        </div>

        <p className="mt-2"><strong>Created At:</strong> {incident.createdAt}</p>
        <p><strong>Last Updated By:</strong> {incident.lastUpdatedBy || 'N/A'}</p>
        <p><strong>Last Updated At:</strong> {incident.lastUpdatedAt || 'N/A'}</p>

        <div className="mt-2">
          <strong>Status:</strong>
          <span className={`px-3 py-1 rounded-full font-bold text-xs bg-gray-200`}>{incident.status}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <strong>Priority:</strong> 
              <span className={`px-3 py-1 rounded-full font-bold text-xs ${getPriorityStyle(incident.priority as IncidentPriority)}`}>
                {incident.priority || 'N/A'}
              </span>
            </div>
            <div>
              <strong>Impact:</strong> 
              <span className={`px-3 py-1 rounded-full font-bold text-xs ${getImpactStyle(incident.impact as IncidentImpact)}`}>
                {incident.impact || 'N/A'}
              </span>
            </div>
            <div>
              <strong>Urgency:</strong> 
              <span className={`px-3 py-1 rounded-full font-bold text-xs ${getUrgencyStyle(incident.urgency as IncidentUrgency)}`}>
                {incident.urgency || 'N/A'}
              </span>
            </div>
            <div>
              <strong>SLA:</strong> <span>{incident.sla || 'N/A'}</span>
            </div>
          </div>

      </div>
    </div>
  );
}
