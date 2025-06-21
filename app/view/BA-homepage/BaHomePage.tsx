'use client';

import React from 'react';
import HeaderBar from '@/app/view/components/HeaderBar';
import { BarChart2, Users, AlertTriangle, Bell, UserCheck, ClipboardCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Sidebar from '../SideBarComponent/SideBar';
import { Card } from '@/app/utils/CardHomepage';

const BAHomePage = () => {
  const router = useRouter();

  const cards = [
    {
      title: 'Liste des incidents',
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      onClick: () => router.push('/view/incidents'),
      description: 'Consulter tous les incidents déclarés.',
    },
    {
      title: 'Affecter un incident',
      icon: <ClipboardCheck className="w-6 h-6 text-blue-600" />,
      onClick: () => router.push('/view/assign-incident'),
      description: 'Assigner un incident à un développeur.',
    },
    {
      title: 'Disponibilité des développeurs',
      icon: <UserCheck className="w-6 h-6 text-green-600" />,
      onClick: () => router.push('/view/dev-disponibility'),
      description: 'Voir les développeurs disponibles.',
    }
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
                <Card
                  icon={<AlertTriangle className="w-6 h-6 text-red-600" />}
                  title="Incidents déclarés"
                  description="8"
                  bgColor="bg-red-100"
                  onClick={() => {}}
                />
                <Card
                  icon={
                    <svg className="w-6 h-6 text-yellow-600 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                  }
                  title="Incidents en cours"
                  description="5"
                  bgColor="bg-yellow-100"
                  onClick={() => {}}
                />
                <Card
                  icon={
                    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  }
                  title="Incidents résolus"
                  description="3"
                  bgColor="bg-green-100"
                  onClick={() => {}}
                />
              </div>
            </div>

            {/* FONCTIONNALITÉS */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Fonctionnalités</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {cards.map((card, index) => (
                  <Card
                    key={index}
                    icon={card.icon}
                    title={card.title}
                    description={card.description}
                    onClick={card.onClick}
                  />
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