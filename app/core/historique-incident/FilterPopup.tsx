'use client';

import React, { useState } from 'react';

interface FilterPopupProps {
    onApply: (filters: { status?: string }) => void;
    onClose: () => void;
    availableStatuses: string[];
}

export default function FilterPopup({ onApply, onClose, availableStatuses }: FilterPopupProps) {
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

    const handleApply = () => {
        const filters: { status?: string } = {};
        if (selectedStatus) filters.status = selectedStatus;
        onApply(filters);
        onClose();
    };

    const statusLabels: Record<string, string> = {
        DECLARED: 'Déclaré',
        ASSIGNED: 'Affecté',
        IN_ANALYSIS: 'En cours d’analyse',
        TRANSFERRED: 'Transféré',
        RESOLVED: 'Résolu',
    };

    return (
        <div className="text-sm w-[360px] bg-white bg-opacity-95 p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Filtrer les incidents</h2>

            <div className="mb-4">
                <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">
                    Statut :
                </label>
                <select
                    id="status"
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                    value={selectedStatus || ''}
                    onChange={(e) => setSelectedStatus(e.target.value === '' ? null : e.target.value)}
                >
                    <option value="">Tous les statuts</option>
                    {availableStatuses.map((status) => (
                        <option key={status} value={status}>
                            {statusLabels[status] || status}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex justify-end gap-3">
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                    Fermer
                </button>
                <button
                    onClick={handleApply}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Appliquer les filtres
                </button>
            </div>
        </div>
    );
}
