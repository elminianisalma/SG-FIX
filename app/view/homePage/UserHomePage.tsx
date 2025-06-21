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
import { Card } from '@/app/utils/CardHomepage';

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
          </section>

          {/* Features Section */}
          <section className="w-full max-w-6xl">
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
          </section>
        </main>
      </div>
    </div>
  );
}

// ✅ Composant réutilisable pour chaque carte (KPI et fonctionnalités)

