'use client';
import { useState } from "react";
import { CheckCircle, Search, AlertTriangle, Circle } from "lucide-react";

const people = [
    {
        name: "Fatima ezzahra Arbaoui",
        title: "Backend Tech Lead",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
        status: "green",
        isAvailable: true,
        activeIncidents: 2,
    },
    {
        name: "EL Mehdi Bouhlaoui",
        title: "Backend Tech Lead",
        avatar: "https://randomuser.me/api/portraits/women/90.jpg",
        status: "red",
        isAvailable: false,
        activeIncidents: 5,
    },
    {
        name: "Keba Demme",
        title: "Backend Tech Lead",
        avatar: "https://randomuser.me/api/portraits/women/64.jpg",
        status: "green",
        isAvailable: true,
        activeIncidents: 0,
    },
    {
        name: "Hicham Zeroual",
        title: "Frontend Tech Lead",
        avatar: "",
        status: "red",
        isAvailable: false,
        activeIncidents: 3,
    },
];

function getFirstLetter(name: string) {
    return name.charAt(0).toUpperCase();
}

function stringToColor(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 80%)`;
}

interface SearchPeopleProps {
    onAssign: () => void;
    onClose: () => void; // Add onClose prop
}

export default function SearchPeople({ onAssign, onClose }: SearchPeopleProps) {
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<string | null>(null);

    const filteredPeople = people.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleFinish = () => {
        if (selected) {
            setSelected(null); // Reset the selected state
            onAssign(); // Trigger the parent to handle assignment
            onClose(); // Close the popup
        }
    };

    return (
        <div className="bg-white rounded-xl w-full max-w-2xl mx-auto pb-4">
            {/* Barre de recherche */}
            <div className="flex items-center gap-2 border-b border-gray-200 px-3 pt-4 pb-2">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Rechercher une personne..."
                    className="flex-1 outline-none bg-transparent text-base text-gray-600 placeholder-gray-400"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Liste des personnes */}
            <div className="max-h-64 overflow-y-auto pt-2">
                {filteredPeople.map((person, idx) => {
                    const isSelected = selected === person.name;
                    const incidentColor =
                        person.activeIncidents === 0
                            ? "text-gray-500"
                            : person.activeIncidents <= 3
                            ? "text-orange-500"
                            : "text-red-500";

                    return (
                        <div
                            key={idx}
                            onClick={() => setSelected(person.name)}
                            className={`flex flex-col gap-2 px-3 py-3 cursor-pointer transition-all duration-200 ${
                                isSelected ? "bg-blue-50" : "hover:bg-gray-50"
                            }`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3">
                                    <div
                                        className="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-base"
                                        style={{
                                            backgroundColor: stringToColor(person.name),
                                            color: "#333",
                                        }}
                                    >
                                        {getFirstLetter(person.name)}
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <p className="font-medium text-gray-900 text-base">{person.name}</p>
                                        <p className="text-sm text-gray-500">{person.title}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-1">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1">
                                          
                                            <span className="text-sm text-gray-600">
                                                {person.isAvailable ? "Disponible" : "Indisponible"}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <AlertTriangle className={`w-4 h-4 ${incidentColor}`} />
                                            <span className={`text-sm ${incidentColor}`}>
                                                {person.activeIncidents}
                                            </span>
                                        </div>

                                        {isSelected && <CheckCircle className="w-5 h-5 text-blue-600" />}
                                    </div>

                                    {person.activeIncidents > 0 && (
                                        <a
                                            href={`/core/historique-incident}`}
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-sm text-blue-500 hover:underline"
                                        >
                                            Consulter les incidents
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Bouton Terminer */}
            <div className="flex justify-end px-4 mt-4">
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={handleFinish}
                    disabled={!selected}
                >
                    Terminer
                </button>
            </div>
        </div>
    );
}