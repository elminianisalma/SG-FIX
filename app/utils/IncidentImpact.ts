export enum IncidentImpact {
    FAIBLE = "Faible",
    MOYEN = "Moyen",
    ELEVE = "Élevé",
    CRITIQUE = "Critique",
}

export const getImpactStyle = (impact: IncidentImpact): string => {
    switch (impact) {
        case IncidentImpact.FAIBLE:
            return 'bg-green-100 text-green-600 border border-green-500';
        case IncidentImpact.MOYEN:
            return 'bg-yellow-100 text-yellow-600 border border-yellow-500';
        case IncidentImpact.ELEVE:
            return 'bg-orange-100 text-orange-600 border border-orange-500';
        case IncidentImpact.CRITIQUE:
            return 'bg-red-100 text-red-600 border border-red-500';
        default:
            return 'bg-gray-100 text-gray-600 border border-gray-500';
    }
};
