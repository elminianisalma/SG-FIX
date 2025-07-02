// src/app/view/Automatic-incident/AutomaticIncidentsPage.tsx
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import HeaderBar           from '../components/HeaderBar';
import Sidebar from '../SideBarComponent/SideBar';
import IncidentFilters     from './IncidentFilters';
import AutoIncidentCard    from './AutoIncidentCard';
import IncidentPagination  from './IncidentPagination';

export interface Incident {
  id: number;
  titre: string;
  description: string;
  gravite: 'MAJEUR' | 'MODERE' | 'MINEUR';
  priorite: 'HAUTE' | 'MOYENNE' | 'BASSE';
  dateDeclaration: string;
  estValide?: boolean;
  tags?: string[];
}

export type EditableIncident = Omit<Incident, 'tags'> & { tags: string };

const INITIAL_INCIDENTS: Incident[] = [
  { id: 1, titre: 'Erreur Serveur Inactif', description: 'WARN: Serveur inactif détecté.', gravite: 'MAJEUR',  priorite: 'HAUTE',   dateDeclaration: '2025-06-23T14:18:06.510Z', tags: ['warn','serveur'] },
  { id: 2, titre: 'Déconnexion Base Données', description: 'ERROR: Base de données inaccessible.', gravite: 'MODERE', priorite: 'MOYENNE', dateDeclaration: '2025-06-22T09:15:00.000Z', tags: ['error','db'] },
  { id: 3, titre: 'Timeout API Externe', description: 'INFO: Délai dépassé sur API externe.', gravite: 'MINEUR', priorite: 'BASSE',   dateDeclaration: '2025-06-21T16:20:00.000Z', tags: ['info','api'] },
  { id: 4, titre: 'Opérations Timing Désactivé', description: 'WARN: OPERATIONS TIMING IS DISABLED', gravite: 'MODERE', priorite: 'MOYENNE', dateDeclaration: '2025-06-03T14:18:06.510Z', tags: ['warn','unibank','bridge'] },
  { id: 5, titre: 'Erreur Authentification', description: 'ERROR: Problème d’authentification détecté.', gravite: 'MAJEUR',  priorite: 'HAUTE',   dateDeclaration: '2025-06-19T11:10:00.000Z', tags: ['error','auth'] },
  { id: 6, titre: 'Quota Atteint', description: 'INFO: Limite de quota atteinte.', gravite: 'MINEUR',  priorite: 'BASSE',   dateDeclaration: '2025-06-18T13:00:00.000Z', tags: ['info','quota'] },
];

export default function AutomaticIncidentsPage() {
  const [search, setSearch]                   = useState<string>('');
  const [showFilters, setShowFilters]         = useState<boolean>(false);
  const [filterPrio, setFilterPrio]           = useState<'HAUTE'|'MOYENNE'|'BASSE'|''>('');
  const [filterDate, setFilterDate]           = useState<string>('');
  const [page, setPage]                       = useState<number>(1);
  const [incidents, setIncidents]             = useState<Incident[]>(INITIAL_INCIDENTS);
  const [editingIncident, setEditingIncident] = useState<EditableIncident|null>(null);
  const [isModelActive, setIsModelActive]     = useState<boolean>(true);
  const [toastMessage, setToastMessage]       = useState<string|null>(null);

  // Efface le toast après 3s
  useEffect(() => {
    if (!toastMessage) return;
    const t = setTimeout(() => setToastMessage(null), 3000);
    return () => clearTimeout(t);
  }, [toastMessage]);

  // Filtre + tri
  const filtered = useMemo<Incident[]>(() =>
    incidents
      .filter(i =>
        i.titre.toLowerCase().includes(search.toLowerCase()) &&
        (filterPrio === '' || i.priorite === filterPrio) &&
        (filterDate === '' || i.dateDeclaration.startsWith(filterDate))
      )
      .sort((a,b) => b.dateDeclaration.localeCompare(a.dateDeclaration))
  , [incidents, search, filterPrio, filterDate]);

  const perPage    = 5;
  const totalPages = Math.ceil(filtered.length / perPage);
  const pageData   = filtered.slice((page - 1)*perPage, page*perPage);

  // Handlers
  const handleValidate = (id: number) => {
    const inc = incidents.find(i => i.id === id);
    if (!inc) return;
    setIncidents(cs => cs.map(i => i.id===id ? { ...i, estValide: true } : i));
    setToastMessage(`L'incident "${inc.titre}" est désormais dans la liste des incidents non affectés`);
  };
  const handleArchive    = (id: number) => setIncidents(cs => cs.filter(i => i.id!==id));
  const handleEdit       = (inc: Incident) => setEditingIncident({ ...inc, tags: inc.tags?.join(', ') ?? '' });
  const handleSaveEdit   = () => {
    if (!editingIncident) return;
    const arr = editingIncident.tags.split(',').map(t => t.trim()).filter(Boolean);
    setIncidents(cs => cs.map(i => i.id===editingIncident.id ? { ...editingIncident, tags: arr } : i));
    setEditingIncident(null);
  };
  const handleCancelEdit = () => setEditingIncident(null);
  const handleEditChange = (f: keyof EditableIncident, v: string) => {
    if (!editingIncident) return;
    setEditingIncident({ ...editingIncident, [f]: v });
  };
  const handleToggleModel = async () => {
    await new Promise(r=>setTimeout(r,500));
    setIsModelActive(m => !m);
    setToastMessage(`Modèle ${isModelActive ? 'désactivé' : 'activé'}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <HeaderBar />

      <div className="flex flex-1">
        <aside className="hidden lg:block fixed top-0 left-0 h-full w-52 pt-16 z-20">
          <Sidebar />
        </aside>

        <main className="flex-1 ml-0 lg:ml-52 pt-16 p-6 overflow-auto">
          {/* Titre décalé de 2 cm à gauche */}
          <h1 className="text-2xl font-bold mb-6 text-center -ml-[2cm]">
            Incidents Automatiques
          </h1>

          <IncidentFilters
            search={search}
            setSearch={setSearch}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            filterPrio={filterPrio}
            setFilterPrio={setFilterPrio}
            filterDate={filterDate}
            setFilterDate={setFilterDate}
            isModelActive={isModelActive}
            handleToggleModel={handleToggleModel}
            toastMessage={toastMessage}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageData.map(i => (
              <AutoIncidentCard
                key={i.id}
                incident={i}
                editingIncident={editingIncident}
                handleValidate={handleValidate}
                handleArchive={handleArchive}
                handleEdit={handleEdit}
                handleSaveEdit={handleSaveEdit}
                handleCancelEdit={handleCancelEdit}
                handleEditChange={handleEditChange}
              />
            ))}
            {pageData.length === 0 && (
              <p className="col-span-full text-center text-gray-500">
                Aucun incident correspondant
              </p>
            )}
          </div>

          <IncidentPagination
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </main>
      </div>
    </div>
  );
}
