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
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [sla, setSla] = useState<string>("");
    const [showPopup, setShowPopup] = useState(false);
    const [reportDate] = useState(new Date().toLocaleString());

    const handleAnswerChange = (id: string, value: string) => {
        setAnswers((prev) => {
            const updated = { ...prev, [id]: value };
            if (id === "severity") {
                updated["sla"] = value === "High" ? "2 hours" : value === "Medium" ? "8 hours" : "24 hours";
                setSla(updated["sla"]);
            }
            return updated;
        });
    };



    const assignIncident = () => {
        alert(`Incident assigned to ${answers.assignee || "Unknown"} with SLA: ${sla}`);
    };
    const incidentQuestions:Question[] = [
        { id: "ClientName", text: "Which Client are you?", type: "select", options: ["Bill Payment", "Bankup", "Interop", "OpenR"] },
        { id: "environment", text: "Which environment is affected?", type: "radio", options: ["Dev", "HF", "HT"] },
        { id: "severity", text: "What is the severity of the incident?", type: "radio", options: ["Low", "Medium", "High"] },
        { id: "shortDescription", text: "Short Description", type: "text", placeholder: "Summarize the issue briefly..." },
        { id: "details", text: "Detailed Description", type: "textarea", placeholder: "Explain the issue in detail..." },
        { id: "attachments", text: "Add attachments if any", type: "file" },
    ];

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />
            <div className="flex-1 flex justify-center items-start p-10">
                <div className="w-full max-w-5xl space-y-6">
                    <IncidentHeader step={step} />

                    <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-8">
                        {step === 2 ? (
                            <>
                                <AssignIncident
                                    answers={answers}
                                    onAnswerChange={handleAnswerChange}
                                    onAssign={assignIncident}
                                />
                                <div className="mt-6 text-center">
                                    <button
                                        onClick={() => setShowPopup(true)}
                                        className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition "
                                    >
                                        ✅ Finish
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <IncidentQuestions
                                    questions={incidentQuestions}
                                    answers={answers}
                                    onAnswerChange={handleAnswerChange}
                                />
                                {sla && (
                                    <div className="text-right text-sm text-gray-600 font-medium mt-4">
                                        ⏱️ Assigned SLA: <span className="text-black font-bold">{sla}</span>
                                    </div>
                                )}
                            </>
                        )}

                        <div className="flex justify-between mt-8">
                            {step > 1 && (
                                <button
                                    onClick={() => setStep(step - 1)}
                                    className="bg-gray-200 px-6 py-2 rounded-lg shadow hover:bg-gray-300 transition"
                                >
                                    ← Back
                                </button>
                            )}
                            {step < 2 && (
                                <button
                                    onClick={() => setStep(step + 1)}
                                    className="ml-auto bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-600 transition"
                                >
                                    Next →
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <IncidentSummaryPopup
                visible={showPopup}
                onClose={() => setShowPopup(false)}
                answers={answers}
                sla={sla}
                reportDate={reportDate}
            />
        </div>
    );
};

export default IncidentForm;
