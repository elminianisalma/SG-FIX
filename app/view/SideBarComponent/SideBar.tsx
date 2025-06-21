"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaSearch,
  FaCalendarCheck,
  FaBell,
  FaServer,
  FaChartPie,
  FaTasks,
  FaUsers,
  FaQuestionCircle,
  FaCloudSun,
  FaSignOutAlt,
} from "react-icons/fa";

// Définir les rôles possibles
const ROLES = {
  API_USER: "apiUser",
  BUSINESS_ANALYST: "ba",
  DEVELOPER: "developer",
  ADMIN: "admin",
};

// Définir les permissions comme une liste de chaînes
const rolePermissions = {
  [ROLES.API_USER]: ["Search", "Incidents", "Follow Status", "Notifications", "API Weather"],
  [ROLES.BUSINESS_ANALYST]: ["Search", "Incidents", "Assign Incident", "Follow Status", "Notifications", "Employees"],
  [ROLES.DEVELOPER]: ["Incidents", "Take Charge", "Update Status", "Notifications"],
  [ROLES.ADMIN]: ["Search", "Incidents", "Manage Roles", "Dashboard", "Notifications"],
};

// Mapping des labels aux icônes et chemins (statique pour simplicité)
const labelToIconPath = {
  Search: { icon: <FaSearch size={20} />, path: "/view/incidents-details" },
  Incidents: { icon: <FaTasks size={20} />, path: "/view/incident-list" },
  "Follow Status": { icon: <FaCalendarCheck size={20} />, path: "/view/status-tracking" },
  Notifications: { icon: <FaBell size={20} />, path: "/view/notification-page" },
  "Assign Incident": { icon: <FaServer size={20} />, path: "/view/assign-incident" },
  Employees: { icon: <FaUsers size={20} />, path: "/view/employees-dashboard" },
  "Take Charge": { icon: <FaCalendarCheck size={20} />, path: "/view/take-charge" },
  "Update Status": { icon: <FaServer size={20} />, path: "/view/update-status" },
  "Manage Roles": { icon: <FaUsers size={20} />, path: "/view/manage-roles" },
  Dashboard: { icon: <FaChartPie size={20} />, path: "/view/dashboards" },
  "API Weather": { icon: <FaCloudSun size={20} />, path: "/view/api-meteo" },
};

export default function Sidebar() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("userRole") || ROLES.API_USER;
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    router.push("/login");
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const permissions = userRole ? rolePermissions[userRole] : [];

  return (
    <div className="bg-red-600 fixed top-0 left-0 z-10 text-white h-screen w-48 flex flex-col justify-between p-4">
      <nav className="flex flex-col space-y-6 mt-24">
        {permissions.map((label, index) => {
          const { icon, path } =  { icon: null, path: "#" };
          return (
            <div
              key={index}
              onClick={() => handleNavigation(path)}
              className="flex items-center space-x-3 text-white cursor-pointer hover:scale-105 transition-all"
            >
              <div>{icon}</div>
              <span className="text-[16px]">{label}</span>
            </div>
          );
        })}
      </nav>

      <div className="mt-6">
        <div
          onClick={handleLogout}
          className="flex items-center space-x-3 text-white cursor-pointer hover:scale-105 transition-all"
        >
          <div><FaSignOutAlt size={20} /></div>
          <span className="text-[16px]">Logout</span>
        </div>
      </div>
    </div>
  );
}