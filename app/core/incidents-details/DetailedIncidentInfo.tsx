"use client";

import { useState } from "react";
import Sidebar from "@/app/core/SideBar/SideBar";
import { FaArrowDown, FaArrowUp, FaFileImage, FaRegCircle } from "react-icons/fa";

const currentIncident = {
    id: "ID1238957",
    title: "Security Breach",
    status: "PENDING",
    service: "IT Security",
    assignedTo: "John Doe",
    assignedDepartment: "IT Security",
    profileImage: "/images/john.jpeg",
    createdAt: "2025-04-01T09:00:00Z",
    priority: "HIGH",
    impact: "CRITICAL",
    urgency: "High",
    sla: "4 Hours",
    description: `
    Unauthorized access has been detected within the IT security system. This breach could potentially expose sensitive company data and disrupt critical operations. Immediate investigation and mitigation actions are required to prevent further escalation. The issue appears to involve a compromised user account, which needs to be isolated and examined.

    The suspected intruder may have gained access through a weak or compromised password. As the breach was detected by monitoring systems, it is crucial to trace the origin of the access attempt and secure the affected systems. Additionally, all affected systems must undergo a thorough security check, and any compromised data should be reported for further analysis.

    The security team must also verify whether this incident is an isolated event or part of a broader attack. Cooperation from various departments, particularly IT operations and security, is essential for a swift resolution. A full post-incident report will be generated once the investigation concludes, detailing the breach’s cause, the damage, and steps taken to rectify the situation.
    `,
    customerName: "XYZ Corp",
    lastUpdatedBy: "Admin",
    lastUpdatedAt: "2025-04-02 10:30",
};

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

const attachedFiles = [
    { name: "incident_report.png", type: "image", icon: <FaFileImage className="text-2xl text-gray-600" />, imageUrl: "/path/to/image1.png" },
    { name: "server_logs.png", type: "text", icon: <FaFileImage className="text-2xl text-gray-600" />, imageUrl: "" },
    { name: "incident_report2.png", type: "pdf", icon: <FaFileImage className="text-2xl text-gray-600" />, imageUrl: "" },
    { name: "server_logs.log2", type: "text", icon: <FaFileImage className="text-2xl text-gray-600" />, imageUrl: "" },
];

const getStatusStyle = (status: string) => {
    switch (status) {
        case "PENDING": return "bg-blue-100 text-blue-700";
        case "IN_PROGRESS": return "bg-yellow-100 text-yellow-700";
        case "COMPLETED": return "bg-green-100 text-green-700";
        case "CANCELLED": return "bg-red-100 text-red-700";
        default: return "bg-gray-100 text-gray-700";
    }
};

export default function DetailedIncidentInfo() {
    const [activeTab, setActiveTab] = useState("details");

    return (
        <div className="flex min-h-screen bg-gray-100 text-base">
            <Sidebar />

            <div className="flex-1 ml-48 p-8 flex">
                <div className="flex-2 w-2/3 pr-8">
                    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                        <h1 className="text-3xl font-semibold text-gray-900 mb-2">{currentIncident.title}</h1>
                        <p className="text-base text-gray-500">
                            ID: {currentIncident.id} – Créé le {new Date(currentIncident.createdAt).toLocaleDateString()}
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

                    <div className="flex mt-4 border-b border-gray-200">
                        {["details", "timeline", "elements", "others"].map((tab) => (
                            <button
                                key={tab}
                                className={`px-4 py-2 text-base font-medium text-gray-600 border-b-2 ${
                                    activeTab === tab
                                        ? "border-blue-500 text-blue-700"
                                        : "border-transparent hover:text-gray-800 hover:border-gray-300"
                                } focus:outline-none`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab === "details" ? "Détails" :
                                    tab === "timeline" ? "Timeline" :
                                        tab === "elements" ? "Éléments liés" : "Autres"}
                            </button>
                        ))}
                    </div>

                    <div className="mt-6">
                        {activeTab === "details" && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Description de l’incident</h3>
                                <p className="whitespace-pre-line text-base text-gray-700">{currentIncident.description}</p>
                            </div>
                        )}

                        {activeTab === "timeline" && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Timeline de l’incident</h3>
                                <div className="relative">
                                    <div className="absolute top-0 left-2 w-1 bg-gray-300 h-full"></div>
                                    <ul className="space-y-5 pl-8">
                                        {timelineEvents.map((event, index) => (
                                            <li key={index} className="flex items-center space-x-4">
                                                <FaRegCircle className="text-gray-400" />
                                                <div className="flex-1">
                                                    <p className="text-base font-semibold text-gray-800">
                                                        {event.event} <span className={`text-sm ${event.color}`}>{event.label}</span>
                                                    </p>
                                                    <p className="text-sm text-gray-500">{event.date} – {event.author} – {event.action}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {activeTab === "elements" && (
                            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Fichiers joints</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {attachedFiles.map((file, index) => (
                                        <div key={index} className="relative rounded-md overflow-hidden shadow-md transition duration-300 ease-in-out hover:shadow-lg">
                                            <div className="flex flex-col items-center justify-center h-32 bg-gray-100 rounded-md">
                                                {file.icon}
                                                <p className="text-sm text-gray-600 mt-2">{file.name}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "others" && (
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">Autres informations</h3>
                                <p className="text-base text-gray-700">Informations supplémentaires ou autres éléments seront affichés ici...</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Section droite (informations supplémentaires) */}
                <div className="w-2/5 pl-8">
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Informations clés</h3>
                        <div className="mt-4">
                            <div className="flex items-center mb-4">
                                <img
                                    src={currentIncident.profileImage}
                                    alt={currentIncident.assignedTo}
                                    className="w-12 h-12 rounded-full object-cover mr-3"
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

                            <div className="mt-6 flex justify-center">
                                <button className="px-6 py-2 bg-red-500 text-white text-sm font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1">
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
