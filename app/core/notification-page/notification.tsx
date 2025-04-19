import { useState } from "react";
import { Card, CardContent } from "../../common/Card";
import { Button } from "../../common/Button";
import { Avatar } from "../../common/avatar";
import { SignalIcon } from "lucide-react";
import Sidebar from "@/app/core/SideBar/SideBar";
import ReassignModal from "./ReaffectModal";
import { useRouter } from 'next/navigation';
import {getPriorityStyle, IncidentPriority} from "@/app/utils/IncidentPriority";

export default function IncidentNotificationPage() {
    const [showReassignDialog, setShowReassignDialog] = useState(false);
    const [selectedIncident, setSelectedIncident] = useState(null);
    const [removedIncidents, setRemovedIncidents] = useState<number[]>([]);
    const route = useRouter();



    const [incidents, setIncidents] = useState([
        {
            id: 1,
            title: "Incident lors de l'utilisation de l'API messaging",
            description: "Une fuite de gaz a été détectée au bâtiment B - 3ème étage.",
            reportedBy: "Ahmed Yassine",
            date: "10 Avril 2025 - 14h32",
            priority: "HIGH",
            status: "Non traité",
        },
        {
            id: 2,
            title: "Incident dans l'API Bankup",
            description: "Problème de climatisation au bureau C - 2ème étage.",
            reportedBy: "Sabrina L.",
            date: "10 Avril 2025 - 15h05",
            priority: "LOW",
            status: "Non traité",
        },
        {
            id: 3,
            title: "Erreur de base de données",
            description: "Une erreur de connexion à la base a été détectée sur le serveur principal.",
            reportedBy: "Youssef H.",
            date: "10 Avril 2025 - 16h20",
            priority: "MEDIUM",
            status: "Non traité",
        },
        {
            id: 4,
            title: "Crash de l’application mobile",
            description: "L’application mobile se ferme immédiatement après le lancement.",
            reportedBy: "Sarah B.",
            date: "11 Avril 2025 - 09h14",
            priority: "HIGH",
            status: "Non traité",
        }
    ]);

    const getRandomAvatarUrl = (name: string) =>
        `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`;

    const handleReassign = () => {
        setShowReassignDialog(true);
    };

    const handleTakeCharge = (id: number) => {
        // Mettre à jour le statut
        setIncidents(prev =>
            prev.map(incident =>
                incident.id === id ? { ...incident, status: "Pris en charge" } : incident
            )
        );

        // Ajouter une animation de disparition
        setRemovedIncidents(prev => [...prev, id]);

        // Supprimer de la liste après animation
        setTimeout(() => {
            setIncidents(prev => prev.filter(incident => incident.id !== id));
            setRemovedIncidents(prev => prev.filter(incidentId => incidentId !== id));
        }, 500); // Durée de l'animation (ms)
    };

    return (
        <div className="p-6 space-y-6 max-w-4xl mx-auto">
            <Sidebar />
            <h2 className="text-3xl font-bold mb-4">Incidents à traiter</h2>

            {incidents.map((incident) => (
                <Card
                    key={incident.id}
                    className={`transition-all duration-500 ease-in-out transform ${
                        removedIncidents.includes(incident.id) ? "opacity-0 scale-95" : "opacity-100 scale-100"
                    }`}
                >
                <CardContent className="space-y-5 p-5">
                        <div className="flex gap-4 items-start">
                            <Avatar>
                                <img
                                    src={getRandomAvatarUrl(incident.reportedBy)}
                                    alt={incident.reportedBy}
                                    className="w-12 h-12 rounded-full"
                                />
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <p className="text-xl font-semibold">{incident.title}</p>
                                    <div className={`flex items-center px-2 py-1 rounded-md ${getPriorityStyle(incident.priority as IncidentPriority)}`}>
                                        <span className="text-base font-bold">{incident.priority}
                                          </span>
                                    </div>

                                </div>

                                <p className="mt-2 text-base text-gray-700">{incident.description}</p>
                                <div className="mt-2 text-sm text-gray-500">
                                    Signalé par: {incident.reportedBy} · {incident.date}
                                </div>
                                <div className="mt-1 text-base font-medium">
                                    Statut: <span className={incident.status === "Pris en charge" ? "text-green-600" : "text-blue-600"}>
                                        {incident.status}
                                    </span>
                                </div>

                                <div className="flex gap-4 mt-4 align-content-center">
                                    <Button size="lg" variant="outline" className="text-center">Voir Détails</Button>
                                    <Button
                                        size="lg"
                                        variant="default"
                                        disabled={incident.status === "Pris en charge"}
                                        onClick={() => handleTakeCharge(incident.id)}
                                    >
                                        Prendre en charge
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}

            <ReassignModal isOpen={showReassignDialog} onClose={() => setShowReassignDialog(false)} />
        </div>
    );
}
