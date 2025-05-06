export enum IncidentUrgency {
    FAIBLE = "Faible",
    MOYENNE = "Moyenne",
    ÉLEVÉE = "Élevée",
    IMMÉDIATE = "Immédiate",
}

export const getUrgencyStyle = (urgency: IncidentUrgency): string => {
    switch (urgency) {
        case IncidentUrgency.FAIBLE:
            return 'bg-green-100 text-green-600 border border-green-500';
        case IncidentUrgency.MOYENNE:
            return 'bg-yellow-100 text-yellow-600 border border-yellow-500';
        case IncidentUrgency.ÉLEVÉE:
            return 'bg-orange-100 text-orange-600 border border-orange-500';
        case IncidentUrgency.IMMÉDIATE:
            return 'bg-red-100 text-red-600 border border-red-500';
        default:
            return 'bg-gray-100 text-gray-600 border border-gray-500';
    }
};
