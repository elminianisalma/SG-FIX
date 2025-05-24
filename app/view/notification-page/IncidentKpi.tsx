import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface IncidentKPIsProps {
  total: number;
  critiques: number;
  enCours: number;
}

const IncidentKPIs: React.FC<IncidentKPIsProps> = ({
  total,
  critiques,
  enCours,
}) => {
  const data = [
    { name: "Total", value: total },
    { name: "En cours", value: enCours },
    { name: "Critiques", value: critiques },
  ];

  const COLORS = ["#A7001E", "#F97316", "#EF4444"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Bar Chart */}
      <div className="bg-white shadow-md p-4 rounded-xl">
        <h3 className="text-lg font-semibold mb-2">Nombre d'incidents</h3>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white shadow-md p-4 rounded-xl">
        <h3 className="text-lg font-semibold mb-2">Répartition des incidents</h3>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncidentKPIs;
