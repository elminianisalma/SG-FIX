export enum IncidentPriority {
    LOW = "FAIBLE",
    MEDIUM = "MOYEN",
    HIGH = "ELEVE",
    CRITICAL = "CRITIQUE",
  }

  
export const getPriorityStyle = (priority: IncidentPriority): string => {
    switch (priority) {
      case IncidentPriority.LOW: return 'bg-green-100 text-green-600 border border-green-500';
      case IncidentPriority.MEDIUM: return 'bg-yellow-100 text-yellow-600 border border-yellow-500';
      case IncidentPriority.HIGH: return 'bg-red-100 text-red-600 border border-red-500';
      case IncidentPriority.CRITICAL: return 'bg-red-100 text-red-600 border border-red-500';
      default: return 'bg-gray-100 text-gray-600 border border-gray-500';
    }
  };