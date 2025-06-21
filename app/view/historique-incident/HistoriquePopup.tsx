'use client';

import React from 'react';
import {
  X, Info, CheckCircle, AlertCircle, CalendarDays, User, Tag, Clock, Copy, Check,
} from 'lucide-react';
import { IncidentDetail } from '@/app/models/IncidentDetail';

interface Props {
  incident: IncidentDetail;
  onClose: () => void;
}

const StatusBadge = ({ status }: { status: string }) => {
  const base = 'inline-flex items-center gap-1 px-3 py-1 rounded-full text-base font-semibold border';
  switch (status) {
    case 'DECLARED':
      return <div className={`${base} bg-yellow-100 text-yellow-700 border-yellow-300`}>📝 Déclaré</div>;
    case 'AFFECTE':
      return <div className={`${base} bg-purple-100 text-purple-700 border-purple-300`}>👤 Affecté</div>;
    case 'IN_ANALYSIS':
      return <div className={`${base} bg-orange-100 text-orange-700 border-orange-300`}>🔍 Analyse</div>;
    case 'TRANSFERRED':
      return <div className={`${base} bg-blue-100 text-blue-700 border-blue-300`}>📤 Transféré</div>;
    case 'RESOLVED':
      return <div className={`${base} bg-green-100 text-green-700 border-green-300`}>✅ Résolu</div>;
    default:
      return <div className={`${base} bg-gray-100 text-gray-700 border-gray-300`}>❓ Inconnu</div>;
  }
};

const PriorityBadge = ({ priority }: { priority: string }) => {
  const map = {
    CRITIQUE: ['bg-red-100 text-red-700', 'Critique'],
    HAUTE: ['bg-orange-100 text-orange-700', 'Haute'],
    MOYENNE: ['bg-yellow-100 text-yellow-700', 'Moyenne'],
    BASSE: ['bg-green-100 text-green-700', 'Basse'],
  };
  const [style, label] = map[priority?.toUpperCase() as keyof typeof map] || ['bg-gray-100 text-gray-700', 'Inconnue'];
  return <span className={`inline-block px-3 py-1 rounded-full font-medium text-base ${style}`}>{label}</span>;
};

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value?: string | React.ReactNode }) => (
  <p className="flex items-center gap-2 text-[17px] text-gray-800">
    {icon}
    <span className="font-semibold">{label} :</span> <span className="text-gray-700">{value}</span>
  </p>
);

const HistoriquePopup = ({ incident, onClose }: Props) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto relative p-4 md:p-6 text-[18px]">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-red-600" onClick={onClose}>
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-5">
          <Info className="text-blue-500 w-6 h-6" />
          Détails de l’incident
        </h2>

        <div className="mb-5">
          <StatusBadge status={incident.statutIncident} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <InfoItem icon={<span className="font-semibold text-gray-800 text-base">#</span>} label="ID" value={incident.id.toString()} />
          <InfoItem icon={<Tag className="w-5 h-5 text-blue-400" />} label="Titre" value={incident.titre} />
          <InfoItem icon={<CalendarDays className="w-5 h-5 text-blue-400" />} label="Créé le" value={new Date(incident.dateDeclaration).toLocaleString()} />
          <InfoItem icon={<span className="w-5 h-5 text-orange-500 text-base">P</span>} label="Priorité" value={<PriorityBadge priority={incident.priorite} />} />
          {incident.coeDev_fullName && <InfoItem icon={<User className="w-5 h-5 text-gray-400" />} label="Assigné à" value={incident.coeDev_fullName} />}
          {incident.client_firstName && <InfoItem icon={<User className="w-5 h-5 text-purple-500" />} label="Déclaré par" value={incident.client_fullName} />}
          {incident.application && <InfoItem icon={<Tag className="w-5 h-5 text-indigo-500" />} label="Application" value={incident.application} />}
        </div>

        {incident.description && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-[17px] text-gray-700 whitespace-pre-line border border-gray-200 p-4 rounded">
              {incident.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoriquePopup;
