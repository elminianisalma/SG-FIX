"use client";

import React from 'react';

interface Question {
    id: string;
    text: string;
    type: "text" | "textarea" | "radio" | "select" | "file" | "multitag";
    placeholder?: string;
    options?: string[];
}

interface IncidentQuestionsProps {
    questions: Question[];
    answers: { [key: string]: string | string[] | FileList | null };
    onAnswerChange: (id: string, value: string | string[] | FileList | null) => void;
    errorFields: string[];
    refs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
}

const IncidentQuestions = ({
                               questions,
                               answers,
                               onAnswerChange,
                               errorFields,
                               refs,
                           }: IncidentQuestionsProps) => {
    const selectedEnv = answers["environment"];
    const isDevOrHF = selectedEnv === "Dev" || selectedEnv === "HF";

    const toggleTag = (id: string, tag: string) => {
        const current = (answers[id] as string[]) || [];
        const updated = current.includes(tag)
            ? current.filter((t) => t !== tag)
            : [...current, tag];
        onAnswerChange(id, updated);
    };

    const renderInput = (q: Question) => {
        const answer = answers[q.id];

        switch (q.type) {
            case "select":
                return (
                    <select
                        value={(answer as string) || ""}
                        onChange={(e) => onAnswerChange(q.id, e.target.value)}
                        className="w-full border border-gray-300 rounded-md py-2 px-3"
                    >
                        <option disabled value="">Sélectionner une option</option>
                        {q.options?.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                );

            case "radio":
                return (
                    <div className="flex flex-wrap gap-3 mt-2">
                        {q.options?.map(opt => {
                            const disabled = q.id === "severity" && opt === "High" && isDevOrHF;
                            const selected = answer === opt;
                            return (
                                <label key={opt} className={`px-4 py-2 rounded-lg text-sm border cursor-pointer transition ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : selected ? "bg-red-100 border-red-500 text-red-700" : "bg-gray-50 border-gray-300 hover:bg-gray-100"}`}>
                                    <input
                                        type="radio"
                                        name={q.id}
                                        value={opt}
                                        disabled={disabled}
                                        checked={selected}
                                        onChange={(e) => onAnswerChange(q.id, e.target.value)}
                                        className="hidden"
                                    />
                                    {opt}
                                </label>
                            );
                        })}
                    </div>
                );

            case "multitag":
                return (
                    <div className="flex flex-wrap gap-3 mt-2">
                        {q.options?.map(tag => {
                            const selected = (answer as string[])?.includes(tag);
                            return (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => toggleTag(q.id, tag)}
                                    className={`px-4 py-2 rounded-full border text-sm transition ${
                                        selected ? "bg-blue-100 text-blue-700 border-blue-500" : "bg-gray-50 border-gray-300 hover:bg-gray-100"
                                    }`}
                                >
                                    #{tag}
                                </button>
                            );
                        })}
                    </div>
                );

            case "text":
                return (
                    <input
                        type="text"
                        value={(answer as string) || ""}
                        placeholder={q.placeholder}
                        onChange={(e) => onAnswerChange(q.id, e.target.value)}
                        className="w-full mt-2 border border-gray-300 rounded-md py-2 px-3"
                    />
                );

            case "textarea":
                return (
                    <textarea
                        rows={4}
                        value={(answer as string) || ""}
                        placeholder={q.placeholder}
                        onChange={(e) => onAnswerChange(q.id, e.target.value)}
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
                            onChange={(e) => onAnswerChange(q.id, e.target.files)}
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
                                    onClick={() => onAnswerChange(q.id, null)}
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
                <div
                    key={q.id}
                    ref={(el) => (refs.current[q.id] = el)}
                    className={`bg-white p-6 rounded-xl shadow border ${
                        errorFields.includes(q.id) ? "border-red-500 animate-shake" : "border-gray-200"
                    }`}
                >
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        {i + 1}. {q.text}
                        {(q.id === "impact" || q.id === "urgence") && (
                            <span className="text-blue-500 cursor-help text-sm" title={
                                q.id === "impact"
                                    ? "Impact : gravité de l’incident sur le service ou les utilisateurs"
                                    : "Urgence : rapidité requise pour la résolution"
                            }>
                ℹ️
              </span>
                        )}
                    </h3>
                    {renderInput(q)}
                </div>
            ))}
        </div>
    );
};

export default IncidentQuestions;
