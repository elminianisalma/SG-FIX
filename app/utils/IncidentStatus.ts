export enum IncidentStatus {
  SOUMIS = "SOUMIS",
  AFFECTE = "AFFECTE",
  PRIS_EN_CHARGE = "PRIS_EN_CHARGE",
  TRANSFERE = "TRANSFERE",
  RESOLU = "RESOLU",
}

export const getStatusStyle = (status: IncidentStatus): string => {
  switch (status) {
    case IncidentStatus.SOUMIS:
      return 'bg-yellow-100 text-yellow-600 border border-yellow-500';
    case IncidentStatus.AFFECTE:
      return 'bg-blue-100 text-blue-600 border border-blue-500';
    case IncidentStatus.PRIS_EN_CHARGE:
      return 'bg-pink-100 text-pink-600 border border-purple-500';
    case IncidentStatus.TRANSFERE:
      return 'bg-pink-100 text-pink-600 border border-pink-500';
    case IncidentStatus.RESOLU:
      return 'bg-green-100 text-green-600 border border-green-500';
    default:
      return 'bg-gray-100 text-gray-600 border border-gray-500';
  }
};
