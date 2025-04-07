'use client';
import { FiHome, FiFileText, FiSettings } from 'react-icons/fi';

export default function SideBar() {
  return (
    <div className="w-64 bg-black text-white flex flex-col p-6">
      <h2 className="text-xl font-bold mb-8">Incident Manager</h2>
      <div className="space-y-6 text-sm">
        <div className="flex items-center gap-3 cursor-pointer hover:text-gray-300">
          <FiHome size={18} />
          <span>Dashboard</span>
        </div>
        <div className="flex items-center gap-3 cursor-pointer hover:text-gray-300">
          <FiFileText size={18} />
          <span>Incidents</span>
        </div>
        <div className="flex items-center gap-3 cursor-pointer hover:text-gray-300">
          <FiSettings size={18} />
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
}
