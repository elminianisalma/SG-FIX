interface IncidentSummaryPopupProps {
    visible: boolean;
    onClose: () => void;
    answers: { [key: string]: string };
    sla: string;
    reportDate: string;
}

const IncidentSummaryPopup = ({ visible, onClose, answers, sla, reportDate }: IncidentSummaryPopupProps) => {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-12 animate-fade-in-up w-[90%] max-w-5xl">
                <h2 style={{ fontSize: '2rem' }} className="font-bold mb-8 text-center text-green-600">📋 Incident Report Summary</h2>
                <ul style={{ fontSize: '1.125rem' }} className="space-y-4 text-gray-700">
                    <li><strong>📅 Date de déclaration :</strong> {reportDate}</li>
                    <li><strong>👤 Client :</strong> {answers.ClientName}</li>
                    <li><strong>🌐 Environnement :</strong> {answers.environment}</li>
                    <li><strong>🔥 Impact :</strong> {answers.severity}</li>
                    <li><strong>📌 Priorité (SLA) :</strong> {sla}</li>
                    <li><strong>📝 Description :</strong> {answers.shortDescription}</li>
                    <li><strong>📖 Détails :</strong> {answers.details}</li>
                    <li><strong>👥 Personne affectée :</strong> {answers.assignee || "Non précisé"}</li>
                </ul>
                <div className="text-center mt-10">
                    <button onClick={onClose} className="bg-red-500 text-white px-10 py-4 rounded-lg shadow hover:bg-red-600">
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IncidentSummaryPopup;
