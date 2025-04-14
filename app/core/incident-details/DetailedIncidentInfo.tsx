"use client";

import { useState } from "react";
import Sidebar from "@/app/core/SideBar/SideBar";
import { FaArrowDown, FaArrowUp, FaFileImage, FaFileAlt, FaRegCircle, FaFile } from "react-icons/fa"; // Icônes

// Exemple d'incident
const currentIncident = {
    id: "ID1238957",
    title: "Security Breach",
    status: "PENDING",
    service: "IT Security",
    assignedTo: "John Doe",
    assignedDepartment: "IT Security",
    profileImage: "/images/john.jpeg",
    createdAt: "2025-04-01T09:00:00Z",
    priority: "High",
    impact: "Critical",
    urgency: "High",
    sla: "4 Hours",
    description:
        "Unauthorized access detected in the security system. Immediate action is required to mitigate any potential risks.",
    customerName: "XYZ Corp",
    lastUpdatedBy: "Admin",
    lastUpdatedAt: "2025-04-02 10:30",
};

// Exemple de données pour la timeline
const timelineEvents = [
    {
        date: "2025-04-01",
        event: "Incident created by IT service",
        author: "Admin",
        action: "Added",
        label: "Security",
        color: "bg-blue-100 text-blue-700",
    },
    {
        date: "2025-04-02",
        event: "Assigned to John Doe for investigation",
        author: "Manager",
        action: "Added",
        label: "IT Operations",
        color: "bg-green-100 text-green-700",
    },
    {
        date: "2025-04-02",
        event: "Investigation started by John Doe",
        author: "John Doe",
        action: "In Progress",
        label: "Security",
        color: "bg-yellow-100 text-yellow-700",
    },
    {
        date: "2025-04-03",
        event: "Status updated to 'In Progress'",
        author: "John Doe",
        action: "Updated",
        label: "Status",
        color: "bg-orange-100 text-orange-700",
    },
];

// Exemple de fichiers joints
const attachedFiles = [
    { name: "incident_report.png", type: "image", icon: <FaFileImage className="text-xl text-gray-600" />, imageUrl: "/path/to/image1.png" },
    { name: "server_logs.png", type: "text", icon: <FaFileImage className="text-xl text-gray-600" />, imageUrl: "" },
    { name: "incident_report2.png", type: "pdf", icon: <FaFileImage className="text-xl text-gray-600" />, imageUrl: "" },
    { name: "server_logs.log2", type: "text", icon: <FaFileImage className="text-xl text-gray-600" />, imageUrl: "" },
];

// Fonction pour récupérer les styles en fonction du statut
const getStatusStyle = (status: string) => {
    switch (status) {
        case "PENDING":
            return "bg-blue-100 text-blue-700";
        case "IN_PROGRESS":
            return "bg-yellow-100 text-yellow-700";
        case "COMPLETED":
            return "bg-green-100 text-green-700";
        case "CANCELLED":
            return "bg-red-100 text-red-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
};

export default function DetailedIncidentInfo() {
    const [activeTab, setActiveTab] = useState("details");
    const [showFullDescription, setShowFullDescription] = useState(true);

    // Fonction pour changer l'onglet actif
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    // Fonction pour afficher/masquer la description complète
    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    // Fonction pour afficher l'image en grand
    const handleImageClick = (imageUrl: string) => {
        window.open(imageUrl, "_blank");
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar importée */}
            <Sidebar />

            <div className="flex-1 ml-48 p-8 flex">
                {/* Section gauche : Contenu principal */}
                <div className="flex-2 w-2/3 pr-8">
                    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h1 className="text-2xl font-semibold text-gray-900 mb-2">{currentIncident.title}</h1>
                        <p className="text-sm text-gray-500">
                            ID: {currentIncident.id} - Créé le {new Date(currentIncident.createdAt).toLocaleDateString()}
                        </p>
                        <div className="mt-2">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(currentIncident.status)}`}>
                                {currentIncident.status}
                            </span>
                            <span className="ml-2 inline-block px-2 py-1 rounded-full text-xs font-medium text-red-700 bg-red-100">
                                Priorité : {currentIncident.priority}
                            </span>
                        </div>
                    </div>

                    {/* Navigation par onglets */}
                    <div className="flex mt-4 border-b border-gray-200">
                        <button
                            className={`px-4 py-2 text-sm font-medium text-gray-600 border-b-2 ${activeTab === "details" ? "border-blue-500 text-blue-700" : "border-transparent hover:text-gray-800 hover:border-gray-300"} focus:outline-none`}
                            onClick={() => handleTabChange("details")}
                        >
                            Détails
                        </button>
                        <button
                            className={`px-4 py-2 text-sm font-medium text-gray-600 border-b-2 ${activeTab === "timeline" ? "border-blue-500 text-blue-700" : "border-transparent hover:text-gray-800 hover:border-gray-300"} focus:outline-none`}
                            onClick={() => handleTabChange("timeline")}
                        >
                            Timeline
                        </button>
                        <button
                            className={`px-4 py-2 text-sm font-medium text-gray-600 border-b-2 ${activeTab === "elements" ? "border-blue-500 text-blue-700" : "border-transparent hover:text-gray-800 hover:border-gray-300"} focus:outline-none`}
                            onClick={() => handleTabChange("elements")}
                        >
                            Éléments liés
                        </button>
                        <button
                            className={`px-4 py-2 text-sm font-medium text-gray-600 border-b-2 ${activeTab === "others" ? "border-blue-500 text-blue-700" : "border-transparent hover:text-gray-800 hover:border-gray-300"} focus:outline-none`}
                            onClick={() => handleTabChange("others")}
                        >
                            Autres
                        </button>
                    </div>

                    {/* Contenu des onglets */}
                    <div className="mt-6">
                        {activeTab === "details" && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description de l'incident</h3>
                                <div className="text-sm text-gray-700">
                                    <p className="whitespace-pre-line">{currentIncident.description}</p>
                                </div>
                            </div>
                        )}

                        {activeTab === "timeline" && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Timeline de l'incident</h3>
                                <div className="relative">
                                    <div className="absolute top-0 left-2 w-1 bg-gray-300 h-full"></div> {/* Ligne verticale */}
                                    <ul className="space-y-4 pl-8">
                                        {timelineEvents.map((event, index) => (
                                            <li key={index} className="flex items-center space-x-4">
                                                <FaRegCircle className="text-gray-400" />
                                                <div className="flex-1">
                                                    <p className="text-sm font-semibold text-gray-800">
                                                        {event.event} <span className={`text-xs ${event.color}`}>{event.label}</span>
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {event.date} - {event.author} - {event.action}
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {activeTab === "elements" && (
                            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Fichiers joints</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {attachedFiles.map((file, index) => (
                                        <div key={index} className="relative rounded-md overflow-hidden shadow-md transition duration-300 ease-in-out hover:shadow-lg">
                                            <div className="flex flex-col items-center justify-center h-32 bg-gray-100 rounded-md">
                                                {file.icon} {/* Icône de fichier */}
                                                <p className="text-xs text-gray-600 mt-1">{file.name}</p> {/* Nom du fichier avec extension */}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "others" && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Autres informations</h3>
                                <p className="text-gray-700 text-sm">Informations supplémentaires ou autres éléments seront affichés ici...</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Section droite (informations supplémentaires) */}
                <div className="w-1/3 pl-8">
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Informations clés</h3>
                        <div className="mt-4">
                            <div className="flex items-center mb-4">
                                <img
                                    src={currentIncident.profileImage}
                                    alt={currentIncident.assignedTo}
                                    className="w-10 h-10 rounded-full object-cover mr-3"
                                />
                                <div>
                                    <p className="text-gray-800 font-semibold">{currentIncident.assignedTo}</p>
                                    <p className="text-gray-600 text-sm">{currentIncident.assignedDepartment}</p>
                                </div>
                            </div>

                            <div className="text-sm text-gray-700 space-y-2">
                                <div>
                                    <span className="font-semibold">Statut:</span>
                                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(currentIncident.status)}`}>
                                        {currentIncident.status}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-semibold">SLA:</span>
                                    <span className="ml-2 px-2 py-1 rounded-full text-xs font-medium text-green-700 bg-green-100">
                                        {currentIncident.sla}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-semibold">Priorité:</span>
                                    <span className="ml-2 px-2 py-1 rounded-full text-xs font-medium text-red-700 bg-red-100">
                                        {currentIncident.priority}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-semibold">Impact:</span>
                                    <span className="ml-2 px-2 py-1 rounded-full text-xs font-medium text-orange-700 bg-orange-100">
                                        {currentIncident.impact}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-semibold">Urgence:</span>
                                    <span className="ml-2 px-2 py-1 rounded-full text-xs font-medium text-yellow-700 bg-yellow-100">
                                        {currentIncident.urgency}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 items-center">
                                <button className="px-4 py-2  bg-red-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
                                    Mettre à jour le statut
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
