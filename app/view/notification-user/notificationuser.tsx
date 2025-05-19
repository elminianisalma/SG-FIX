'use client';

import Sidebar from '@/app/core/SideBar/Sidebar';
import { Bell, Info } from 'lucide-react';
import Image from 'next/image';
import logoImage from '@/public/images/logoImage.png';

const incidents = [
    {
        id: 'ID9831',
        title: "Problème d'accès base de données",
        status: 'RESOLVED',
        declaredBy: 'Nour El Houda',
        date: '2025-04-26',
    },
    {
        id: 'ID7261',
        title: "Erreur dans l'authentification",
        status: 'IN_PROGRESS',
        declaredBy: 'Youssef Lahrichi',
        date: '2025-04-28',
    },
    {
        id: 'ID3365',
        title: "Timeout de l’API Paiement",
        status: 'ASSIGNED',
        declaredBy: 'Samira Bakkali',
        date: '2025-04-27',
    },
];

const statusLabels: Record<string, string> = {
    DECLARED: 'Soumis',
    ASSIGNED: 'Affecté',
    IN_PROGRESS: 'Pris en charge',
    TRANSFERRED: 'Transféré',
    RESOLVED: 'Résolu'
};

const getStatusStyle = (status: string) => {
    const styleMap = {
        RESOLVED: 'bg-green-100 text-green-700 border border-green-300',
        IN_PROGRESS: 'bg-orange-100 text-orange-700 border border-orange-300',
        ASSIGNED: 'bg-purple-100 text-purple-700 border border-purple-300',
        DECLARED: 'bg-yellow-100 text-yellow-700 border border-yellow-300',
        TRANSFERRED: 'bg-blue-100 text-blue-700 border border-blue-300'
    };
    return styleMap[status] || 'bg-gray-200 text-gray-700 border border-gray-300';
};

export default function NotificationUser() {
    return (
        <div className="flex bg-gray-50 min-h-screen text-[16px]">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
                    <div className="w-1/3" />
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
                <main className="p-6 max-w-4xl mx-auto w-full">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Notifications</h1>
                    <div className="space-y-4">
                        {incidents.map((incident) => (
                            <div
                                key={incident.id}
                                className="bg-white rounded-lg shadow border-l-4 border-red-400 p-4"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-gray-800 font-semibold flex items-center gap-2">
                                        <Info className="h-5 w-5 text-red-500" />
                                        {incident.title}
                                    </p>
                                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusStyle(incident.status)}`}>
                                        {statusLabels[incident.status] || incident.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500">
                                    Déclaré par <span className="font-semibold">{incident.declaredBy}</span> le {incident.date}
                                </p>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
