'use client';

import React from 'react';
import HeaderBar from '@/app/core/components/HeaderBar';
import {
    BarChart2,
    Users,
    AlertTriangle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Sidebar from '../SideBar/Sidebar';

const AdminHomePage = () => {
    const router = useRouter();

    const cards = [
        {
            title: "Tous les incidents",
            icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
            onClick: () => router.push("/core/incident-list"),
            description: "Affichage de tous les incidents signalés.",
        },
        {
            title: "Utilisateurs",
            icon: <Users className="w-6 h-6 text-blue-500" />,
            onClick: () => router.push("/core/admin-roles"),
            description: "Gérer les comptes et les rôles des utilisateurs.",
        },
        {
            title: "Tableau de bord",
            icon: <BarChart2 className="w-6 h-6 text-green-600" />,
            onClick: () => router.push("/core/Dashboards"),
            description: "Visualiser les statistiques globales.",
        },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <HeaderBar />

                <main className="flex justify-center items-center p-6 sm:p-10 h-full">
                    <div className="max-w-5xl w-full max-h-[calc(100vh-80px)] overflow-auto">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                            Bienvenue sur l’espace Admin SG-FIX
                        </h1>

                        {/* KPI DU JOUR */}
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">KPI du jour</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                <div className="bg-white p-6 rounded-xl shadow border border-gray-200 flex items-center gap-4">
                                    <div className="p-3 bg-red-100 rounded-full">
                                        <AlertTriangle className="w-6 h-6 text-red-600" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold text-gray-800">8</p>
                                        <p className="text-sm text-gray-500">Incidents déclarés</p>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow border border-gray-200 flex items-center gap-4">
                                    <div className="p-3 bg-yellow-100 rounded-full">
                                        <svg className="w-6 h-6 text-yellow-600 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor"
                                                  d="M4 12a8 8 0 018-8v8H4z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold text-gray-800">5</p>
                                        <p className="text-sm text-gray-500">Incidents en cours</p>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow border border-gray-200 flex items-center gap-4">
                                    <div className="p-3 bg-green-100 rounded-full">
                                        <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold text-gray-800">3</p>
                                        <p className="text-sm text-gray-500">Incidents résolus</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FONCTIONNALITÉS RAPIDES */}
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Fonctionnalités rapides</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {cards.map((card, index) => (
                                    <div
                                        key={index}
                                        onClick={card.onClick}
                                        className="cursor-pointer bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-md transition duration-200 flex flex-col justify-between"
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="p-3 bg-gray-100 rounded-full">
                                                {card.icon}
                                            </div>
                                            <p className="text-lg font-semibold text-gray-800">
                                                {card.title}
                                            </p>
                                        </div>
                                        <p className="text-sm text-gray-500">{card.description}</p>
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

export default AdminHomePage;