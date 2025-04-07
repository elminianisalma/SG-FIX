export enum IncidentUrgency {
    LOW = "Low",
    MEDIUM = "Medium",
    HIGH = "High",
    IMMEDIATE = "Immediate",
  }
  export const getUrgencyStyle = (urgency: IncidentUrgency): string => {
    switch (urgency) {
      case IncidentUrgency.LOW: return 'bg-green-100 text-green-600 border border-green-500';
      case IncidentUrgency.MEDIUM: return 'bg-yellow-100 text-yellow-600 border border-yellow-500';
      case IncidentUrgency.HIGH: return 'bg-orange-100 text-orange-600 border border-orange-500';
      case IncidentUrgency.IMMEDIATE: return 'bg-red-100 text-red-600 border border-red-500';
      default: return 'bg-gray-100 text-gray-600 border border-gray-500';
    }
  };