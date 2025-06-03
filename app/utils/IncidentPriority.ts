export enum IncidentPriority {
    FAIBLE = "FAIBLE",
    MOYENNE = "MOYENNE",
    ELEVEE = "ELEVEE",
    CRITIQUE = "CRITIQUE",
}
export const getPriorityStyle = (priority?: IncidentPriority): string => {
  switch (priority) {
    case IncidentPriority.FAIBLE:
      return "bg-green-100 text-green-600 border border-green-500";
    case IncidentPriority.MOYENNE:
      return "bg-yellow-100 text-yellow-600 border border-yellow-500";
    case IncidentPriority.ELEVEE:
      return "bg-red-100 text-red-600 border border-orange-500";
    case IncidentPriority.CRITIQUE:
      return "bg-red-200 text-red-700 border border-red-500";
    default:
      return "bg-gray-100 text-gray-600 border border-gray-500";
  }
};

