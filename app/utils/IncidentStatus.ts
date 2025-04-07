export enum IncidentStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  RESOLVED = "RESOLVED",
  NEW = "NEW",
  IN_PROGRESS = "IN_PROGRESS",
}
export const getStatusStyle = (status: IncidentStatus): string => {
  switch (status) {
    case IncidentStatus.PENDING: return 'bg-yellow-100 text-yellow-600 border border-yellow-500';
    case IncidentStatus.COMPLETED: return 'bg-green-100 text-green-600 border border-green-500';
    case IncidentStatus.CANCELLED: return 'bg-red-100 text-red-600 border border-red-500';
    case IncidentStatus.RESOLVED: return 'bg-blue-100 text-blue-600 border border-blue-500';
    case IncidentStatus.NEW: return 'bg-gray-100 text-gray-600 border border-gray-500';
    case IncidentStatus.IN_PROGRESS: return 'bg-purple-100 text-purple-600 border border-purple-500';
    default: return 'bg-gray-100 text-gray-600 border border-gray-500';
  }
};
