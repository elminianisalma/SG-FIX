'use client';
import React, { useState } from "react";
import Sidebar from "../SideBar/SideBar";
import IncidentTable from "@/app/core/incident-list/IncidentTable";
import {
    ListIcon,
    TableIcon,
    TimerIcon,
    FilterIcon,
    LayersIcon,
    SortAscIcon,
    MessageCircle,
    FileText,
    Link
} from "lucide-react";

export enum IncidentStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED",
    RESOLVED = "RESOLVED",
    NEW = "NEW",
    IN_PROGRESS = "IN_PROGRESS",
}

export type Incident = {
    id: string;
    title: string;
    status: IncidentStatus;
    service: string;
    assignedTo: string;
    profileImage: string;
    createdAt: string;
    priority?: string;
    impact?: string;
    urgency?: string;
    sla?: string;
    description?: string;
    customerName?: string;
    lastUpdatedBy?: string;
    lastUpdatedAt?: string;
};

const getTabIcon = (tab: string) => {
    switch (tab) {
        case "List":
            return <ListIcon className="w-6 h-6 inline-block mr-2" />;
        case "Table":
            return <TableIcon className="w-6 h-6 inline-block mr-2" />;
        case "Timeline":
            return <TimerIcon className="w-6 h-6 inline-block mr-2" />;
        default:
            return null;
    }
};

const statusColors: Record<IncidentStatus, string> = {
    [IncidentStatus.PENDING]: "bg-yellow-500",
    [IncidentStatus.COMPLETED]: "bg-green-500",
    [IncidentStatus.CANCELLED]: "bg-red-500",
    [IncidentStatus.RESOLVED]: "bg-blue-500",
    [IncidentStatus.NEW]: "bg-purple-500",
    [IncidentStatus.IN_PROGRESS]: "bg-pink-500",
};

const priorityColors: Record<string, string> = {
    High: "bg-red-500",
    Medium: "bg-yellow-500",
    Low: "bg-green-500",
};

const incidents: Record<string, Incident[]> = {
    "To Do": [
        {
            id: "1",
            title: "API Gateway Down",
            status: IncidentStatus.NEW,
            service: "API Gateway",
            assignedTo: "Alice",
            profileImage: "/images/jane.jpeg",
            createdAt: "2025-04-12",
            priority: "High",
        },
        {
            id: "2",
            title: "UI Bug on Dashboard",
            status: IncidentStatus.PENDING,
            service: "Frontend",
            assignedTo: "Bob",
            profileImage: "/images/john.jpeg",
            createdAt: "2025-04-10",
            priority: "Medium",
        },
    ],
    "In Progress": [
        {
            id: "3",
            title: "Database Latency",
            status: IncidentStatus.IN_PROGRESS,
            service: "Database",
            assignedTo: "Claire",
            profileImage: "/images/michael.jpeg",
            createdAt: "2025-04-11",
            priority: "High",
        },
    ],
    Done: [
        {
            id: "4",
            title: "Email Service Fixed",
            status: IncidentStatus.RESOLVED,
            service: "Email",
            assignedTo: "David",
            profileImage: "/images/emily.jpeg",
            createdAt: "2025-04-09",
            priority: "Low",
        },
    ],
};

const IncidentCard = ({ incident }: { incident: Incident }) => (
    <div className="bg-white rounded-xl shadow-md border p-6 w-full max-w-md">
        <div className="flex justify-between items-start">
            <span className={`text-sm font-semibold text-white ${statusColors[incident.status]} px-3 py-1 rounded-full`}>
                {incident.status}
            </span>
            <button className="text-gray-400 hover:text-gray-600 text-2xl">⋯</button>
        </div>
        <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-800">
                {incident.title}
            </h3>
            <p className="text-lg text-gray-600 mt-2">
                {incident.description || "No description available"}
            </p>
        </div>

        <div className="mt-5 text-lg text-gray-600">
            <p className="mb-2 font-medium inline">Assignees: </p>
            <div className="flex items-center space-x-3 inline">
                <img
                    src={incident.profileImage}
                    alt={incident.assignedTo}
                    className="w-8 h-8 rounded-full"
                />
                <span>{incident.assignedTo}</span>
            </div>
        </div>


        <div className="mt-5 flex justify-between items-center text-lg text-gray-600">
            <div className="flex items-center space-x-2">
                <span>📅</span>
                <span>{incident.createdAt}</span>
            </div>
            <span
                className={`text-sm font-semibold text-white ${priorityColors[incident.priority || "Low"]} px-3 py-1 rounded-full`}
            >
                {incident.priority}
            </span>
        </div>

        <div className="mt-5 flex items-center justify-between text-lg text-gray-500 border-t pt-4">
            <div className="flex items-center space-x-5">
                <div className="flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5" />
                    <span>12 Comments</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Link className="w-5 h-5" />
                    <span>1 Links</span>
                </div>
                <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>0/3</span>
                </div>
            </div>
        </div>
    </div>
);

export default function IncidentBoard() {
    const [activeTab, setActiveTab] = useState("Board");
    const tabs = ["Overview", "Board", "List", "Table", "Timeline"];

    return (
        <div className="flex min-h-screen">
            <div className="w-64 bg-gray-100 border-r">
                <Sidebar />
            </div>
            <div className="flex-1 p-12">
                <h1 className="text-6xl font-bold mb-6">Incidents</h1>
                <p className="text-gray-600 mb-12 text-2xl">
                    Overview of ongoing and resolved incidents
                </p>

                <div className="flex items-center justify-between border-b mb-12 pb-6">
                    <div className="flex space-x-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-3 border-b-2 text-2xl font-semibold flex items-center ${
                                    activeTab === tab
                                        ? "border-purple-600 text-purple-600"
                                        : "border-transparent text-gray-500 hover:text-purple-600"
                                }`}
                            >
                                {getTabIcon(tab)}
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center space-x-8 text-2xl text-gray-500">
                        <button className="flex items-center hover:text-gray-800">
                            <FilterIcon className="w-6 h-6 mr-2" />
                            Filter
                        </button>
                        <button className="flex items-center hover:text-gray-800">
                            <LayersIcon className="w-6 h-6 mr-2" />
                            Group by
                        </button>
                        <button className="flex items-center hover:text-gray-800">
                            <SortAscIcon className="w-6 h-6 mr-2" />
                            Sort
                        </button>
                    </div>
                </div>

                {activeTab === "List" && (
                    <IncidentTable incidents={Object.values(incidents).flat()} />
                )}

                {activeTab === "Board" && (
                    <div className="flex justify-center">
                        <div className="flex gap-12 overflow-x-auto text-center">
                            {Object.entries(incidents).map(([column, items]) => (
                                <div key={column} className="w-[400px]">
                                    {/* Augmentation de la taille du texte à text-lg */}
                                    <h2 className="text-base-100 font-semibold mb-4">
                                        {column}
                                        <span className="text-gray-400 text-sm ml-1">({items.length})</span>
                                    </h2>
                                    <div className="space-y-8">
                                        {items.map((incident) => (
                                            <IncidentCard key={incident.id} incident={incident} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab !== "Board" && activeTab !== "List" && (
                    <div className="text-gray-400 italic text-2xl">
                        Contenu de l’onglet à venir...
                    </div>
                )}
            </div>
        </div>
    );
}
