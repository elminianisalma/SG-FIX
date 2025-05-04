"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
    CalendarDays,
    Building,
    Globe,
    Flame,
    AlarmClock,
    StickyNote,
    FileText,
    Paperclip
} from "lucide-react";
import { toast } from "react-toastify";

interface IncidentSummaryPopupProps {
    visible: boolean;
    onClose: () => void;
    answers: { [key: string]: string };
    sla: string;
    priorité: string;
    reportDate: string;
}

const IncidentSummaryPopup = ({
                                  visible,
                                  onClose,
                                  answers,
                                  sla,
                                  priorité,
                                  reportDate
                              }: IncidentSummaryPopupProps) => {
    const router = useRouter();

    if (!visible) return null;

    const fichiers = answers.attachments?.split(",") || [];

    const handleConfirm = () => {
        toast.success("Incident soumis avec succès.", {
            position: "bottom-center",
            autoClose: 3000
        });

        setTimeout(() => {
            onClose();
            router.push("/core/homePage");
        }, 3200);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-10 w-[90%] max-w-4xl animate-fade-in-up">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Récapitulatif de l’incident déclaré
                </h2>

                <ul className="space-y-5 text-gray-800 text-[17px] leading-relaxed">
                    <li className="flex items-center gap-3">
                        <StickyNote className="text-gray-600 h-5 w-5" />
                        <strong>Objet de l’incident :</strong> {answers.shortDescription}
                    </li>
                    <li className="flex items-center gap-3">
                        <CalendarDays className="text-blue-500 h-5 w-5" />
                        <strong>Date de déclaration :</strong> {reportDate}
                    </li>
                    <li className="flex items-center gap-3">
                        <Building className="text-red-500 h-5 w-5" />
                        <strong>Service concerné :</strong> {answers.ClientName}
                    </li>
                    <li className="flex items-center gap-3">
                        <Globe className="text-purple-600 h-5 w-5" />
                        <strong>Environnement :</strong> {answers.environment}
                    </li>
                    <li className="flex items-center gap-3">
                        <Flame className="text-orange-500 h-5 w-5" />
                        <strong>Impact :</strong> {answers.impact}
                    </li>
                    <li className="flex items-center gap-3">
                        <Flame className="text-orange-400 h-5 w-5" />
                        <strong>Urgence :</strong> {answers.urgence}
                    </li>
                    <li className="flex items-center gap-3">
                        <AlarmClock className="text-green-600 h-5 w-5" />
                        <strong>SLA attribué :</strong> {sla}
                    </li>
                    <li className="flex items-center gap-3">
                        <AlarmClock className="text-red-600 h-5 w-5" />
                        <strong>Priorité calculée :</strong> {priorité}
                    </li>
                    <li className="flex items-start gap-3">
                        <FileText className="text-gray-600 h-5 w-5 mt-1" />
                        <strong>Détails techniques :</strong>
                        <span className="whitespace-pre-line">{answers.details}</span>
                    </li>

                    {fichiers.length > 0 && answers.attachments && (
                        <li className="flex items-start gap-3">
                            <Paperclip className="text-gray-700 h-5 w-5 mt-1" />
                            <div>
                                <strong>Fichiers ajoutés :</strong>
                                <ul className="mt-1 list-disc list-inside text-sm">
                                    {fichiers.map((file, index) => (
                                        <li key={index}>{file.trim()}</li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    )}
                </ul>

                <div className="flex justify-center gap-4 mt-10">
                    <button
                        onClick={onClose}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg shadow transition"
                    >
                        Annuler
                    </button>

                    <button
                        onClick={handleConfirm}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow transition"
                    >
                        Confirmer l’envoi
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IncidentSummaryPopup;
