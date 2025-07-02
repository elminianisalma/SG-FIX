// src/app/view/Automatic-incident/AutoIncidentCard.tsx
'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';
import type { Incident, EditableIncident } from './AutomaticIncidentsPage';

export type AutoIncidentCardProps = {
  incident: Incident;
  editingIncident: EditableIncident | null;
  handleValidate: (id: number) => void;
  handleArchive:  (id: number) => void;
  handleEdit:     (inc: Incident) => void;
  handleSaveEdit: () => void;
  handleCancelEdit: () => void;
  handleEditChange: (field: keyof EditableIncident, value: string) => void;
};

export default function AutoIncidentCard({
  incident,
  editingIncident,
  handleValidate,
  handleArchive,
  handleEdit,
  handleSaveEdit,
  handleCancelEdit,
  handleEditChange
}: AutoIncidentCardProps) {
  const isEditing = editingIncident?.id === incident.id;

  return (
    <div className="relative bg-white rounded-lg shadow p-4 hover:shadow-md transition">
      {/* Badge “Non affecté” */}
      {incident.estValide && (
        <div className="absolute top-2 right-2 flex items-center bg-green-100 text-green-800 px-2 py-1 text-xs font-semibold rounded-full">
          <CheckCircle size={14} className="mr-1" />
          Non affecté
        </div>
      )}

      <span className="bg-gray-100 text-gray-600 px-2 py-1 text-xs font-medium rounded-full mb-2 inline-block">
        Auto
      </span>

      {isEditing ? (
        <div className="space-y-3">
          {/* Formulaire d’édition */}
          <input
            type="text"
            value={editingIncident.titre}
            onChange={e => handleEditChange('titre', e.target.value)}
            placeholder="Titre"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={editingIncident.description}
            onChange={e => handleEditChange('description', e.target.value)}
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <select
            value={editingIncident.priorite}
            onChange={e => handleEditChange('priorite', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="HAUTE">Haute</option>
            <option value="MOYENNE">Moyenne</option>
            <option value="BASSE">Basse</option>
          </select>
          <input
            type="text"
            value={editingIncident.tags}
            onChange={e => handleEditChange('tags', e.target.value)}
            placeholder="Tags (séparés par des virgules)"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleSaveEdit}
              className="px-3 py-1 bg-green-50 text-green-600 border border-green-200 rounded-md hover:bg-green-100 transition"
            >
              Enregistrer
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-3 py-1 bg-gray-50 text-gray-600 border border-gray-200 rounded-md hover:bg-gray-100 transition"
            >
              Annuler
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Affichage normal */}
          <h2 className="text-lg font-semibold mb-2">{incident.titre}</h2>
          <p className="text-sm text-gray-600 mb-2">{incident.description}</p>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="px-2 py-1 text-xs bg-gray-100 rounded">{incident.gravite}</span>
            <span className="px-2 py-1 text-xs bg-gray-100 rounded">{incident.priorite}</span>
          </div>
          <p className="text-sm text-gray-500 mb-2">
            Déclaré :{' '}
            {new Date(incident.dateDeclaration).toLocaleString('fr-FR', {
              dateStyle: 'medium',
              timeStyle: 'short'
            })}
          </p>

          {/* Rendu des tags */}
          {incident.tags && incident.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {incident.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-200 text-gray-700 px-2 py-1 text-xs font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Boutons d’action */}
          <div className="flex justify-end gap-2">
            {!incident.estValide && (
              <button
                onClick={() => handleValidate(incident.id)}
                className="border border-green-600 text-green-600 rounded-md px-3 py-1 hover:bg-green-50 transition"
              >
                Valider
              </button>
            )}
            <button
              onClick={() => handleArchive(incident.id)}
              className="border border-red-600 text-red-600 rounded-md px-3 py-1 hover:bg-red-50 transition"
            >
              Archiver
            </button>
            <button
              onClick={() => handleEdit(incident)}
              className="border border-blue-600 text-blue-600 rounded-md px-3 py-1 hover:bg-blue-50 transition"
            >
              Modifier
            </button>
          </div>
        </>
      )}
    </div>
  );
}
