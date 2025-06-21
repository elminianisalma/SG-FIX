'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

export default function AdminKpiDashboard() {
  const statusData = [
    {
      name: 'Déclaré',
      value: 14,
      color: '#F9E9D2',
      borderColor: '#E7C8A2',
    },
    {
      name: 'Affecté',
      value: 10,
      color: '#DCECFB',
      borderColor: '#B5D4ED',
    },
    {
      name: 'Résolu',
      value: 8,
      color: '#DDEEDA',
      borderColor: '#AACDA2',
    },
  ];

  const resolutionTimeTrend = [
    { name: 'Lun', time: 3.4 },
    { name: 'Mar', time: 2.8 },
    { name: 'Mer', time: 4.1 },
    { name: 'Jeu', time: 3.7 },
    { name: 'Ven', time: 3.1 },
  ];

  const serviceImpactData = [
    {
      name: 'Interop',
      value: 7,
      color: '#F9E9D2',
      borderColor: '#C79E6B',
    },
    {
      name: 'Bankup',
      value: 5,
      color: '#A3232B',
      borderColor: '#94B8DA',
    },
    {
      name: 'Cockpit',
      value: 3,
      color: '#DDEEDA',
      borderColor: '#7FAF7B',
    },
  ];
  const renderLegend = (props: any) => {
  const { payload } = props;
  return (
    <ul className="flex justify-center gap-4 mt-2">
      {payload.map((entry: any, index: number) => (
        <li key={`item-${index}`} className="text-xs text-black">
          <span className="inline-block w-3 h-3 mr-1 rounded" style={{ backgroundColor: entry.color }}></span>
          {entry.value}
        </li>
      ))}
    </ul>
  );
};


  return (
    <div className="bg-gray-50 rounded-xl shadow-inner px-4 py-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
        {/* Répartition des statuts */}
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-sm font-medium text-gray-600 mb-2 text-center">
            Répartition des statuts
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={statusData}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip itemStyle={{ fontSize: 11 }} labelStyle={{ fontSize: 11 }} />
              <Bar dataKey="value">
                {statusData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.color}
                    stroke={entry.borderColor}
                    strokeWidth={2}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Temps moyen de résolution */}
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-sm font-medium text-gray-600 mb-2 text-center">
            Temps moyen de résolution (h)
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={resolutionTimeTrend}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip itemStyle={{ fontSize: 11 }} labelStyle={{ fontSize: 11 }} />
              <Line
                type="monotone"
                dataKey="time"
                stroke="#6B7280"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top services impactés */}
     <div className="bg-white rounded-xl shadow p-4">
            <h3 className="text-sm font-medium text-red-600 mb-2 text-center">
                Top services impactés
            </h3>
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                    <Pie
                        data={serviceImpactData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={60}
                        label={({ name, value }) => `${name} (${value})`}
                        labelLine={false}
                    >
                        {serviceImpactData.map((entry, index) => (
                        <Cell
                            key={index}
                            fill={entry.color}
                            stroke={entry.borderColor}
                            strokeWidth={3}
                        />
                        ))}
                    </Pie>

                    {/* ✅ Légende en bas avec texte en noir */}
                   <Legend
                        verticalAlign="bottom"
                        height={30}
                        content={renderLegend}
                        />


                    {/* ✅ Tooltip en rouge */}
                    <Tooltip
                        itemStyle={{ fontSize: 11, color: '#dc2626' }}
                        labelStyle={{ fontSize: 11, color: '#dc2626' }}
                    />
                    </PieChart>
                </ResponsiveContainer>
                </div>

      </div>
    </div>
  );
}
