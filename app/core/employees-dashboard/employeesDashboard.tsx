"use client";

import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import Sidebar from '../SideBar/SideBar'; // Assurez-vous que le chemin est correct
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

// --- Interfaces ---
interface Incident {
    id: string;
    title: string;
    status: "Non résolu" | "Non affecté" | "Refusé" | string;
    priority: "P0" | "P1" | "P2" | "P3" | string;
}

interface User {
    id: string;
    name: string;
    department: string;
    availability: "Disponible" | "Occupé" | "Absent" | string;
    profileImage: string; // <-- VÉRIFIEZ CES CHEMINS DANS VOS DONNÉES
}

// --- Données Initiales ---
const initialUsers: User[] = [
    { id: "user1", name: "John Doe", department: "IT Security", availability: "Disponible", profileImage: "/images/john.jpeg" },
    { id: "user2", name: "Jane Smith", department: "HR", availability: "Occupé", profileImage: "/images/jane.jpeg" },
    { id: "user3", name: "Mark Johnson", department: "Marketing", availability: "Absent", profileImage: "/images/michael.jpeg" },
    { id: "user4", name: "Emily Davis", department: "Development", availability: "Disponible", profileImage: "/images/emily.jpeg" },
];

// Données incidents AVEC statut ET priorité P0-P3
const initialIncidents: Incident[] = [
    { id: "incident1", title: "Problème de connexion VPN", status: "Non résolu", priority: "P1" }, // Sera mis en évidence (Non résolu + P1)
    { id: "incident2", title: "Erreur serveur principal", status: "Non affecté", priority: "P0" }, // Critique
    { id: "incident3", title: "Demande d'accès logiciel", status: "Refusé", priority: "P2" }, // Moyen
    { id: "incident4", title: "Imprimante hors service", status: "Non résolu", priority: "P3" }, // Bas (Non résolu mais P3 -> pas de surlignage)
    { id: "incident5", title: "Mise à jour antivirus", status: "Non affecté", priority: "P2" }, // Moyen
];

// --- Fonctions Utilitaires ---
const getAvailabilityStyle = (availability: string): string => {
    switch (availability) {
        case "Disponible": return "bg-green-100 text-green-700";
        case "Occupé": return "bg-yellow-100 text-yellow-700";
        case "Absent": return "bg-red-100 text-red-700";
        default: return "bg-gray-100 text-gray-700";
    }
};

// Style pour les statuts des incidents
const getStatusStyle = (status: string): string => {
    switch (status) {
        case "Non résolu": return "bg-orange-100 text-orange-800";
        case "Non affecté": return "bg-blue-100 text-blue-800";
        case "Refusé": return "bg-gray-200 text-gray-600";
        default: return "bg-gray-100 text-gray-700";
    }
};

// Style pour les priorités P0-P3
const getPriorityStyle = (priority: string): string => {
    switch (priority) {
        case "P0": return "bg-red-100 text-red-800 font-semibold"; // Critique
        case "P1": return "bg-orange-100 text-orange-800 font-medium"; // Élevé
        case "P2": return "bg-yellow-100 text-yellow-800"; // Moyen
        case "P3": return "bg-sky-100 text-sky-800"; // Bas
        default: return "bg-gray-100 text-gray-700"; // Inconnu
    }
};

// --- Structure de données pour Drag and Drop ---
interface Column {
    id: string;
    title: string;
    items: Incident[];
}
interface Columns {
    [key: string]: Column;
}

// --- Composant IncidentItem (Avec mise en évidence pour Non résolu + P1) ---
const IncidentItem: React.FC<{ incident: Incident; index: number }> = ({ incident, index }) => {
    // Détecter la combinaison spécifique pour la mise en évidence
    const isHighlight = incident.status === "Non résolu" && incident.priority === "P1";

    return (
        <Draggable draggableId={incident.id} index={index}>
            {(provided, snapshot) => {
                // Construire les classes conditionnellement pour le style
                const baseClasses = "p-3 mb-2 border rounded-lg text-sm shadow-sm transition-all duration-150 ease-in-out"; // Garde 'border' de base
                let stateClasses = ""; // Classes pour état normal/drag
                let highlightBorderClass = ""; // Classe pour la bordure spéciale

                if (snapshot.isDragging) {
                    // Style pendant le drag
                    stateClasses = "bg-blue-50 ring-2 ring-blue-300 shadow-md border-transparent"; // Cache la bordure normale pdt drag/ring
                } else {
                    // Style de base (fond blanc, hover gris, bordure grise)
                    stateClasses = "bg-white hover:bg-gray-50 border-gray-200";
                    // Si la condition est remplie ET qu'on ne drague pas, on ajoute/remplace la bordure
                    if (isHighlight) {
                        highlightBorderClass = "border-orange-500 border-2"; // Bordure orange épaisse
                    }
                }
                // Combine les classes
                const finalClassName = `${baseClasses} ${stateClasses} ${highlightBorderClass}`;

                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={finalClassName} // Utilise les classes construites
                        style={{
                            ...provided.draggableProps.style,
                        }}
                    >
                        {/* Le contenu interne reste le même */}
                        <div className="flex flex-col space-y-1">
                            <span className="font-medium text-gray-800">{incident.title}</span>
                            <div className="flex items-center space-x-2">
                                {/* Badge Statut */}
                                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold leading-4 ${getStatusStyle(incident.status)}`}>
                                    {incident.status}
                                </span>
                                {/* Badge Priorité */}
                                <span className={`inline-block px-2 py-0.5 rounded-full text-xs leading-4 ${getPriorityStyle(incident.priority)}`}>
                                    {incident.priority}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Draggable>
    );
};

// --- Composant Principal ---
export default function AdminUserProfiles() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [users] = useState<User[]>(initialUsers);
    const [columns, setColumns] = useState<Columns>({});

    // Initialisation des colonnes
    useEffect(() => {
        const initialColumnsData: Columns = {
            'unassigned': { id: 'unassigned', title: 'Incidents non affectés', items: initialIncidents }
        };
        users.forEach(user => {
            initialColumnsData[user.id] = { id: user.id, title: `${user.name} - Incidents`, items: [] };
        });
        setColumns(initialColumnsData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Exécuté une seule fois au montage

    // Filtrage des utilisateurs
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Logique de Drag and Drop
    const handleDragEnd = (result: DropResult) => {
        const { destination, source } = result;
        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }
        const startColumn = columns[source.droppableId];
        const endColumn = columns[destination.droppableId];

        if (startColumn === endColumn) { // Réordonner
            const newItems = Array.from(startColumn.items);
            const [removed] = newItems.splice(source.index, 1);
            newItems.splice(destination.index, 0, removed);
            setColumns(prev => ({ ...prev, [startColumn.id]: { ...startColumn, items: newItems } }));
        } else { // Déplacer entre colonnes
            const startItems = Array.from(startColumn.items);
            const [movedItem] = startItems.splice(source.index, 1);
            const endItems = Array.from(endColumn.items);
            endItems.splice(destination.index, 0, movedItem);
            setColumns(prev => ({
                ...prev,
                [startColumn.id]: { ...startColumn, items: startItems },
                [endColumn.id]: { ...endColumn, items: endItems },
            }));
        }
    };

    // Gestion simple d'erreur d'image
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.currentTarget;
        target.style.display = 'none'; // Cache l'image
        const parent = target.parentElement;
        if (parent) {
            const sibling = parent.querySelector('.fallback-icon'); // Trouve l'icône via sa classe
            if (sibling) {
                sibling.classList.remove('hidden'); // Affiche l'icône
            }
        }
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex min-h-screen bg-gray-100">
                {/* Sidebar */}
                <div className="fixed top-0 left-0 h-full z-10">
                    <Sidebar />
                </div>

                {/* Contenu principal */}
                <div className="ml-64 w-full p-8 flex space-x-6"> {/* Ajustez ml-64 */}

                    {/* --- Section Utilisateurs et Incidents Affectés --- */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex-grow overflow-hidden">
                        <h1 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Utilisateurs et Incidents Affectés</h1>

                        <input
                            type="text"
                            className="w-full p-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Rechercher par nom"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto">
                                <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Utilisateur</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Département</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Disponibilité</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-2/5">Incidents Affectés</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {filteredUsers.map((user) => {
                                    const userColumn = columns[user.id];
                                    return (
                                        <tr key={user.id} className="hover:bg-gray-50 align-top transition-colors duration-150 ease-in-out">
                                            {/* Cellule Utilisateur */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center space-x-3">
                                                    <div className="flex-shrink-0 h-10 w-10 relative">
                                                        {user.profileImage ? (
                                                            <img
                                                                className="h-10 w-10 rounded-full object-cover"
                                                                src={user.profileImage}
                                                                alt={user.name}
                                                                onError={handleImageError}
                                                            />
                                                        ) : null }
                                                        {/* Icône fallback initialement cachée si l'image existe */}
                                                        <FaUserCircle className={`h-10 w-10 text-gray-400 fallback-icon ${user.profileImage ? 'hidden' : ''} absolute top-0 left-0`} />
                                                    </div>
                                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                </div>
                                            </td>
                                            {/* Cellules Département & Disponibilité */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.department}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold leading-5 ${getAvailabilityStyle(user.availability)}`} >
                                                        {user.availability}
                                                    </span>
                                            </td>
                                            {/* Cellule Incidents Affectés (Droppable) */}
                                            <td className="px-4 py-4 text-sm">
                                                <Droppable droppableId={user.id}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.droppableProps}
                                                            className={`p-2 space-y-2 min-h-[80px] rounded-md border border-dashed ${snapshot.isDraggingOver ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-gray-50/50'} transition-colors`}
                                                        >
                                                            {userColumn?.items.length > 0 ? (
                                                                userColumn.items.map((incident, index) => (
                                                                    // Utilise IncidentItem qui gère la mise en évidence
                                                                    <IncidentItem key={incident.id} incident={incident} index={index} />
                                                                ))
                                                            ) : (
                                                                !snapshot.isDraggingOver && <span className="text-xs text-gray-400 italic block text-center py-2">Déposer un incident ici</span>
                                                            )}
                                                            {provided.placeholder}
                                                        </div>
                                                    )}
                                                </Droppable>
                                            </td>
                                            {/* Cellule Actions */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button className="text-indigo-600 hover:text-indigo-900 transition-colors duration-150 ease-in-out">
                                                    Voir Profil
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {/* Ligne si aucun utilisateur */}
                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500">
                                            Aucun utilisateur trouvé correspondant à la recherche.
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* --- Section Incidents non affectés --- */}
                    <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">Incidents non affectés</h2>
                        {columns['unassigned'] ? (
                            <Droppable droppableId="unassigned">
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={`p-3 space-y-2 rounded-md border border-dashed min-h-[200px] ${snapshot.isDraggingOver ? 'border-green-400 bg-green-50' : 'border-gray-200 bg-gray-50/50'} transition-colors`}
                                    >
                                        {columns['unassigned'].items.map((incident, index) => (
                                            // Utilise IncidentItem qui gère la mise en évidence
                                            <IncidentItem key={incident.id} incident={incident} index={index} />
                                        ))}
                                        {provided.placeholder}
                                        {columns['unassigned'].items.length === 0 && !snapshot.isDraggingOver && (
                                            <span className="text-xs text-gray-400 italic block text-center py-2">Aucun incident non affecté.</span>
                                        )}
                                    </div>
                                )}
                            </Droppable>
                        ) : (
                            <p className="text-gray-500 text-center">Chargement...</p>
                        )}
                    </div>
                </div> {/* Fin ml-64 */}
            </div> {/* Fin flex min-h-screen */}
        </DragDropContext>
    );
}
