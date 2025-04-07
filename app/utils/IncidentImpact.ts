export enum IncidentImpact {
    LOW = "Low",
    MEDIUM = "Medium",
    HIGH = "High",
    CRITICAL = "Critical",
  }
  export const getImpactStyle = (impact: IncidentImpact): string => {
    switch (impact) {
      case IncidentImpact.LOW: return 'bg-green-100 text-green-600 border border-green-500';
      case IncidentImpact.MEDIUM: return 'bg-yellow-100 text-yellow-600 border border-yellow-500';
      case IncidentImpact.HIGH: return 'bg-orange-100 text-orange-600 border border-orange-500';
      case IncidentImpact.CRITICAL: return 'bg-red-100 text-red-600 border border-red-500';
      
    }
  };