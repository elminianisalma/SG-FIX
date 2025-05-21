'use client';

import React from 'react';
import HeaderBar from '@/app/view/components/HeaderBar';
import { BarChart2, Users, AlertTriangle, Bell, UserCheck, ClipboardCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Sidebar from '../SideBarComponent/SideBar';

const BAHomePage = () => {
  const router = useRouter();

  const cards = [
    {
      title: "Liste des incidents",
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      onClick: () => router.push("/view/incidents"),
      description: "Consulter tous les incidents déclarés.",
    },
    {
      title: "Affecter un incident",
      icon: <ClipboardCheck className="w-6 h-6 text-blue-600" />,
      onClick: () => router.push("/view/assign-incident"),
      description: "Assigner un incident à un développeur.",
    },
    {
      title: "Disponibilité des développeurs",
      icon: <UserCheck className="w-6 h-6 text-green-600" />,
      onClick: () => router.push("/view/dev-disponibility"),
      description: "Voir les développeurs disponibles.",
    },
    {
      title: "Tableau de bord",
      icon: <BarChart2 className="w-6 h-6 text-purple-600" />,
      onClick: () => router.push("/view/dashboard-ba"),
      description: "Visualiser les statistiques.",
    },
    {
      title: "Notifications",
      icon: <Bell className="w-6 h-6 text-orange-500" />,
      onClick: () => router.push("/view/notifications"),
      description: "Voir les incidents récemment déclarés.",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <HeaderBar />

        <main className="flex justify-center items-start p-6 sm:p-10 h-full overflow-y-auto">
          <div className="max-w-6xl w-full">
            <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">
              Bienvenue sur l’espace Business Analyst SG-FIX
            </h1>

            {/* KPI DU JOUR */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">KPI du jour</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {/* KPI Cards */}
                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 flex items-center gap-4">
                  <div className="p-4 bg-red-100 rounded-full">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">8</p>
                    <p className="text-base text-gray-600">Incidents déclarés</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 flex items-center gap-4">
                  <div className="p-4 bg-yellow-100 rounded-full">
                    <svg className="w-6 h-6 text-yellow-600 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">5</p>
                    <p className="text-base text-gray-600">Incidents en cours</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 flex items-center gap-4">
                  <div className="p-4 bg-green-100 rounded-full">
                    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">3</p>
                    <p className="text-base text-gray-600">Incidents résolus</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FONCTIONNALITÉS */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Fonctionnalités</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                  <div
                    key={index}
                    onClick={card.onClick}
                    className="cursor-pointer bg-white border border-gray-200 rounded-2xl p-6 shadow hover:shadow-lg transition duration-200 flex flex-col justify-between h-full"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-gray-100 rounded-full">{card.icon}</div>
                      <p className="text-lg font-bold text-gray-900 ">{card.title}</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 ml-1">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default BAHomePage;
