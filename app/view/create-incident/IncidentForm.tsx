"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import IncidentSummaryPopup from "@/app/view/create-incident/IncidentSummaryPopup";
import IncidentQuestions from "@/app/view/create-incident/IncidentQuestions";
import IncidentHeader from "@/app/view/create-incident/IncidentHeader";
import HeaderBar from "@/app/view/components/HeaderBar";
import Sidebar from "../SideBarComponent/SideBar";

interface Question {
    id: string;
    text: string;
    type: "text" | "textarea" | "radio" | "select" | "file" | "multitag";
    placeholder?: string;
    options?: string[];
}

const IncidentForm = () => {
    const router = useRouter();
    const [étape, setÉtape] = useState(1);
    const [réponses, setRéponses] = useState<{ [key: string]: string | string[] | FileList | null }>({});
    const [sla, setSla] = useState<string>("");
    const [priorité, setPriorité] = useState<string>("");
    const [afficherPopup, setAfficherPopup] = useState(false);
    const [champErreur, setChampErreur] = useState<string[]>([]);
    const [dateRapport] = useState(new Date().toLocaleString());

    const refs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const questionsIncident: Question[] = [
        {
            id: "ClientName",
            text: "Quel DU (Delivery Unit) est concerné par l’incident ?",
            type: "select",
            options: ["Bill Payment", "Bankup", "Interop", "OpenR", "Cockpit"]
        },
        {
            id: "environment",
            text: "Quel est l’environnement affecté ?",
            type: "radio",
            options: ["Dev", "HF", "HT", "Prod"]
        },
        {
            id: "impact",
            text: "Quel est l’effet ou les conséquences de l’incident ? (impact)",
            type: "radio",
            options: ["Haut", "Moyen", "Faible"]
        },
        {
            id: "urgence",
            text: "Niveau d'urgence de l’incident",
            type: "radio",
            options: ["Haute", "Moyenne", "Modérée"]
        },
        {
            id: "tags",
            text: "Quels tags correspondent à cet incident ?",
            type: "multitag",
            options: ["Bridge", "Transfert", "Elevy", "Account", "E-tax", "Guce"]
        },
        {
            id: "shortDescription",
            text: "Quel est l’objet principal de l’incident ?",
            type: "text",
            placeholder: "Exemple : Échec de l’authentification via SSO"
        },
        {
            id: "details",
            text: "Décrivez les détails techniques de l’incident",
            type: "textarea",
            placeholder: "Expliquez les étapes, erreurs rencontrées et conséquences fonctionnelles"
        },
        {
            id: "attachments",
            text: "Ajoutez les fichiers nécessaires (logs, captures d’écran, etc.)",
            type: "file"
        }
    ];

    const totalQuestions = questionsIncident.length;
    const answeredCount = questionsIncident.filter((q) => {
        const val = réponses[q.id];
        if (q.type === "file") {
            const fileList = val as FileList;
            return fileList && fileList.length > 0;
        }
        if (q.type === "multitag") {
            return (val as string[])?.length > 0;
        }
        return val && val !== "";
    }).length;

    const progress = Math.min(Math.round((answeredCount / totalQuestions) * 100), 100);

    const gérerChangementRéponse = (id: string, valeur: string | string[] | FileList | null) => {
        setRéponses((précédent) => ({ ...précédent, [id]: valeur }));
        setChampErreur((précédent) => précédent.filter((champ) => champ !== id));
    };

    useEffect(() => {
        const impact = réponses.impact as string;
        const urgence = réponses.urgence as string;

        if (impact && urgence) {
          const map: Record<string, string> = {
                "Haute-Haut": "P1 (Critique)",
                "Haute-Moyen": "P2 (Haute)",
                "Haute-Faible": "P3 (Modéré)",
                "Moyenne-Haut": "P2 (Haute)",
                "Moyenne-Moyen": "P3 (Modéré)",
                "Moyenne-Faible": "P4 (Basse)",
                "Modérée-Haut": "P3 (Modéré)",
                "Modérée-Moyen": "P4 (Basse)",
                "Modérée-Faible": "P4 (Basse)"
            };

            const nouvellePriorité = map[`${urgence}-${impact}`] || "Non défini";
            setPriorité(nouvellePriorité);

            const mapSla: { [key: string]: string } = {
                "P1 (Critique)": "2 heures",
                "P2 (Haute)": "4 heures",
                "P3 (Modéré)": "8 heures",
                "P4 (Basse)": "24 heures"
            };

            setSla(mapSla[nouvellePriorité] || "");
        }
    }, [réponses.impact, réponses.urgence]);

    const handleSubmitClick = () => {
        const champsManquants = questionsIncident.filter((q) => {
            const val = réponses[q.id];
            if (q.type === "file") {
                const fileList = val as FileList;
                return !fileList || fileList.length === 0;
            }
            if (q.type === "multitag") {
                return !(val as string[]) || (val as string[]).length === 0;
            }
            return !val || val === "";
        });

        if (champsManquants.length > 0) {
            const ids = champsManquants.map((q) => q.id);
            setChampErreur(ids);

            const firstId = ids[0];
            const target = refs.current[firstId];
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "center" });
            }

            toast.error("Veuillez remplir tous les champs.");
            return;
        }

        const transformedAnswers: { [key: string]: string } = {};
        Object.entries(réponses).forEach(([key, val]) => {
            if (typeof val === "string") {
                transformedAnswers[key] = val;
            } else if (val instanceof FileList) {
                transformedAnswers[key] = Array.from(val).map((f) => f.name).join(", ");
            } else if (Array.isArray(val)) {
                transformedAnswers[key] = val.join(",");
            }
        });

        setRéponses(transformedAnswers);
        setAfficherPopup(true);
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
        <Sidebar /> 
        <div className="flex-1 flex flex-col">
                <HeaderBar />
            <div className="flex justify-center items-start p-10">
                <div className="w-full max-w-screen-2xl space-y-6">
                    <IncidentHeader step={étape} progress={progress} />
                    <div className="bg-white backdrop-blur-md rounded-2xl shadow-lg p-8">
                        <IncidentQuestions
                            questions={questionsIncident}
                            answers={réponses}
                            onAnswerChange={gérerChangementRéponse}
                            errorFields={champErreur}
                            refs={refs}
                        />
                        {sla && (
                            <div className="text-right text-sm text-gray-600 font-medium mt-4">
                                ⏱️ SLA attribué : <span className="text-black font-bold">{sla}</span>
                            </div>
                        )}
                        {priorité && (
                            <div className="text-right text-sm text-gray-600 font-medium mt-2">
                                📌 Priorité calculée : <span className="text-black font-bold">{priorité}</span>
                            </div>
                        )}
                        <div className="mt-6 text-center">
                            <button
                                onClick={handleSubmitClick}
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow transition"
                            >
                                Soumettre l’incident
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    
            <IncidentSummaryPopup
                visible={afficherPopup}
                onClose={() => setAfficherPopup(false)}
                answers={réponses as { [key: string]: string }}
                sla={sla}
                priorité={priorité}
                reportDate={dateRapport}
            />
    
            <ToastContainer />
        </div>
    </div>
    
    );
};

export default IncidentForm;
