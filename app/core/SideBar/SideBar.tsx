'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    FaSearch, FaTh, FaBell, FaDatabase,
    FaChartLine, FaCog, FaUser, FaQuestionCircle
} from 'react-icons/fa';
import Image from 'next/image';
import logo from '/public/images/logoo.jpg';

export default function Sidebar() {
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();

    return (
        <div
            className={`bg-red-600 fixed top-0 left-0 text-white h-screen p-4 
                        transition-all duration-300 overflow-hidden 
                        ${isHovered ? 'w-20' : 'w-16'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex justify-center mb-8">
                <Image src={logo} alt="Logo" width={isHovered ? 100 : 60} height={60} className="object-contain transition-all" />
            </div>

            <nav className="flex flex-col space-y-6">
                <SidebarIcon icon={<FaSearch size={24} />} label="Search"  onClick={() => router.push('/core/incidents-details')} />
                <SidebarIcon icon={<FaTh size={24} />} label="Incidents" onClick={() => router.push('/core/incident-list')} />
                <SidebarIcon icon={<FaBell size={24} />} label="Notifications" onClick={() => router.push('/core/notification-page')} />
                <SidebarIcon icon={<FaDatabase size={24} />} label="Database" />
                <SidebarIcon icon={<FaChartLine size={24} />} label="Dashboard" onClick={() => router.push('/core/Dashboards')} />
                <SidebarIcon icon={<FaCog size={24} />} label="Tasks" onClick={() => router.push('/core/tasks-dashboard')} />
                <SidebarIcon icon={<FaUser size={24} />} label="Employees" onClick={() => router.push('/core/employees-dashboard')} />
                <SidebarIcon icon={<FaQuestionCircle size={24} />} label="Help" />
            </nav>
        </div>
    );
}

function SidebarIcon({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick?: () => void }) {
    return (
        <div
            onClick={onClick}
            className="flex items-center text-white cursor-pointer space-x-3 transition-all"
        >
            <div>{icon}</div>
            <span className="whitespace-nowrap text-sm hidden group-hover:inline">{label}</span>
        </div>
    );
}
