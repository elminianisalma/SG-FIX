"use client";
import { useState } from "react";
import Sidebar from "@/app/core/SideBar/SideBar";
import AssignIncident from "@/app/core/create-incident/AssignIncident";
import IncidentHeader from "./IncidentHeader";
import IncidentQuestions from "./IncidentQuestions";
import IncidentSummaryPopup from "./IncidentSummaryPopup";

interface Question {
    id: string;
    text: string;
    type: "text" | "textarea" | "radio" | "select" | "file";
    placeholder?: string;
    options?: string[];
}

const IncidentForm = () => {
    const [étape, setÉtape] = useState(1);
    const [réponses, setRéponses] = useState<{ [key: string]: string }>({});
    const [sla, setSla] = useState<string>("");
    const [afficherPopup, setAfficherPopup] = useState(false);
    const [dateRapport] = useState(new Date().toLocaleString());

    const gérerChangementRéponse = (id: string, valeur: string) => {
        setRéponses((précédent) => {
            const misÀJour = { ...précédent, [id]: valeur };
            if (id === "severity") {
                misÀJour["sla"] = valeur === "High" ? "2 heures" : valeur === "Medium" ? "8 heures" : "24 heures";
                setSla(misÀJour["sla"]);
            }
            return misÀJour;
        });
    };

    const assignerIncident = () => {
        alert(`Incident assigné à ${réponses.assignee || "Inconnu"} avec SLA : ${sla}`);
    };

    const questionsIncident: Question[] = [
        { id: "ClientName", text: "Quel client êtes-vous ?", type: "select", options: ["Bill Payment", "Bankup", "Interop", "OpenR"] },
        { id: "environment", text: "Quel environnement est affecté ?", type: "radio", options: ["Dev", "HF", "HT"] },
        { id: "severity", text: "Quel est le niveau de gravité de l’incident ?", type: "radio", options: ["Low", "Medium", "High"] },
        { id: "shortDescription", text: "Brève description", type: "text", placeholder: "Résumez brièvement le problème..." },
        { id: "details", text: "Description détaillée", type: "textarea", placeholder: "Expliquez le problème en détail..." },
        { id: "attachments", text: "Ajouter des pièces jointes si nécessaire", type: "file" },
    ];

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />
            <div className="flex-1 flex justify-center items-start p-10">
                <div className="w-full max-w-5xl space-y-6">
                    <IncidentHeader step={étape} />

                    <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-8">
                        {étape === 2 ? (
                            <>
                                <AssignIncident
                                    answers={réponses}
                                    onAnswerChange={gérerChangementRéponse}
                                    onAssign={assignerIncident}
                                />
                                <div className="mt-6 text-center">
                                    <button
                                        onClick={() => setAfficherPopup(true)}
                                        className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition"
                                    >
                                        ✅ Terminer
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <IncidentQuestions
                                    questions={questionsIncident}
                                    answers={réponses}
                                    onAnswerChange={gérerChangementRéponse}
                                />
                                {sla && (
                                    <div className="text-right text-sm text-gray-600 font-medium mt-4">
                                        ⏱️ SLA attribué : <span className="text-black font-bold">{sla}</span>
                                    </div>
                                )}
                            </>
                        )}

                        <div className="flex justify-between mt-8">
                            {étape > 1 && (
                                <button
                                    onClick={() => setÉtape(étape - 1)}
                                    className="bg-gray-200 px-6 py-2 rounded-lg shadow hover:bg-gray-300 transition"
                                >
                                    ← Retour
                                </button>
                            )}
                            {étape < 2 && (
                                <button
                                    onClick={() => setÉtape(étape + 1)}
                                    className="ml-auto bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-600 transition"
                                >
                                    Suivant →
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <IncidentSummaryPopup
                visible={afficherPopup}
                onClose={() => setAfficherPopup(false)}
                answers={réponses}
                sla={sla}
                reportDate={dateRapport}
            />
        </div>
    );
};

export default IncidentForm;
