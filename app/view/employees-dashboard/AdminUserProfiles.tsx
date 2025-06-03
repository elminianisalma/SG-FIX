"use client";

import { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaUserCircle } from "react-icons/fa";
import {dividerClasses} from "@mui/material";
import Sidebar from "../SideBarComponent/SideBar";

const userProfiles = [
    {
        id: "user1",
        name: "John Doe",
        department: "IT Security",
        availability: "Disponible",
        profileImage: "/images/john.jpeg",
    },
    {
        id: "user2",
        name: "Jane Smith",
        department: "HR",
        availability: "Occupé",
        profileImage: "/images/jane.jpeg",
    },
    {
        id: "user3",
        name: "Mark Johnson",
        department: "Marketing",
        availability: "Absent",
        profileImage: "/images/michael.jpeg",
    },
    {
        id: "user4",
        name: "Emily Davis",
        department: "Development",
        availability: "Disponible",
        profileImage: "/images/emily.jpeg",
    },
];

const getAvailabilityStyle = (availability: string) => {
    switch (availability) {
        case "Disponible":
            return "bg-green-100 text-green-700";
        case "Occupé":
            return "bg-yellow-100 text-yellow-700";
        case "Absent":
            return "bg-red-100 text-red-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
};

export default function AdminUserProfiles() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = userProfiles.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar à gauche */}
            <div className="fixed top-0 left-0 h-full z-10">
                <Sidebar />
            </div>

            {/* Contenu principal décalé à droite de la sidebar */}
            <div className="ml-64 w-full p-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Liste des utilisateurs</h1>

                    <input
                        type="text"
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                        placeholder="Rechercher par nom"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <table className="min-w-full p-3 table-auto">
                        <thead>
                        <tr className="bg-gray-200">
                            <th className="px-6 py-2 text-left text-sm font-medium text-gray-700">Utilisateur</th>
                            <th className="px-6 py-2 text-left text-sm font-medium text-gray-700">Département</th>
                            <th className="px-6 py-2 text-left text-sm font-medium text-gray-700">Disponibilité</th>
                            <th className="px-6 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900 flex items-center space-x-2">
                                    <img
                                        src={user.profileImage}
                                        alt={user.name}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <span>{user.name}</span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{user.department}</td>
                                <td className="px-6 py-4 text-sm">
                                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityStyle(user.availability)}`}>
                                            {user.availability}
                                        </span>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
                                        Voir Profil
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
