import React, { useState } from "react";
import {
  User,
  FileText,
  CalendarDays,
  Wrench,
  Tag,
  AlertCircle,
  Cpu,
} from "lucide-react";
import { IncidentCardProps } from "@/app/utils/incidentCardProps";
import { IncidentPriority } from "@/app/utils/IncidentPriority";
import AssignIncident from "../create-incident/AssignIncident";

export const IncidentCard: React.FC<IncidentCardProps> = ({ incident, onAssign }) => {
  const [showMore, setShowMore] = useState(false);
  const [showAssign, setShowAssign] = useState(false);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleAssign = () => {
    setShowAssign(false);
    if (onAssign) onAssign();
  };

  // Fallback if incident is undefined
  if (!incident) {
    return <div className="p-6 text-red-600">Incident data is missing. Please provide an incident object.</div>;
  }

  return (
    <div className="border p-6 rounded-xl shadow-sm w-full bg-white mb-6 flex flex-col justify-between ml-13">
      <div className="flex-1">
        <h2 className="text-3xl font-semibold mb-4">
          #{incident.id} - {incident.title}
        </h2>

        {/* Environnement, déclaré par, date de déclaration, priorité */}
        <div className="flex items-center text-base text-gray-600 mb-4 space-x-4">
          {incident.priorité && (
            <span className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
              <span className="font-medium mr-2">Priorité :</span>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  incident.priorité === IncidentPriority.ELEVE
                    ? "bg-red-100 text-red-700"
                    : incident.priorité === IncidentPriority.MOYEN
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {incident.priorité}
              </span>
            </span>
          )}

          {incident.environment && (
            <span className="flex items-center">
              <Cpu className="w-5 h-5 mr-2 text-purple-600" />
              {incident.environment}
            </span>
          )}

          <span className="flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            Déclaré par : {incident.declaredBy || "Inconnu"}
          </span>

          <span className="flex items-center">
            <CalendarDays className="w-5 h-5 mr-2 text-green-600" />
            {incident.declarationDate || "Non spécifiée"}
          </span>
        </div>

        {/* Description */}
        <div className="flex items-start text-base text-gray-600 mb-4">
          <FileText className="w-5 h-5 mr-2 mt-1 text-gray-700" />
          <span className="flex-1">
            Description : {incident.description || "Aucune description fournie"}
          </span>
        </div>

        {showMore && (
          <>
            {incident.resolutionDate && (
              <div className="flex items-center text-base text-gray-600 mb-3">
                <CalendarDays className="w-5 h-5 mr-2 text-green-600" />
                Date de résolution : {incident.resolutionDate}
              </div>
            )}

            <div className="flex items-center text-base text-gray-600 mb-3">
              <Wrench className="w-5 h-5 mr-2 text-orange-600" />
              Service impacté : {incident.affectedService || "Non spécifié"}
            </div>

            <div className="flex items-center text-base text-gray-600 mb-3">
              <FileText className="w-5 h-5 mr-2 text-gray-700" />
              Documentation : {incident.documentation || "Aucune"}
            </div>

            {incident.tags && incident.tags.length > 0 && (
              <div className="flex items-center text-base text-gray-600 mb-3">
                <Tag className="w-5 h-5 mr-2 text-indigo-600" />
                <span className="font-medium mr-2">Tags :</span>
                <div className="flex flex-wrap gap-2">
                  {incident.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-3 py-1 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Bouton "Afficher plus / moins" */}
        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-3 text-blue-600 hover:underline text-base font-medium"
        >
          {showMore ? "Afficher moins" : "Afficher plus"}
        </button>
      </div>

      {/* Bouton "Affecter" en rouge */}
      <div className="mt-6 flex justify-end">
        <button
          className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700 text-base"
          onClick={() => setShowAssign(true)}
        >
          Affecter
        </button>
      </div>

      {showAssign && (
      <>
        {/* Overlay semi-transparent */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setShowAssign(false)}
        />

    {/* Modal AssignIncident centré */}
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative">
            {/* Bouton de fermeture */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowAssign(false)}
            >
              ✕
            </button>

            <AssignIncident
              answers={answers}
              onAnswerChange={handleAnswerChange}
              onAssign={handleAssign}
            />
          </div>
        </div>
      </>
)}

    </div>
  );
};