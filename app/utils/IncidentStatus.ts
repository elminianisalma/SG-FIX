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
      return 'bg-amber-50 text-amber-700 border border-amber-300'; // doux jaune pastel
    case IncidentStatus.AFFECTE:
      return 'bg-blue-50 text-blue-700 border border-blue-300'; // bleu clair pastel
  case IncidentStatus.PRIS_EN_CHARGE:
  return 'bg-orange-50 text-orange-700 border border-orange-300'; // orange pastel
// rose doux
    case IncidentStatus.TRANSFERE:
      return 'bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-300'; // violet doux
    case IncidentStatus.RESOLU:
      return 'bg-emerald-50 text-emerald-700 border border-emerald-300'; // vert pastel
    default:
      return 'bg-gray-50 text-gray-700 border border-gray-300'; // neutre
  }
};
