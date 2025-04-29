// app/core/historique-incident/historiqueIncident.tsx
'use client';

import Sidebar from '@/app/core/SideBar/Sidebar';
import { Bell, User, CalendarDays, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import logoImage from '@/public/images/logoImage.png';

const incidents = [
    {
        id: 'ID8239851',
        title: 'Timeout API billing',
        status: 'RESOLU',
        assignedTo: 'Chama Benkierch',
        createdAt: '2025-03-24',
        priority: 'MOYENNE'
    },
    {
        id: 'ID9917251',
        title: 'Lien mort dans la documentation API',
        status: 'RESOLU',
        assignedTo: 'Sara Lamsalek',
        createdAt: '2025-03-15',
        priority: 'BASSE'
    }
];

const getPriorityStyle = (priority: string) => {
    switch (priority?.toUpperCase()) {
        case 'CRITIQUE':
            return 'bg-red-100 text-red-800 border border-red-300';
        case 'HAUTE':
            return 'bg-orange-100 text-orange-800 border border-orange-300';
        case 'MOYENNE':
            return 'bg-yellow-100 text-yellow-800 border border-yellow-300';
        case 'BASSE':
            return 'bg-green-100 text-green-800 border border-green-300';
        default:
            return 'bg-gray-200 text-gray-700 border border-gray-300';
    }
};

export default function HistoriqueIncident() {
    return (
        <div className="min-h-screen flex bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
                    <div className="w-1/3"></div>
                    <div className="flex justify-center w-1/3">
                        <Image src={logoImage} alt="Logo SG-FIX" width={220} height={70} />
                    </div>
                    <div className="flex justify-end w-1/3">
                        <div className="relative cursor-pointer">
                            <Bell className="h-7 w-7 text-gray-600" />
                            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 border-2 border-white" />
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-8 flex flex-col items-center">
                    <div className="w-full max-w-4xl">
                        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Historique des incidents résolus</h1>
                        <div className="grid gap-6">
                            {incidents.map((incident) => (
                                <div
                                    key={incident.id}
                                    className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition"
                                >
                                    <h2 className="text-2xl font-semibold text-green-600 mb-4">{incident.title}</h2>
                                    <div className="text-lg text-gray-700 space-y-2">
                                        <p className="flex items-center gap-2">
                                            <User className="h-5 w-5 text-gray-500" />
                                            <span className="font-medium">Affecté à :</span> {incident.assignedTo}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <CalendarDays className="h-5 w-5 text-gray-500" />
                                            <span className="font-medium">Date :</span> {incident.createdAt}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <AlertTriangle className="h-5 w-5 text-gray-500" />
                                            <span className="font-medium">Priorité :</span>
                                            <span className={`px-2 py-1 rounded text-sm font-semibold ${getPriorityStyle(incident.priority)}`}>
                        {incident.priority}
                      </span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}