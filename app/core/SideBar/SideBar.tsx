'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    FaSearch, FaTh, FaHeart, FaShoppingBag, FaShieldAlt,
    FaDatabase, FaChartLine, FaCog, FaUser, FaQuestionCircle
} from 'react-icons/fa';
import Image from 'next/image';
import logo from '/public/images/logoo.jpg';

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
  const router=useRouter();
    return (
        <div className={`bg-red-600 fixed top-0 left-0 text-white h-screen p-4 transition-all ${isCollapsed ? 'w-16' : 'w-20'}`}>
            <button onClick={() => setIsCollapsed(!isCollapsed)} className="mb-4 text-white">
                {isCollapsed ? '>' : '<'}
            </button>

            <div className="flex justify-center mb-20">
                <Image src={logo} alt="Logo" width={60} height={60} className="object-contain" />
            </div>

            <nav className="flex flex-col space-y-6">
                <div className="flex items-center justify-center text-white cursor-pointer">
                    <FaSearch size={24} />
                </div>
                <div
                    onClick={() => router.push('/core/incident-list')}
                    className="flex items-center justify-center text-white cursor-pointer"
                >
                    <FaTh size={24} />
                </div>
                <div className="flex items-center justify-center text-white cursor-pointer">
                    <FaShieldAlt size={24} />
                </div>
                <div className="flex items-center justify-center text-white cursor-pointer">
                    <FaDatabase size={24} />
                </div>
                <div className="flex items-center justify-center text-white cursor-pointer">
                    <FaChartLine size={24} />
                </div>
                <div className="flex items-center justify-center text-white cursor-pointer">
                    <FaCog size={24} />
                </div>
                <div className="flex items-center justify-center text-white cursor-pointer">
                    <FaUser size={24} />
                </div>
                <div className="flex items-center justify-center text-white cursor-pointer">
                    <FaQuestionCircle size={24} />
                </div>
            </nav>
        </div>
    );
}
