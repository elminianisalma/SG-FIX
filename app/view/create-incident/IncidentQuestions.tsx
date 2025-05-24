"use client";

import { ApplicationIncident } from "@/app/utils/ApplicationIncident";
import { EnvironmentIncident } from "@/app/utils/EnvironnemntIncident";
import { getPriorityStyle, IncidentPriority } from "@/app/utils/IncidentPriority";
import { getGravityStyle, IncidentGravity } from "@/app/utils/IncidentGravity";
import React, { useState } from "react";
import { FaDownload, FaTrashAlt, FaFile } from "react-icons/fa";
import { FiFile, FiUpload } from "react-icons/fi";

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
  const isDevOrHF = selectedEnv === "DEV" || selectedEnv === "HF";

  const [currentPage, setCurrentPage] = useState(0);
  const [newTag, setNewTag] = useState("");
  const [customTags, setCustomTags] = useState<string[]>([]);

  const totalPages = 3;
  const questionsPerPage = Math.ceil(questions.length / totalPages);

  const toggleTag = (id: string, tag: string) => {
    const current = (answers[id] as string[]) || [];
    const updated = current.includes(tag)
      ? current.filter((t) => t !== tag)
      : [...current, tag];
    onAnswerChange(id, updated);
  };

  const handleAddTag = (id: string) => {
    const tag = newTag.trim();
    const existing = (questions.find((q) => q.id === id)?.options || []).concat(
      customTags
    );
    if (tag && !existing.includes(tag)) {
      setCustomTags([...customTags, tag]);
      const current = (answers[id] as string[]) || [];
      onAnswerChange(id, [...current, tag]);
      setNewTag("");
    }
  };

  const renderInput = (q: Question) => {
    const answer = answers[q.id];
    switch (q.type) {
      case "select":
        return (
          <select
            value={(answer as string) || ""}
            onChange={(e) => onAnswerChange(q.id, e.target.value)}
            className="w-full border text-lg border-gray-300 rounded-md py-2 px-2"
          >
            <option disabled value="">
              Sélectionner une option
            </option>
            {q.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
      case "radio":
  let options;
  switch (q.id) {
    case "à":
      options = Object.keys(IncidentGravity);
      break;

    case "environment":
      options = Object.keys(EnvironmentIncident);
      break;
    case "application":
      options = Object.keys(ApplicationIncident);
      break;
    default:
      options = q.options || [];
  }
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-2">
      {options.map((opt) => {
        const selected = answer === opt;
        return (
          <label
            key={opt}
            className={`w-48 text-center px-8 py-2 rounded-xl text-lg font-medium items-center border cursor-pointer transition ${
              selected
                ? "bg-red-100 border-red-500 text-red-700"
                : "bg-gray-50 border-gray-300 hover:bg-gray-100"
            }`}
          >
            <input
              type="radio"
              name={q.id}
              value={opt}
              checked={selected}
              onChange={(e) => onAnswerChange(q.id, e.target.value)}
              className="hidden"
            />
            {q.id === "gravité" ? IncidentGravity[opt as keyof typeof IncidentGravity] :
             q.id === "environment" ? EnvironmentIncident[opt as keyof typeof EnvironmentIncident] :
             q.id === "ClientName" ? ApplicationIncident[opt as keyof typeof ApplicationIncident] :
             opt}
          </label>
        );
      })}
    </div>
  );
        switch (q.id) {
          case "gravité":
            options = Object.values(IncidentGravity).map((value) =>
              value.toString()
            );
            break;
          case "priority":
            options = Object.values(IncidentPriority).map((value) =>
              value.toString()
            );
            break;
          case "applicationName":
            options = Object.values(ApplicationIncident).map((value) =>
              value.toString()
            );
            break;
          case "environment":
            options = Object.values(EnvironmentIncident).map((value) =>
              value.toString()
            );
            break;
          default:
            options = q.options || [];
        }
        return (
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {options.map((opt) => {
              const disabled =
                q.id === "severity" &&
                opt === IncidentGravity.CRITIQUE &&
                isDevOrHF;
              const selected = answer === opt;
              return (
                <label
                  key={opt}
                  className={`w-48 text-center px-8 py-2 rounded-xl text-lg font-medium items-center border cursor-pointer transition ${
                    disabled
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : selected
                      ? getGravityStyle(IncidentGravity[opt as keyof typeof IncidentGravity]) ||
                        getPriorityStyle(IncidentPriority[opt as keyof typeof IncidentPriority]) ||
                        "bg-red-100 border-red-500 text-red-700"
                      : "bg-gray-50 border-gray-300 hover:bg-gray-100"
                  }`}
                >
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
        const allTags = [...(q.options || []), ...customTags];
        const selectedTags = (answer as string[]) || [];

        return (
          <div className="mt-2 space-y-3">
            <div className="flex flex-wrap gap-3">
              {allTags.map((tag) => {
                const selected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(q.id, tag)}
                    className={`px-4 py-2 rounded-full border text-lg transition ${
                      selected
                        ? "bg-blue-100 text-blue-700 border-blue-500"
                        : "bg-gray-50 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Ajouter un tag"
                className="flex-1 border border-gray-300 rounded-md py-3 px-4 text-lg"
              />
              <button
                type="button"
                onClick={() => handleAddTag(q.id)}
                className="text-blue-600 text-xl font-bold px-4 py-2 rounded-full border border-blue-500 hover:bg-blue-50"
                title="Ajouter un tag"
              >
                +
              </button>
            </div>
          </div>
        );
      case "text":
        return (
          <input
            type="text"
            value={(answer as string) || ""}
            placeholder={q.placeholder}
            onChange={(e) => onAnswerChange(q.id, e.target.value)}
            className="w-full mt-2 border border-gray-300 rounded-md py-3 px-4 text-lg"
          />
        );
      case "textarea":
        return (
          <textarea
            rows={4}
            value={(answer as string) || ""}
            placeholder={q.placeholder}
            onChange={(e) => onAnswerChange(q.id, e.target.value)}
            className="w-full mt-2 border border-gray-300 rounded-md py-3 px-4 text-lg"
          />
        );
      case "file":
        const fileList = answer as FileList | null;
        const maxSizeMB = 10;
        const firstFile = fileList && fileList[0];
        const fileTooLarge =
          firstFile && firstFile.size > maxSizeMB * 1024 * 1024;

        return (
          <div className="space-y-4 mt-2 text-lg">
            <label
              htmlFor={q.id}
              className="w-full border-2 border-dashed border-blue-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition"
            >
              <input
                id={q.id}
                type="file"
                multiple={false}
                className="hidden"
                onChange={(e) => onAnswerChange(q.id, e.target.files)}
              />
              <div className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-dashed border-gray-300 bg-white shadow-sm relative">
                <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gray-100">
                  <FiFile className="text-4xl text-gray-400" />
                  <div className="absolute bottom-2 right-2 bg-blue-500 p-1 rounded-full">
                    <FiUpload className="text-white text-sm" />
                  </div>
                </div>
                <p className="text-gray-500">
                  Drag & drop ou{" "}
                  <span className="text-blue-600 underline cursor-pointer">
                    choisir un fichier
                  </span>
                </p>
                <p className="text-lg text-red-500">Taille max : {maxSizeMB}MB</p>
              </div>
            </label>

            {firstFile && (
              <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
                <div className="flex items-center gap-3">
                  <FaFile className="text-blue-500 text-lg" />
                  <div>
                    <p className="font-semibold text-gray-800">{firstFile.name}</p>
                    <p className="text-base text-gray-500">
                      {(firstFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="flex items-center gap-1 p-2 bg-white border rounded-full text-blue-600 hover:bg-blue-100"
                    title="Télécharger"
                  >
                    <FaDownload />
                  </button>
                  <button
                    type="button"
                    onClick={() => onAnswerChange(q.id, null)}
                    className="p-2 bg-white border rounded-full text-red-600 hover:bg-red-100"
                    title="Supprimer"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            )}

            {fileTooLarge && (
              <p className="text-red-600 text-lg font-medium">
                ⚠️ Le fichier dépasse la taille maximale autorisée de {maxSizeMB}
                MB.
              </p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const startIndex = currentPage * questionsPerPage;
  const paginatedQuestions = questions.slice(
    startIndex,
    startIndex + questionsPerPage
  );

  return (
    <div className="space-y-6 text-lg">
      {paginatedQuestions.map((q) => (
        <div
          key={q.id}
          ref={(el) => (refs.current[q.id] = el)}
          className={`bg-white p-6 rounded-xl shadow border ${
            errorFields.includes(q.id)
              ? "border-red-500 animate-shake"
              : "border-gray-200"
          }`}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-3">{q.text}</h3>
          {renderInput(q)}
        </div>
      ))}

      <div className="grid grid-cols-3 items-center pt-6 gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
          className={`justify-self-start px-4 py-2 rounded-lg font-semibold text-lg transition ${
            currentPage === 0
              ? "bg-gray-300 text-white cursor-not-allowed"
              : "bg-gray-600 text-white hover:bg-gray-700"
          }`}
        >
          ← Précédent
        </button>
        <span className="justify-self-center text-xl font-medium">
          Page {currentPage + 1} sur {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
          }
          disabled={currentPage === totalPages - 1}
          className={`justify-self-end px-4 py-2 rounded-lg font-semibold text-lg transition ${
            currentPage === totalPages - 1
              ? "bg-gray-300 text-white cursor-not-allowed"
              : "bg-gray-600 text-white hover:bg-gray-700"
          }`}
        >
          Suivant →
        </button>
      </div>
    </div>
  );
};

export default IncidentQuestions;