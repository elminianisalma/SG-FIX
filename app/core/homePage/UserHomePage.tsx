'use client';

import Sidebar from '@/app/core/SideBar/Sidebar';
import HeaderBar from '@/app/core/components/HeaderBar';
import { useRouter } from 'next/navigation';
import {
    PlusCircle,
    Clock,
    CheckCircle,
    Bell,
    FileText,
    Settings,
} from 'lucide-react';

export default function UserHomePage() {
    const router = useRouter();

    const actions = [
        {
            title: 'Créer un incident',
            description: 'Signalez un nouveau problème.',
            icon: <PlusCircle className="h-12 w-12 mb-2 text-red-500" />,
            action: () => router.push('/core/create-incident'),
        },
        {
            title: 'Incidents en cours',
            description: 'Consultez vos incidents ouverts.',
            icon: <Clock className="h-12 w-12 mb-2 text-gray-600" />,
            action: () => router.push('/core/incident-en-cours'),
        },
        {
            title: 'Historique incidents',
            description: 'Vos incidents résolus.',
            icon: <CheckCircle className="h-12 w-12 mb-2 text-red-500" />,
            action: () => router.push('/core/historique-incident'),
        },
        {
            title: 'Notifications',
            description: 'Mises à jour récentes.',
            icon: <Bell className="h-12 w-12 mb-2 text-gray-600" />,
            action: () => router.push('/core/notification-user'),
        },
        {
            title: 'FAQ',
            description: 'Incidents fréquents et solutions.',
            icon: <FileText className="h-12 w-12 mb-2 text-red-500" />,
            action: () => router.push('/core/faq'),
        },
        {
            title: 'Paramètres',
            description: 'Gérez votre compte.',
            icon: <Settings className="h-12 w-12 mb-2 text-gray-600" />,
            action: () => router.push('/core/parametres-user'),
        },
    ];

    return (
        <div className="min-h-screen flex bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <HeaderBar />

                <main className="flex-1 flex flex-col items-center justify-center p-10">
                    <h2 className="text-4xl font-bold mb-10 text-gray-800 text-center">
                        Bienvenue sur <span className="text-red-600">SG-FIX</span> !
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {actions.map((item, index) => (
                            <div
                                key={index}
                                onClick={item.action}
                                className="cursor-pointer bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center 
                                           transform transition-all duration-300 ease-in-out 
                                           hover:-translate-y-2 hover:scale-105 hover:shadow-2xl 
                                           border border-transparent hover:border-red-400 
                                           animate-fade-in-up"
                                style={{ minHeight: '230px', minWidth: '230px' }}
                            >
                                <div className="mb-4">{item.icon}</div>
                                <h3 className="text-2xl font-semibold text-gray-700 mb-2 text-center">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 text-md text-center">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
