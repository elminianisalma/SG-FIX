'use client';

import HeaderBar from '@/app/view/components/HeaderBar';
import { useRouter } from 'next/navigation';
import {
  PlusCircle,
  Clock,
  CheckCircle,
  AlertTriangle,
  Timer,
  History,
  Layers,
} from 'lucide-react';
import Sidebar from '../SideBarComponent/SideBar';

export default function UserHomePage() {
  const router = useRouter();

  const cards = [
    {
      title: 'Créer un incident',
      description: 'Signalez un nouveau problème.',
      icon: <PlusCircle className="h-8 w-8 text-red-500" />,
      onClick: () => router.push('/view/create-incident'),
    },
    {
      title: 'Incidents en cours',
      description: 'Consultez vos incidents ouverts.',
      icon: <Clock className="h-8 w-8 text-gray-600" />,
      onClick: () => router.push('/view/incident-en-cours'),
    },
    {
      title: 'Historique incidents',
      description: 'Vos incidents résolus.',
      icon: <CheckCircle className="h-8 w-8 text-green-600" />,
      onClick: () => router.push('/view/historique-incident'),
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderBar />

        <main className="flex-1 flex flex-col items-center justify-start p-10">
          <h1 className="text-4xl font-extrabold mb-10 text-gray-800 text-center">
            Bienvenue sur <span className="text-red-600">SG-FIX</span> !
          </h1>

          {/* KPI Section */}
          <section className="w-full max-w-6xl mb-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">KPI du jour</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Incidents déclarés */}
              <KPIBlock
                icon={<AlertTriangle className="w-6 h-6 text-red-600" />}
                bgColor="bg-red-100"
                value="8"
                label="Incidents déclarés"
              />

              {/* Incidents en cours */}
              <KPIBlock
                icon={
                  <svg className="w-6 h-6 text-yellow-600 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                }
                bgColor="bg-yellow-100"
                value="5"
                label="Incidents en cours"
              />

              {/* Incidents résolus */}
              <KPIBlock
                icon={
                  <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                }
                bgColor="bg-green-100"
                value="3"
                label="Incidents résolus"
              />

              {/* Temps moyen de résolution */}
              <KPIBlock
                icon={<Timer className="w-6 h-6 text-blue-600" />}
                bgColor="bg-blue-100"
                value="2j 4h"
                label="Temps moyen de résolution"
              />

             {/* Taux de résolution */}
                <KPIBlock
                icon={<CheckCircle className="w-6 h-6 text-indigo-600" />}
                bgColor="bg-indigo-100"
                value="75%"
                label="Taux de résolution des incidents"
                />


              {/* Catégorie fréquente */}
              <KPIBlock
                icon={<Layers className="w-6 h-6 text-orange-600" />}
                bgColor="bg-orange-100"
                value="Api messaging"
                label="Api la plus signalée"
              />
            </div>
          </section>

          {/* Features Section */}
          <section className="w-full max-w-6xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Fonctionnalités</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {cards.map((card, index) => (
                <div
                  key={index}
                  onClick={card.onClick}
                  className="cursor-pointer bg-white border border-gray-200 rounded-2xl p-6 shadow hover:shadow-lg transition duration-200 flex flex-col justify-between min-h-[160px]"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gray-100 rounded-full">{card.icon}</div>
                    <p className="text-lg font-semibold text-gray-900">{card.title}</p>
                  </div>
                  <p className="text-sm text-gray-600 ml-1">{card.description}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

// ✅ Composant réutilisable pour chaque KPI
function KPIBlock({ icon, bgColor, value, label }: { icon: React.ReactNode; bgColor: string; value: string; label: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 flex items-center min-h-[110px]">
      <div className={`p-4 ${bgColor} rounded-full mr-4`}>
        {icon}
      </div>
      <div>
        <p className="text-xl font-bold text-gray-900">{value}</p>
        <p className="text-base text-gray-600">{label}</p>
      </div>
    </div>
  );
}
