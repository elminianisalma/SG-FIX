'use client';
import { useState } from "react";
import { CheckCircle, Search, X } from "lucide-react";

const people = [
    {
        name: "Credence Anderson",
        title: "Senior Product Manager of Sale",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
        status: "green",
    },
    {
        name: "Creta Smith",
        title: "Senior Product Designer",
        avatar: "https://randomuser.me/api/portraits/women/90.jpg",
        status: "red",
    },
    {
        name: "Samantha Cressman",
        title: "Interim Designer",
        avatar: "https://randomuser.me/api/portraits/women/64.jpg",
        status: "green",
    },
    {
        name: "Lucas Bennett",
        title: "UX Intern",
        avatar: "",
        status: "red",
    },
];

function getInitials(name: string) {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
}

function stringToColor(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 80%)`;
}

export default function SearchPeople() {
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<string | null>(null);

    const filteredPeople = people.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl mx-auto">
            {/* Barre de recherche */}
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2 mb-4">
                <Search className="w-5 h-5 text-gray-500" />
                <input
                    type="text"
                    placeholder="Search people"
                    className="flex-1 outline-none bg-transparent text-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                    <button onClick={() => setSearch("")}>
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                )}
            </div>

            {/* Personnes sous forme de choix sélectionnable */}
            <div className="space-y-3">
                {filteredPeople.map((person, idx) => {
                    const isSelected = selected === person.name;
                    return (
                        <div
                            key={idx}
                            onClick={() => setSelected(person.name)}
                            className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all duration-200
                            ${isSelected ? "border-green-500 shadow-lg ring-1 ring-green-300 bg-green-50" : "hover:bg-gray-50"}`}
                        >
                            <div className="flex items-center gap-3">
                                {person.avatar ? (
                                    <img
                                        src={person.avatar}
                                        alt={person.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                                        style={{
                                            backgroundColor: stringToColor(person.name),
                                            color: "#333",
                                        }}
                                    >
                                        {getInitials(person.name)}
                                    </div>
                                )}
                                <div>
                                    <p className="font-medium text-gray-900 text-sm">{person.name}</p>
                                    <p className="text-xs text-gray-500">{person.title}</p>
                                </div>
                            </div>
                            <div>
                                {isSelected ? (
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                ) : (
                                    <div className="w-5 h-5 rounded-full border border-gray-300" />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>


        </div>
    );
}
