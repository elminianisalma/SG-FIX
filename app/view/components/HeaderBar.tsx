"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, UserCircle, LogOut } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HeaderBar = () => {
    const router = useRouter();
    const hasNotification = true;
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    const user = {
        name: "Omar Bari",
        email: "omar.bari@email.com",
        role: "Admin"
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
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
        // CHANGEMENT ICI: py-2 -> py-3 pour un peu plus de hauteur
        <header className="bg-white shadow-md px-6 py-3 flex items-center justify-between text-black">
            {/* Left */}
            <div className="flex-1" />

            {/* Center: Logo (un peu plus grand) */}
            <div className="flex justify-center flex-1">
                <Image
                    src="/images/logoImage.png"
                    alt="Logo SG-FIX"
                    width={220}  // <<< CHANGEMENT
                    height={70}   // <<< CHANGEMENT
                    priority
                />
            </div>

            {/* Right: Icons (un peu plus grands) */}
            <div className="flex justify-end flex-1 items-center gap-5 relative">
                <div
                    className="relative cursor-pointer"
                    onClick={() => router.push("/core/notification-page")}
                >
                    <Bell className="h-8 w-8 text-black" /> {/* <<< CHANGEMENT */}
                    {hasNotification && (
                        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 border-2 border-white" />
                    )}
                </div>

                <div className="relative" ref={menuRef}>
                    <UserCircle
                        className="h-8 w-8 cursor-pointer text-black transition" // <<< CHANGEMENT
                        onClick={() => setOpen((v) => !v)}
                    />
                    {open && (
                        <div className="absolute right-0 mt-4 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-50 animate-fade-in-down py-3 px-4">
                            <div className="flex flex-col items-center pb-3 border-b border-gray-200">
                                {/* Correction de la couleur de l'icône ici */}
                                <UserCircle className="h-12 w-12 text-gray-500 mb-1" />
                                <div className="font-semibold">{user.name}</div>
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