export enum IncidentGravity {
    MINEUR = "MINEUR",
    MAJEUR = "MAJEUR",
    CRITIQUE = "CRITIQUE",
}




export const getGravityStyle = (impact: IncidentGravity): string => {
  switch (impact) {
    case IncidentGravity.MINEUR:
      return "bg-green-100 text-green-600 border border-green-500";
    case IncidentGravity.MAJEUR:
      return "bg-red-100 text-red-600 border border-red-500";
    case IncidentGravity.CRITIQUE:
      return "bg-orange-100 text-orange-600 border border-orange-500";
   
    default:
      return "bg-gray-100 text-gray-600 border border-gray-500";
  }
};



