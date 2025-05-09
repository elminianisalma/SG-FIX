'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    FaSearch,
    FaCalendarCheck,
    FaBell,
    FaServer,
    FaChartPie,
    FaTasks,
    FaUsers,
    FaQuestionCircle,
    FaCloudSun
} from 'react-icons/fa';
import Image from 'next/image';
import logo from '/public/images/logoo.jpg';
import HeaderBar from '../components/HeaderBar';

export default function Sidebar() {
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();

    return (
        <>
            <HeaderBar isSidebarHovered={isHovered} /> 

            <div
                className={`bg-red-600 fixed top-0 left-0 z-10 text-white h-screen p-4 
                            transition-all duration-300 overflow-hidden 
                            ${isHovered ? 'w-48' : 'w-16'}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >

                <div className="flex justify-center mb-8">
                    <Image
                        src={logo}
                        alt="Logo"
                        width={80}
                        height={80}
                        className="w-[80px] h-[80px] object-contain transition-all duration-300"
                    />
                </div>

                <nav className="flex flex-col space-y-6">
                    <SidebarIcon icon={<FaSearch size={24} />} label="Search" isHovered={isHovered} onClick={() => router.push('/core/incidents-details')} />
                    <SidebarIcon icon={<FaTasks size={24} />} label="Incidents" isHovered={isHovered} onClick={() => router.push('/core/incident-list')} />
                    <SidebarIcon icon={<FaBell size={24} />} label="Notifications" isHovered={isHovered} onClick={() => router.push('/core/notification-page')} />
                    <SidebarIcon icon={<FaServer size={24} />} label="Database" isHovered={isHovered} />
                    <SidebarIcon icon={<FaChartPie size={24} />} label="Dashboard" isHovered={isHovered} onClick={() => router.push('/core/Dashboards')} />
                    <SidebarIcon icon={<FaCalendarCheck size={24} />} label="Tasks" isHovered={isHovered} onClick={() => router.push('/core/tasks-dashboard')} />
                    <SidebarIcon icon={<FaUsers size={24} />} label="Employees" isHovered={isHovered} onClick={() => router.push('/core/employees-dashboard')} />
                    <SidebarIcon icon={<FaCloudSun size={24} />} label="API Weather" isHovered={isHovered} onClick={() => router.push('/core/api-meteo')}/>
                    <SidebarIcon icon={<FaQuestionCircle size={24} />} label="Help" isHovered={isHovered} />
                </nav>
            </div>
        </>
    );
}

function SidebarIcon({
                         icon,
                         label,
                         onClick,
                         isHovered
                     }: {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    isHovered: boolean;
}) {
    return (
        <div
            onClick={onClick}
            className="flex items-center text-white cursor-pointer space-x-3 transition-all hover:scale-105"
        >
            <div>{icon}</div>
            {isHovered && <span className="text-[18px]">{label}</span>}
        </div>
    );
}
