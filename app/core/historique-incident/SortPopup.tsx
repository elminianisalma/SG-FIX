'use client';

import React from 'react';

interface SortPopupProps {
    onApply: (ordre: 'asc' | 'desc') => void;
    onClose: () => void;
}

export default function SortPopup({ onApply, onClose }: SortPopupProps) {
    if (typeof window === 'undefined') return null;

    return (
        <div className="text-sm w-[360px] bg-white bg-opacity-95 p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Trier par priorité</h2>

            <div className="flex flex-col gap-3">
                <button
                    onClick={() => {
                        onApply('asc');
                        onClose();
                    }}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                    Priorité croissante
                </button>

                <button
                    onClick={() => {
                        onApply('desc');
                        onClose();
                    }}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                    Priorité décroissante
                </button>
            </div>
        </div>
    );
}
