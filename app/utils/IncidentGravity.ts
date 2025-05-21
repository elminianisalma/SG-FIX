export enum IncidentGravity {
    MINEUR = "Mineur",
    MAJEUR = "Majeur",
    CRITIQUE = "Critique",
}




export const getGravityStyle = (impact: IncidentGravity): string => {
  switch (impact) {
    case IncidentGravity.MINEUR:
      return "bg-green-100 text-green-600 border border-green-500";
    case IncidentGravity.MAJEUR:
      return "bg-yellow-100 text-yellow-600 border border-yellow-500";
    case IncidentGravity.CRITIQUE:
      return "bg-orange-100 text-orange-600 border border-orange-500";
   
    default:
      return "bg-gray-100 text-gray-600 border border-gray-500";
  }
};



