import { IncidentDetail } from "@/app/models/IncidentDetail";
import { IncidentPriority } from "@/app/utils/IncidentPriority";
import { IncidentStatus } from "@/app/utils/IncidentStatus";
import { PieChart, Pie, Cell } from "recharts";
import { AlertCircle, AlertTriangle, List, Info } from "lucide-react";

export function KPICards({ incidents }: { incidents: IncidentDetail[] }) {
  const total = incidents.length;
  const soumis = incidents.filter(i => i.statutIncident === IncidentStatus.SOUMIS).length;
  const critiques = incidents.filter(i => i.priorite === IncidentPriority.CRITIQUE).length;
  const resolus = incidents.filter(i => i.statutIncident === IncidentStatus.RESOLU).length;
  const actifs = incidents.filter(i =>
    [IncidentStatus.SOUMIS, IncidentStatus.PRIS_EN_CHARGE].includes(i.statutIncident)
  ).length;

  const pourcentageResolus = total > 0 ? Math.round((resolus / total) * 100) : 0;

  const pieData = [
    { name: "Résolus", value: resolus },
    { name: "Restants", value: total - resolus }
  ];

  const COLORS = ["#00C49F", "#E0E0E0"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {/* Résolus en % - Graphique circulaire */}
      <div className="bg-white p-6 rounded-xl shadow flex items-center justify-between transform transition-all duration-500 ease-out hover:scale-105">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <Info className="w-6 h-6 text-green-500" />
            <h2 className="text-gray-500 text-sm">Résolus</h2>
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-2">{pourcentageResolus}%</p>
          <p className="text-sm text-gray-500 mt-1">
            <span className="text-green-500 font-semibold">{resolus}</span> résolus
          </p>
        </div>
        <PieChart width={80} height={80}>
          <Pie
            data={pieData}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={25}
            outerRadius={35}
            startAngle={90}
            endAngle={-270}
          >
            {pieData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>

      {/* Total incidents */}
      <div className="bg-white p-6 rounded-xl shadow flex flex-col transform transition-all duration-500 ease-out hover:scale-105">
        <div className="flex items-center gap-3">
          <List className="w-6 h-6 text-blue-500" />
          <h2 className="text-gray-500 text-sm">Total incidents</h2>
        </div>
        <p className="text-2xl font-bold text-gray-800 mt-2">{total}</p>
        <p className="text-sm text-gray-500 mt-1">
          <span className="text-blue-500 font-semibold">{actifs}</span> actifs
        </p>
      </div>

      {/* Incidents soumis */}
      <div className="bg-white p-6 rounded-xl shadow flex flex-col transform transition-all duration-500 ease-out hover:scale-105">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-yellow-500" />
          <h2 className="text-gray-500 text-sm">Incidents soumis</h2>
        </div>
        <p className="text-2xl font-bold text-gray-800 mt-2">{soumis}</p>
        <p className="text-sm text-gray-500 mt-1">
          <span className="text-yellow-500 font-semibold">{soumis}</span> en attente
        </p>
      </div>

      {/* Incidents critiques */}
      <div className="bg-white p-6 rounded-xl shadow flex flex-col transform transition-all duration-500 ease-out hover:scale-105">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-red-500" />
          <h2 className="text-gray-500 text-sm">Incidents critiques</h2>
        </div>
        <p className="text-2xl font-bold text-gray-800 mt-2">{critiques}</p>
        <p className="text-sm text-gray-500 mt-1">
          <span className="text-red-500 font-semibold">{critiques}</span> critiques
        </p>
      </div>
    </div>
  );
}