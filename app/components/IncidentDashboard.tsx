'use client';

import { useState } from 'react';
import Sidebar from './SideBar';
import IncidentTable from './IncidentTable';
import IncidentDetails from './IncidentDetail';
import { Incident } from '../utils/TypeIncident';
import { IncidentStatus } from '../utils/IncidentStatus';
export default function Dashboard() {
  const [incidents] = useState<Incident[]>([
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


  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">List of Incidents</h1>
        <IncidentTable incidents={incidents}  />
        
      </div>
    </div>
  );
}
