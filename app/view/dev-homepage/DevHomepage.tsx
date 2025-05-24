'use client';

import React from 'react';
import HeaderBar from '@/app/view/components/HeaderBar';
import { ClipboardList, KanbanSquare, Wrench, Bell } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Sidebar from '../SideBarComponent/SideBar';

const DevHomePage = () => {
  const router = useRouter();

  const cards = [
    {
      title: "Mes notifications",
      icon: <Bell className="w-6 h-6 text-orange-500" />,
      onClick: () => router.push("/view/notification-page"),
      description: "Voir les incidents qui vous ont été affectés.",
    },
    {
      title: "Listes des Incidents ",
      icon: <KanbanSquare className="w-6 h-6 text-blue-600" />,
      onClick: () => router.push("/view/tasks-dashboard"),
      description: "Consulter la liste des incidents en cours.",
    },
    {
      title: "Traiter un incident",
      icon: <Wrench className="w-6 h-6 text-green-600" />,
      onClick: () => router.push("/view/incidents-details"),
      description: "Accéder à l'interface de traitement d’un incident.",
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
              Bienvenue sur votre espace Développeur SG-FIX
            </h1>

            {/* KPI DU JOUR */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Mes KPI du jour</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {/* KPI Cards */}
                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 flex items-center gap-4">
                  <div className="p-4 bg-orange-100 rounded-full">
                    <ClipboardList className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">5</p>
                    <p className="text-base text-gray-600">Incidents affectés</p>
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
                    <p className="text-xl font-bold text-gray-900">2</p>
                    <p className="text-base text-gray-600">En cours de traitement</p>
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
                    <p className="text-base text-gray-600">Résolus aujourd’hui</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fonctionnalités */}
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
                      <p className="text-lg font-bold text-gray-900">{card.title}</p>
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

export default DevHomePage;
