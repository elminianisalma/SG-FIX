'use client';

import Sidebar from '@/app/core/SideBar/Sidebar';
import { Bell, Info } from 'lucide-react';
import Image from 'next/image';
import logoImage from '@/public/images/logoImage.png';

const incidents = [
    {
        id: 'ID9831',
        title: "Problème d'accès base de données",
        status: 'RESOLU',
        declaredBy: 'Nour El Houda',
        date: '2025-04-26',
    },
    {
        id: 'ID7261',
        title: "Erreur dans l'authentification",
        status: 'EN_COURS',
        declaredBy: 'Youssef Lahrichi',
        date: '2025-04-28',
    },
    {
        id: 'ID3365',
        title: "Timeout de l’API Paiement",
        status: 'EN_ATTENTE',
        declaredBy: 'Samira Bakkali',
        date: '2025-04-27',
    },
];

const getStatusStyle = (status: string) => {
    switch (status?.toUpperCase()) {
        case 'RESOLU':
            return 'bg-green-100 text-green-800 border border-green-300';
        case 'EN_COURS':
            return 'bg-yellow-100 text-yellow-800 border border-yellow-300';
        case 'EN_ATTENTE':
            return 'bg-orange-100 text-orange-800 border border-orange-300';
        default:
            return 'bg-gray-200 text-gray-700 border border-gray-300';
    }
};

export default function NotificationUser() {
    return (
        <div className="min-h-screen flex bg-gray-100">
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
                <main className="flex-1 p-8 flex flex-col items-center">
                    <div className="w-full max-w-3xl">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Notifications</h1>
                        <div className="space-y-4">
                            {incidents.map((incident) => (
                                <div
                                    key={incident.id}
                                    className="bg-white border-l-4 border-red-500 rounded-md shadow p-4"
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <p className="text-gray-800 font-medium flex items-center gap-2">
                                            <Info className="h-5 w-5 text-red-500" />
                                            {incident.title}
                                        </p>
                                        <span className={`text-xs px-2 py-1 rounded ${getStatusStyle(incident.status)}`}>
                      {incident.status}
                    </span>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        Déclaré par <span className="font-semibold">{incident.declaredBy}</span> le {incident.date}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
