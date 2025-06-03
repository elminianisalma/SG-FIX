"use client";

import { useState, useRef } from "react";
import { Avatar } from "@mui/material";
import {
  FaFileAlt,
  FaTimes,
  FaSyncAlt,
  FaFilePdf,
  FaImage,
  FaCalendarAlt,
} from "react-icons/fa";
import HeaderBar from "../components/HeaderBar";
import Sidebar from "../SideBarComponent/SideBar";
import { IncidentDetail } from "@/app/models/IncidentDetail";
import { IncidentStatus } from "@/app/utils/IncidentStatus";
import { IncidentGravity } from "@/app/utils/IncidentGravity";
import { IncidentPriority } from "@/app/utils/IncidentPriority";
import CommentSection from "./commentSection";

const currentIncident: IncidentDetail = {
  id: BigInt(1238957),
  titre: "Violation de sécurité",
  description: `
    Un accès non autorisé a été détecté dans le système de sécurité informatique. Cette violation pourrait potentiellement exposer des données sensibles et perturber les opérations critiques. Une enquête immédiate et des actions de mitigation sont nécessaires pour prévenir une escalade.
    L'intrus pourrait avoir accédé au système via un mot de passe compromis. Il est crucial de tracer l'origine de la tentative et de sécuriser les systèmes affectés. Une vérification complète des systèmes concernés doit être effectuée pour évaluer les dommages potentiels.
  `,
  statutIncident: IncidentStatus.PRIS_EN_CHARGE,
  gravite: IncidentGravity.CRITIQUE,
  priorite: IncidentPriority.ELEVEE,
  dateAttribution: "2025-04-01T09:00:00Z",
  dateResolution: "", // À remplir lorsqu'une date est disponible
  dateDeclaration: "2025-04-01T09:00:00Z",
  clientSub: "xyzcorp_sub_001",
  client_fullName: "El Mehdi BOUHLAOUI",
  client_igg: "xyzcorp_igg_001",
  client_firstName: "El Mehdi",
  client_lastName: "BOUHLAOUI",
  client_mail: "mehdiBouhalaoui@socgen.com",
  client_role: "Client",
  client_serviceName: "Sécurité Informatique",
  coeDevSub: "openr_sub_001",
  coeDev_firstName: "Ghita",
  coeDev_lastName: "Boukri",
  coeDev_fullName: "Ghita Boukri",
  coeDev_mail: "ghita.boukri@openr.com",
  coeDev_igg: "openr_igg_001",
  coeDev_role: "Développeuse Sécurité",
  coeDev_serviceName: "OpenR",
  environnement: "DEV",
  application: "Open R",
  tags: ["Sécurité", "Urgent", "Confidentiel"],
  base64Images: [] // ou avec des images encodées en base64 si disponible
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case "EN ATTENTE":
      return "bg-blue-100 text-blue-700";
    case "EN COURS":
      return "bg-yellow-100 text-yellow-700";
    case "RÉSOLU":
      return "bg-green-100 text-green-700";
    case "ANNULÉ":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function DetailedIncidentInfo() {
  const [activeTab, setActiveTab] = useState("details");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [documentation, setDocumentation] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [savedFiles, setSavedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [status, setStatus] = useState(currentIncident.statutIncident);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    setSavedFiles((prev) => [...prev, ...selectedFiles]);
    setIsPopupOpen(false);
    setDocumentation("");
    setSelectedFiles([]);
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
    setDocumentation("");
    setSelectedFiles([]);
  };

  const isImage = (file: File) => file.type.startsWith("image/");

  const images = savedFiles.filter(isImage);
  const documents = savedFiles.filter((file) => !isImage(file));

  return (
    <div className="flex min-h-screen bg-gray-100 text-base">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="w-full">
          <HeaderBar />
          <div className="text-center py-4 px-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Gestion détaillée de l’incident
            </h1>
          </div>
        </div>

        <div className="flex-1 p-8">
          <div className="w-full max-w-7xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="flex justify-between items-start flex-wrap gap-4">
                {/* Gauche - Titre, date, champs */}
                <div className="flex-1 min-w-[300px]">
                  <h1 className="text-3xl font-bold text-gray-900 flex items-center flex-wrap gap-2">
                    {currentIncident.titre} –{" "}
                    <span className="text-gray-700">ID : {currentIncident.id.toString()}</span>
                  </h1>
                  <div className="flex items-center text-lg text-gray-700 mt-3 space-x-2">
                    <FaCalendarAlt className="text-blue-600 text-xl" />
                    <span className="font-medium">
                      Déclaré le {new Date(currentIncident.dateDeclaration).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(currentIncident.statutIncident)}`}>
                      {currentIncident.statutIncident}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium text-red-700 bg-red-100">
                      Priorité : {currentIncident.priorite}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium text-yellow-700 bg-yellow-100">
                      Gravité : {currentIncident.gravite}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium">
                      Application : {currentIncident.application}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium text-gray-500 bg-gray-100">
                      <span className="font-bold text-gray-600">Environnement : </span>
                      <span className="text-gray-800 font-normal">{currentIncident.environnement}</span>
                    </span>
                  </div>
                </div>

                {/* Droite - Infos client avec hover */}
                <div className="relative group">
                  <div className="flex items-center gap-2">
                    <Avatar className="bg-blue-500" sx={{ width: 40, height: 40 }}>
                      {currentIncident.client_firstName[0] + currentIncident.client_lastName[0]}
                    </Avatar>
                    <span className="text-sm font-medium text-gray-700">
                      {currentIncident.client_fullName}
                    </span>
                  </div>
                  <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-md z-50 hidden group-hover:block">
                    <div className="p-3">
                      <p className="text-sm font-semibold text-gray-800">
                        {currentIncident.client_fullName}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Sub :</strong> {currentIncident.clientSub}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>IGG :</strong> {currentIncident.client_igg}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Prénom :</strong> {currentIncident.client_firstName}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Nom :</strong> {currentIncident.client_lastName}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Email :</strong> {currentIncident.client_mail}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Rôle :</strong> {currentIncident.client_role}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Service :</strong> {currentIncident.client_serviceName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Onglets */}
              <div className="flex mt-4 border-b border-gray-200">
                {["details", "timeline", "fichiers", "commentaires"].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 text-base font-medium text-gray-600 border-b-2 ${
                      activeTab === tab
                        ? "border-blue-500 text-blue-700"
                        : "border-transparent hover:text-gray-800 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === "details"
                      ? "Détails"
                      : tab === "timeline"
                      ? "Chronologie"
                      : tab === "fichiers"
                      ? "Fichiers"
                      : "Commentaires"}
                  </button>
                ))}
              </div>

              {/* Contenu des onglets */}
              <div className="mt-6">
                {activeTab === "details" && (
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Description de l'incident
                    </h3>
                    <p className="whitespace-pre-line text-gray-700">
                      {currentIncident.description}
                    </p>
                  </div>
                )}
                {activeTab === "timeline" && (
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Chronologie de l'incident
                    </h3>
                    <p className="text-gray-500">
                      Aucune chronologie disponible pour le moment.
                    </p>
                  </div>
                )}
                {activeTab === "fichiers" && (
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Fichiers et Captures d'écran
                    </h3>
                    {savedFiles.length === 0 ? (
                      <p className="text-gray-500">
                        Aucun fichier ou capture d'écran ajouté pour le moment.
                      </p>
                    ) : (
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-medium text-gray-800 mb-2">
                            Documents
                          </h4>
                          {documents.length === 0 ? (
                            <p className="text-gray-500">Aucun document ajouté.</p>
                          ) : (
                            <ul className="space-y-2">
                              {documents.map((file, index) => (
                                <li
                                  key={index}
                                  className="flex items-center gap-3 p-2 border rounded-lg"
                                >
                                  <FaFilePdf className="text-red-600" />
                                  <span className="text-gray-700">{file.name}</span>
                                  <span className="text-gray-500 text-sm">
                                    ({(file.size / 1024).toFixed(2)} KB)
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-800 mb-2">
                            Captures d'écran
                          </h4>
                          {images.length === 0 ? (
                            <p className="text-gray-500">
                              Aucune capture d'écran ajoutée.
                            </p>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                              {images.map((file, index) => (
                                <div key={index} className="p-2 border rounded-lg">
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    className="w-full h-32 object-cover rounded"
                                  />
                                  <p className="text-gray-700 mt-2">{file.name}</p>
                                  <p className="text-gray-500 text-sm">
                                    ({(file.size / 1024).toFixed(2)} KB)
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {activeTab === "commentaires" && (
                  <div className="p-6 rounded-lg shadow-md">
                    <CommentSection />
                  </div>
                )}
              </div>

              {/* Boutons en bas */}
              <div className="flex flex-row flex-wrap gap-4 justify-end mt-6">
                <div className="relative">
                  <button
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg flex items-center hover:bg-gray-800"
                    onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                  >
                    <FaSyncAlt className="mr-2" />
                    Mettre à jour statut
                  </button>
                  {isStatusDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md z-50">
                      {["TRANSFÉRÉ", "RÉSOLU"].map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setStatus(option);
                            setIsStatusDropdownOpen(false);
                          }}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
                  onClick={() => setIsPopupOpen(true)}
                >
                  <FaFileAlt className="mr-2" />
                  Ajouter Documentation
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Popup Ajouter Documentation */}
        {isPopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={handleCancel}
              >
                <FaTimes />
              </button>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Ajouter une documentation</h2>
              <textarea
                value={documentation}
                onChange={(e) => setDocumentation(e.target.value)}
                placeholder="Décrivez la documentation associée à cet incident..."
                className="w-full h-28 p-3 border rounded-md mb-4 resize-none"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                className="hidden"
              />
              <button
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleClick}
              >
                Ajouter fichiers
              </button>
              {selectedFiles.length > 0 && (
                <ul className="mb-4 space-y-2">
                  {selectedFiles.map((file, idx) => (
                    <li key={idx} className="text-gray-700">
                      {file.name} ({(file.size / 1024).toFixed(2)} KB)
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={handleCancel}
                >
                  Annuler
                </button>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={handleSave}
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}