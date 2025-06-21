import { IncidentDetail } from "@/app/models/IncidentDetail";
import GlobalSearch from "./SearchIncident";

export default function Page() {
  const handleSearchResult = (incidents:IncidentDetail[]) => {
    console.log("Résultats de la recherche :", incidents);
    // Ajoutez ici la logique pour afficher les résultats (ex. une table ou liste)
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Recherche d'Incidents</h1>
      <GlobalSearch onSearchResult={handleSearchResult} />
      {/* Ajoutez un composant pour afficher les résultats si nécessaire */}
    </div>
  );
}