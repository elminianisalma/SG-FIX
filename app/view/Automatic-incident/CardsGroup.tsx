// src/app/automatic-incident/CardsGroup.tsx
import React from 'react';
import type { Incident, EditableIncident } from './AutomaticIncidentsPage';

type Props = {
  data: Incident[];
  editingIncident: EditableIncident | null;
  onValidate:     (id: number) => void;
  onArchive:      (id: number) => void;
  onEdit:         (inc: Incident) => void;
  onSaveEdit:     () => void;
  onCancelEdit:   () => void;
  onChange:       (field: keyof EditableIncident, value: string) => void;
};

export default function CardsGroup({
  data,
  editingIncident,
  onValidate,
  onArchive,
  onEdit,
  onSaveEdit,
  onCancelEdit,
  onChange
}: Props) {
  if (data.length === 0) {
    return <p className="text-center text-gray-500">Aucun incident correspondant</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map(i => (
        <div key={i.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition relative">
          {editingIncident?.id === i.id ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editingIncident.titre}
                onChange={e => onChange('titre', e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                value={editingIncident.description}
                onChange={e => onChange('description', e.target.value)}
                className="w-full p-2 border rounded"
              />
              <select
                value={editingIncident.priorite}
                onChange={e => onChange('priorite', e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="HAUTE">Haute</option>
                <option value="MOYENNE">Moyenne</option>
                <option value="BASSE">Basse</option>
              </select>
              <input
                type="text"
                value={editingIncident.tags}
                onChange={e => onChange('tags', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Tags (séparés par des virgules)"
              />
              <div className="flex justify-end gap-2">
                <button onClick={onSaveEdit} className="text-green-600">Enregistrer</button>
                <button onClick={onCancelEdit} className="text-gray-600">Annuler</button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold mb-2">{i.titre}</h2>
              <p className="text-sm text-gray-600 mb-2">{i.description}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="px-2 py-1 text-xs bg-gray-100 rounded">{i.gravite}</span>
                <span className="px-2 py-1 text-xs bg-gray-100 rounded">{i.priorite}</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Déclaré :{' '}
                {new Date(i.dateDeclaration).toLocaleString('fr-FR', {
                  dateStyle: 'medium',
                  timeStyle: 'short'
                })}
              </p>
              <div className="flex justify-end gap-2 text-sm">
                {!i.estValide && (
                  <button onClick={() => onValidate(i.id)} className="text-green-600">
                    Valider
                  </button>
                )}
                <button onClick={() => onArchive(i.id)} className="text-red-600">Archiver</button>
                <button onClick={() => onEdit(i)} className="text-blue-600">Modifier</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
