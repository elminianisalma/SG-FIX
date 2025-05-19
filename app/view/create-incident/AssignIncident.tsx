import SearchPeople from "@/app/view/create-incident/SearchPeople";

interface AssignIncidentProps {
  answers: { [key: string]: string };
  onAnswerChange: (questionId: string, value: string) => void;
  onAssign: () => void;
}

const AssignIncident: React.FC<AssignIncidentProps> = ({ answers, onAnswerChange, onAssign }) => {
  return (
    <>
      <SearchPeople
        onAssign={onAssign}
        onClose={() => {}}  // Ici fonction vide ou fonction de fermeture réelle
        // Si SearchPeople doit utiliser answers et onAnswerChange, tu peux les passer ici
        // answers={answers}
        // onAnswerChange={onAnswerChange}
      />
    </>
  );
};

export default AssignIncident;
