import SearchPeople from "@/app/view/create-incident/SearchPeople";

interface AssignIncidentProps {
  incidentId: BigInt; // il faut un incidentId pour SearchPeople
  answers: { [key: string]: string };
  onAnswerChange: (questionId: string, value: string) => void;
  onAssign: (incidentId: BigInt, personName: string) => void; // adapter signature
  onClose: () => void;
}

const AssignIncident: React.FC<AssignIncidentProps> = ({
  incidentId,
  answers,
  onAnswerChange,
  onClose,
}) => {
  const handleAssign = (incidentId: BigInt, personName: string) => {
    console.log("Personne sélectionnée :", personName); // 👈 Affichage dans la console
    // Tu peux aussi faire autre chose ici, comme stocker dans un state ou appeler une API
  };

  return (
    <>
      <SearchPeople
        incidentId={incidentId}
        onAssign={handleAssign}
        onClose={onClose}
      />
    </>
  );
};

export default AssignIncident;
