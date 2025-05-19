"use client";

import { useState, useRef } from "react";
import Sidebar from "../SideBarComponent/Sidebar";
import { Avatar } from "@mui/material";
import { FaFileAlt, FaTimes , FaSyncAlt} from "react-icons/fa";
import HeaderBar from "../components/HeaderBar";

const currentIncident = {
    id: "ID1238957",
    title: "Violation de sécurité",
    status: "EN ATTENTE",
    service: "Sécurité Informatique",
    assignedTo: "Ghita Boukri",
    assignedDepartment: "OpenR",
    createdAt: "2025-04-01T09:00:00Z",
    priority: "HAUTE",
    impact: "CRITIQUE",
    urgency: "Élevée",
    sla: "4 Heures",
    description: `
    Un accès non autorisé a été détecté dans le système de sécurité informatique. Cette violation pourrait potentiellement exposer des données sensibles et perturber les opérations critiques. Une enquête immédiate et des actions de mitigation sont nécessaires pour prévenir une escalade.
    
    L'intrus pourrait avoir accédé au système via un mot de passe compromis. Il est crucial de tracer l'origine de la tentative et de sécuriser les systèmes affectés. Une vérification complète des systèmes concernés doit être effectuée pour évaluer les dommages potentiels.
    `,
    customerName: "XYZ Corp",
    lastUpdatedBy: "Admin",
    lastUpdatedAt: "2025-04-02 10:30",
};

const getStatusStyle = (status: string) => {
    switch (status) {
        case "EN ATTENTE": return "bg-blue-100 text-blue-700";
        case "EN COURS": return "bg-yellow-100 text-yellow-700";
        case "RÉSOLU": return "bg-green-100 text-green-700";
        case "ANNULÉ": return "bg-red-100 text-red-700";
        default: return "bg-gray-100 text-gray-700";
    }
};

export default function DetailedIncidentInfo() {
    const [activeTab, setActiveTab] = useState("details");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [documentation, setDocumentation] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const getInitials = (name: string) => {
        const parts = name.split(" ");
        return parts[0][0] + (parts[1] ? parts[1][0] : "");
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFiles(Array.from(e.target.files));
        }
    };
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    const [status, setStatus] = useState(currentIncident.status);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleSave = () => {
        console.log("Documentation:", documentation);
        console.log("Files:", selectedFiles);
        setIsPopupOpen(false);
        setDocumentation("");
        setSelectedFiles([]);
    };

    const handleCancel = () => {
        setIsPopupOpen(false);
        setDocumentation("");
        setSelectedFiles([]);
    };

    return (
        <div className="flex min-h-screen bg-gray-100 text-base">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <HeaderBar />
               
               <div className="relative text-center -mt-8 mb-6 px-4">
                    <h1 className="text-2xl font-bold text-gray-800 leading-snug mt-10">
                        Gestion détaillée de l’incident  <br />
                    </h1>
                   
                    </div>

                <div className="flex-1 ml-48 p-8 flex">
                    
                    <div className="flex-2 w-2/3 pr-8">
                        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-3xl font-semibold text-gray-900 mb-2">{currentIncident.title}</h1>
                                    <p className="text-base text-gray-500">
                                        ID : {currentIncident.id} – Créé le {new Date(currentIncident.createdAt).toLocaleDateString()}
                                    </p>
                                    <div className="mt-3">
                                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(currentIncident.status)}`}>
                                            {currentIncident.status}
                                        </span>
                                        <span className="ml-2 inline-block px-3 py-1 rounded-full text-sm font-medium text-red-700 bg-red-100">
                                            Priorité : {currentIncident.priority}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end space-y-2 w-60">
                                    <div className="relative w-full">
                                        <button
                                            className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center"
                                            onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                                        >
                                            <FaSyncAlt className="mr-2" />
                                            Mettre à jour statut
                                        </button>

                                        {isStatusDropdownOpen && (
                                            <div className="absolute right-0 mt-2 w-full bg-white border rounded-lg shadow-md z-50">
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
                                        className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center"
                                        onClick={() => setIsPopupOpen(true)}
                                    >
                                        <FaFileAlt className="mr-2" />
                                        Ajouter Documentation
                                    </button>
                                </div>

                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex mt-4 border-b border-gray-200">
                            {["details", "timeline", "fichiers", "autres"].map((tab) => (
                                <button
                                    key={tab}
                                    className={`px-4 py-2 text-base font-medium text-gray-600 border-b-2 ${
                                        activeTab === tab
                                            ? "border-blue-500 text-blue-700"
                                            : "border-transparent hover:text-gray-800 hover:border-gray-300"
                                    }`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab === "details" ? "Détails" :
                                        tab === "timeline" ? "Chronologie" :
                                            tab === "fichiers" ? "Fichiers" : "Autres"}
                                </button>
                            ))}
                        </div>

                        {/* Content */}
                        <div className="mt-6">
                            {activeTab === "details" && (
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Description de l'incident</h3>
                                    <p className="whitespace-pre-line text-base text-gray-700">{currentIncident.description}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Informations clés */}
                    <div className="w-2/5 pl-8">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Informations clés</h3>
                            <div className="mt-4">
                                <div className="flex items-center mb-4">
                                    <Avatar sx={{ bgcolor: "#4A90E2", width: 48, height: 48, fontSize: 20 }}>
                                        {getInitials(currentIncident.assignedTo)}
                                    </Avatar>
                                    <div className="ml-3">
                                        <p className="text-gray-800 font-semibold">{currentIncident.assignedTo}</p>
                                        <p className="text-gray-600 text-sm">{currentIncident.assignedDepartment}</p>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-700 space-y-2">
                                    <div>
                                        <span className="font-semibold">Statut :</span>
                                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(currentIncident.status)}`}>
                                            {currentIncident.status}
                                        </span>
                                    </div>
                                    <div><span className="font-semibold">SLA :</span> <span className="ml-2">{currentIncident.sla}</span></div>
                                    <div><span className="font-semibold">Priorité :</span> <span className="ml-2">{currentIncident.priority}</span></div>
                                    <div><span className="font-semibold">Impact :</span> <span className="ml-2">{currentIncident.impact}</span></div>
                                    <div><span className="font-semibold">Urgence :</span> <span className="ml-2">{currentIncident.urgency}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Popup ajouter documentation */}
                {isPopupOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-xl w-1/2 p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Ajouter Documentation</h2>
                                <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700">
                                    <FaTimes />
                                </button>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Documentation</label>
                                <textarea
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={6}
                                    value={documentation}
                                    onChange={(e) => setDocumentation(e.target.value)}
                                    placeholder="Saisir la documentation ici..."
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
