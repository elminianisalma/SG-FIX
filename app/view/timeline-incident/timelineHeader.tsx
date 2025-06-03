import { IncidentDetail } from "@/app/models/IncidentDetail";
import { IncidentStatus } from "@/app/utils/IncidentStatus";

interface TimelineHeaderProps {
  incidents: IncidentDetail[];
}

export default function TimelineHeader({ incidents }: TimelineHeaderProps) {
  const activeIncidents = incidents.filter(inc => inc.statutIncident === IncidentStatus.PRIS_EN_CHARGE).length;
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h1 className="text-2xl font-bold">Incidents ({activeIncidents} Active)</h1>
        <div className="flex space-x-2 mt-2">
          <button className="text-sm px-3 py-1 bg-gray-200 rounded">Timeline View</button>
          <button className="text-sm px-3 py-1 bg-gray-100 rounded">Month View</button>
          <button className="text-sm px-3 py-1 bg-gray-100 rounded">Gantt View</button>
          <button className="text-sm px-3 py-1 bg-gray-100 rounded">Priority Filter</button>
        </div>
      </div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded">+ Add Incident</button>
    </div>
  );
}