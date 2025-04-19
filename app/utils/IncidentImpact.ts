export enum IncidentImpact {
    LOW = "FAIBLE",
    MEDIUM = "MOYEN",
    HIGH = "ÉLEVÉ",
    CRITICAL = "CRITIQUE",
  }
  export const getImpactStyle = (impact: IncidentImpact): string => {
    switch (impact) {
      case IncidentImpact.LOW: return 'bg-green-100 text-green-600 border border-green-500';
      case IncidentImpact.MEDIUM: return 'bg-yellow-100 text-yellow-600 border border-yellow-500';
      case IncidentImpact.HIGH: return 'bg-red-100 text-red-600 border border-red-500';
      case IncidentImpact.CRITICAL:return 'bg-red-500 text-white border border-red-700'; // Utilisation d'un rouge plus foncé pour CRITICAL


    }
  };