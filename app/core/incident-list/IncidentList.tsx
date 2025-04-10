'use client';

import { useState } from 'react';
import { Search, Filter, PlusCircle, Settings } from 'lucide-react';
import Sidebar from '@/app/core/SideBar/SideBar';
import IncidentTable from './IncidentTable';
import KpiDashboard from './KpiDashboard';
import { Incident } from '../../utils/TypeIncident';
import { IncidentStatus } from '../../utils/IncidentStatus';
import { useRouter } from 'next/navigation';

export default function IncidentList() {
  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: 'ID1238957',
      title: 'Security Issue',
      status: IncidentStatus.PENDING,
      service: "IT Security",
      assignedTo: "John Doe",
      profileImage: "/images/john.jpeg",
      createdAt: "2025-04-01",
      priority: "High",
      impact: "Critical",
      urgency: "Medium",
      sla: "4 Hours",
      description: "Unauthorized access detected in the security system.",
      customerName: "XYZ Corp",
      lastUpdatedBy: "Admin",
      lastUpdatedAt: "2025-04-02 10:30"
    },
    {
      id: 'ID1238958',
      title: 'Network Down',
      status: IncidentStatus.COMPLETED,
      service: "Network Team",
      assignedTo: "Jane Smith",
      profileImage: "/images/jane.jpeg",
      createdAt: "2025-03-30",
      priority: "Medium",
      impact: "High",
      urgency: "High",
      sla: "8 Hours",
      description: "Internet connectivity lost in multiple offices.",
      customerName: "ABC Ltd.",
      lastUpdatedBy: "Network Admin",
      lastUpdatedAt: "2025-03-31 15:45"
    },
    {
      id: 'ID1238959',
      title: 'Database Failure',
      status: IncidentStatus.CANCELLED,
      service: "Infrastructure",
      assignedTo: "Emily Davis",
      profileImage: "/images/emily.jpeg",
      createdAt: "2025-03-28",
      priority: "Low",
      impact: "Medium",
      urgency: "Low",
      sla: "24 Hours",
      description: "Database server went offline but is no longer needed.",
      customerName: "DEF Inc.",
      lastUpdatedBy: "Database Engineer",
      lastUpdatedAt: "2025-03-29 12:00"
    }
  ]);

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredIncidents = incidents.filter(incident =>
      incident.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus ? incident.status === filterStatus : true)
  );

  const incidentsCount = filteredIncidents.length;
  const pendingCount = filteredIncidents.filter(incident => incident.status === IncidentStatus.PENDING).length;
  const completedCount = filteredIncidents.filter(incident => incident.status === IncidentStatus.COMPLETED).length;
  const cancelledCount = filteredIncidents.filter(incident => incident.status === IncidentStatus.CANCELLED).length;

  return (
      <div className="flex min-h-screen bg-gray-50">

        {/* Main content area */}
        <div className="flex-1 p-8 pl-16"> {/* Added padding-left to adjust position of content */}
          <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">List of Incidents</h1>

          <div className="mb-6 pl-6"> {/* Added padding-left for KpiDashboard */}
            <KpiDashboard
                incidentsCount={incidentsCount}
                pendingCount={pendingCount}
                completedCount={completedCount}
                cancelledCount={cancelledCount}
            />
          </div>

          {/* Filter & Search Section */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4 pl-20">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 text-lg font-bold ">Filters</span>
              <Settings className="text-gray-500" size={18}  />
            </div>

            {/* Search input */}
            <div className="relative w-full max-w-lg h-11 flex items-center">
              <Search className="absolute left-30 text-gray-400 pointer-events-none font-bold text-lg" size={20} />
              <input
                  type="text"
                  placeholder="Search incidents..."
                  className="w-full h-full pl-10 pr-4 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Create Button */}
            <button
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white shadow hover:bg-blue-700 transition duration-200"
                onClick={() => router.push('/core/create-incident')}
            >
              <PlusCircle size={20} />

              <span>Create incident</span>
            </button>
          </div>

          {/* Incidents Table */}
          <IncidentTable incidents={filteredIncidents} />
        </div>

        {/* Sidebar */}
        <div className="fixed top-0 right-0 h-full">
          <Sidebar />
        </div>
      </div>
  );
}
