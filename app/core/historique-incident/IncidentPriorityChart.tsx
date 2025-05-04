'use client';

import React from 'react';

interface Props {
    data: { [priority: string]: number };
}

const priorityColors: { [key: string]: string } = {
    CRITIQUE: 'bg-red-500',
    HAUTE: 'bg-orange-400',
    MOYENNE: 'bg-yellow-300',
    BASSE: 'bg-green-400',
};

const IncidentPriorityChart = ({ data }: Props) => {
    const total = Object.values(data).reduce((sum, val) => sum + val, 0);

    return (
        <div className="bg-white p-6 rounded-xl shadow space-y-4 w-full">
            <h3 className="text-lg font-semibold text-gray-800 text-center">
                Répartition des incidents par priorité
            </h3>

            <div className="space-y-3">
                {Object.entries(data).map(([priority, count]) => {
                    const pourcentage = total ? Math.round((count / total) * 100) : 0;

                    return (
                        <div key={priority}>
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>{priority}</span>
                                <span>
                  {count} ({pourcentage}%)
                </span>
                            </div>
                            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className={`${
                                        priorityColors[priority] || 'bg-gray-400'
                                    } h-full transition-all duration-500`}
                                    style={{ width: `${pourcentage}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default IncidentPriorityChart;