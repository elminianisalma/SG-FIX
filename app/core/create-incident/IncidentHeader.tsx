import { FileText, UserCheck } from 'lucide-react';

interface IncidentHeaderProps {
    step: number;
    progress: number; // 0 à 100
}

const IncidentHeader = ({ step, progress }: IncidentHeaderProps) => {
    const isDeclaration = step === 1;

    return (
        <div className="bg-black/75 backdrop-blur-sm border border-gray-900 rounded-xl bg-white shadow-md py-6 px-6 flex flex-col items-center justify-center space-y-3">
            {/* Icône rouge */}
            <div className="rounded-full bg-red-600 p-3 flex items-center justify-center">
                {isDeclaration ? (
                    <FileText className="h-7 w-7 text-white" />
                ) : (
                    <UserCheck className="h-7 w-7 text-white" />
                )}
            </div>

            {/* Titre en noir */}
            <h1 className="text-2xl font-semibold text-black px-4 py-1 rounded-md text-center">
                {isDeclaration ? "Déclaration d'Incident" : "Assigner l'Incident"}
            </h1>

            {/* Barre de progression */}
            <div className="w-full mt-2 bg-gray-300 rounded-full h-3 overflow-hidden">
                <div
                    className="h-full bg-red-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Pourcentage en noir */}
            <p className="text-sm text-black mt-1">{progress}% complété</p>
        </div>
    );
};

export default IncidentHeader;
