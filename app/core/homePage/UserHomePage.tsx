'use client';

import Sidebar from '@/app/core/SideBar/Sidebar';
import { useRouter } from 'next/navigation';
import { PlusCircle, Clock, CheckCircle, Bell, FileText, Settings } from 'lucide-react';
import Image from 'next/image';
import logoImage from '@/public/images/logoImage.png';

export default function UserHomePage() {
    const router = useRouter();
    const hasNotification = true; // changer à false si aucune notif

    const actions = [
        {
            title: 'Créer un incident',
            description: 'Signalez un nouveau problème.',
            icon: <PlusCircle className="h-10 w-10 mb-2 text-red-500" />,
            action: () => router.push('/core/create-incident'), // ✅ Existe
        },
        {
            title: 'Incidents en cours',
            description: 'Consultez vos incidents ouverts.',
            icon: <Clock className="h-10 w-10 mb-2 text-gray-600" />,
            action: () => router.push('/core/incident-list?filter=open'), // ✅ Existe
        },
        {
            title: 'Historique incidents',
            description: 'Vos incidents résolus.',
            icon: <CheckCircle className="h-10 w-10 mb-2 text-red-500" />,
            action: () => router.push('/core/incident-list?filter=resolved'), // ✅ Existe
        },
        {
            title: 'Notifications',
            description: 'Mises à jour récentes.',
            icon: <Bell className="h-10 w-10 mb-2 text-gray-600" />,
            action: () => router.push('/core/notification-page'), // ✅ Existe
        },
        {
            title: 'FAQ',
            description: 'Incidents fréquents et solution.',
            icon: <FileText className="h-10 w-10 mb-2 text-red-500" />,
            action: () => router.push('/core/faq'), // ❌ À créer
        },
        {
            title: 'Paramètres',
            description: 'Gérez votre compte.',
            icon: <Settings className="h-10 w-10 mb-2 text-gray-600" />,
            action: () => router.push('/core/settings'), // ❌ À créer
        },
    ];

    return (
        <div className="min-h-screen flex bg-gray-100">
            <Sidebar />

            <div className="flex-1 flex flex-col">

                {/* HEADER */}
                <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
                    {/* Espace vide gauche */}
                    <div className="w-1/3"></div>

                    {/* Logo centré */}
                    <div className="flex justify-center w-1/3">
                        <Image src={logoImage} alt="Logo SG-FIX" width={220} height={70} />
                    </div>

                    {/* Cloche à droite */}
                    <div className="flex justify-end w-1/3">
                        <div className="relative cursor-pointer" onClick={() => router.push('/core/notification-page')}>
                            <Bell className="h-7 w-7 text-gray-600" />
                            {hasNotification && (
                                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 border-2 border-white" />
                            )}
                        </div>
                    </div>
                </header>

                {/* BODY */}
                <main className="flex-1 flex flex-col items-center justify-center p-8">
                    <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
                        Bienvenue sur <span className="text-red-600">SG-FIX</span> !
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {actions.map((item, index) => (
                            <div
                                key={index}
                                onClick={item.action}
                                className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl p-6 flex flex-col items-center transition transform hover:-translate-y-1 hover:border hover:border-red-400"
                            >
                                {item.icon}
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">{item.title}</h3>
                                <p className="text-gray-500 text-sm text-center">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}
