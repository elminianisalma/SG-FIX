// Applique les classes Tailwind selon le statut de l'incident
export const getStatusStyle = (status: string): string => {
    switch (status) {
        case 'Déclaré':
            return 'bg-yellow-100 text-yellow-800 border border-yellow-300';
        case 'Affecté':
            return 'bg-blue-100 text-blue-800 border border-blue-300';
        case 'En cours d’analyse':
            return 'bg-purple-100 text-purple-800 border border-purple-300';
        case 'Transféré':
            return 'bg-orange-100 text-orange-800 border border-orange-300';
        case 'Résolu':
            return 'bg-green-100 text-green-800 border border-green-300';
        default:
            return 'bg-gray-100 text-gray-600 border border-gray-300';
    }
};

// Applique les classes Tailwind selon la priorité de l'incident
export const getPriorityStyle = (priority: string): string => {
    switch (priority) {
        case 'FAIBLE':
            return 'bg-green-100 text-green-700 border border-green-300';
        case 'MOYENNE':
            return 'bg-yellow-100 text-yellow-700 border border-yellow-300';
        case 'ÉLEVÉE':
            return 'bg-orange-100 text-orange-700 border border-orange-300';
        case 'CRITIQUE':
            return 'bg-red-100 text-red-700 border border-red-300';
        default:
            return 'bg-gray-100 text-gray-700 border border-gray-300';
    }
};
