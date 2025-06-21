'use client';

import { useState, useRef, useEffect } from "react";
import { Bell, LogOut } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HeaderBar = () => {
    const router = useRouter();
    const hasNotification = true;
    const [open, setOpen] = useState(false);
    // Typage explicite de useRef comme HTMLDivElement
    const menuRef = useRef<HTMLDivElement>(null);

    const user = {
        name: "Omar Bari",
        email: "omar.bari@email.com",
        role: "Admin"
    };

    // Extraire les deux premières lettres pour l'avatar avec types explicites
    const getInitials = (name: string): string => {
        return name
            .split(" ")
            .map((word: string) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Vérification si menuRef.current existe avant d'appeler contains
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    return (
        <header className="bg-white shadow-md px-6 py-3 flex items-center justify-between text-black ">
            {/* Left */}
            <div className="flex-1" />
            {/* Center: Logo (un peu plus grand) */}
       <div className="flex justify-center flex-1 mr-9" style={{ marginLeft: '28px' }}>
                    <Image
                        src="/images/logoImage.png"
                        alt="Logo SG-FIX"
                        width={220}
                        height={70}
                        priority
                    />
                    </div>


            {/* Right: Icons (un peu plus grands) */}
            <div className="flex justify-end flex-1 items-center gap-5 relative">
                <div
                    className="relative cursor-pointer"
                    onClick={() => router.push("/core/notification-page")}
                >
                    <Bell className="h-8 w-8 text-black" />
                    {hasNotification && (
                        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 border-2 border-white" />
                    )}
                </div>

                <div className="relative" ref={menuRef}>
                    {/* Avatar cliquable avec nom en dessous */}
                    <div className="flex flex-col items-center cursor-pointer">
                        <div
                            className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-base font-semibold cursor-pointer hover:bg-gray-400 transition"
                            onClick={() => setOpen((v) => !v)}
                        >
                            {getInitials(user.name)}
                        </div>
                        <span className="text-sm font-medium text-gray-700 mt-1">{user.name}</span>
                    </div>

                    {open && (
                        <div className="absolute right-0 mt-4 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50 animate-fade-in-down py-3 px-4">
                            <div className="flex flex-col items-center pb-3 border-b border-gray-200">
                                {/* Avatar avec initiales dans le menu déroulant */}
                                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold mb-1">
                                    {getInitials(user.name)}
                                </div>
                                <div className="font-semibold text-lg">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                                <div className="text-xs text-gray-400">{user.role}</div>
                            </div>
                            <button
                                className="flex items-center gap-2 mt-3 px-2 py-2 w-full text-left text-red-500 hover:bg-gray-100 rounded transition"
                                onClick={() => {
                                    setOpen(false);
                                    router.push("/");
                                }}
                            >
                                <LogOut className="w-5 h-5" /> Se déconnecter
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .animate-fade-in-down {
                    animation: fadeInDown 0.17s cubic-bezier(.39,.575,.565,1) both;
                }
                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-10px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </header>
    );
};

export default HeaderBar;