"use client";

import React, { ChangeEvent } from 'react';

interface Question {
    id: string;
    text: string;
    type: "text" | "textarea" | "radio" | "select" | "file";
    placeholder?: string;
    options?: string[];
}

interface IncidentQuestionsProps {
    questions: Question[];
    answers: { [key: string]: string | FileList | null };
    onAnswerChange: (id: string, value: string | FileList | null) => void;
}

const IncidentQuestions = ({ questions, answers, onAnswerChange }: IncidentQuestionsProps) => {
    const selectedEnv = answers["environment"];
    const isDevOrHF = selectedEnv === "Dev" || selectedEnv === "HF";

    const renderInput = (question: Question) => {
        const answer = answers[question.id];

        switch (question.type) {
            case "select":
                return (
                    <select
                        value={(answer as string) || ""}
                        onChange={(e) => onAnswerChange(question.id, e.target.value)}
                        className="w-full border border-gray-300 rounded-md py-2 px-3"
                    >
                        <option disabled value="">Sélectionner une option</option>
                        {question.options?.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                );

            case "radio":
                return (
                    <div className="flex flex-wrap gap-3 mt-2">
                        {question.options?.map((opt) => {
                            const isDisabled = question.id === "severity" && opt === "High" && isDevOrHF;
                            const isSelected = answer === opt;
                            return (
                                <label
                                    key={opt}
                                    className={`px-4 py-2 rounded-lg text-sm border cursor-pointer transition ${
                                        isDisabled
                                            ? "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
                                            : isSelected
                                                ? "bg-red-100 border-red-500 text-red-700"
                                                : "bg-gray-50 border-gray-300 hover:bg-gray-100"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name={question.id}
                                        value={opt}
                                        disabled={isDisabled}
                                        checked={isSelected}
                                        onChange={(e) => onAnswerChange(question.id, e.target.value)}
                                        className="hidden"
                                    />
                                    {opt}
                                </label>
                            );
                        })}
                    </div>
                );

            case "text":
                return (
                    <input
                        type="text"
                        value={(answer as string) || ""}
                        placeholder={question.placeholder}
                        onChange={(e) => onAnswerChange(question.id, e.target.value)}
                        className="w-full mt-2 border border-gray-300 rounded-md py-2 px-3"
                    />
                );

            case "textarea":
                return (
                    <textarea
                        rows={4}
                        value={(answer as string) || ""}
                        placeholder={question.placeholder}
                        onChange={(e) => onAnswerChange(question.id, e.target.value)}
                        className="w-full mt-2 border border-gray-300 rounded-md py-2 px-3"
                    />
                );

            case "file":
                const fileList = answer as FileList | null;
                return (
                    <div className="mt-2">
                        <input
                            type="file"
                            multiple
                            onChange={(e) => onAnswerChange(question.id, e.target.files)}
                            className="w-full border border-gray-300 rounded-md py-2 px-3"
                        />
                        {fileList && fileList.length > 0 && (
                            <div className="mt-2 bg-gray-100 p-3 rounded text-sm text-gray-700">
                                <p className="font-medium mb-1">Fichiers sélectionnés :</p>
                                <ul className="list-disc list-inside">
                                    {Array.from(fileList).map((file, i) => (
                                        <li key={i}>{file.name}</li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => onAnswerChange(question.id, null)}
                                    className="mt-2 text-red-600 hover:underline text-sm"
                                >
                                    Supprimer les fichiers
                                </button>
                            </div>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            {questions.map((q, i) => (
                <div key={q.id} className="bg-white p-6 rounded-xl shadow border">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        {i + 1}. {q.text}
                        {(q.id === "impact" || q.id === "urgence") && (
                            <span
                                className="text-blue-500 cursor-help text-sm"
                                title={
                                    q.id === "impact"
                                        ? "Impact : gravité de l’incident sur le service ou les utilisateurs"
                                        : "Urgence : rapidité requise pour la résolution"
                                }
                            >
                                ℹ️
                            </span>
                        )}
                    </h3>
                    {renderInput(q)}
                    {q.id === "severity" && isDevOrHF && (
                        <p className="text-sm text-red-500 mt-2">
                            ⚠️ Le niveau de criticité High est désactivé pour les environnements Dev ou HF.
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default IncidentQuestions;
