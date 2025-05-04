"use client";

import { Bell } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HeaderBar = () => {
    const router = useRouter();
    const hasNotification = true;

    return (
        <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between text-black">
            {/* Espace vide gauche */}
            <div className="w-1/3" />

            {/* Logo centré */}
            <div className="flex justify-center w-1/3">
                <Image
                    src="/images/logoImage.png"
                    alt="Logo SG-FIX"
                    width={280}   // ✅ Agrandi
                    height={90}   // ✅ Agrandi
                    priority
                />
            </div>

            {/* Notification à droite */}
            <div className="flex justify-end w-1/3">
                <div
                    className="relative cursor-pointer"
                    onClick={() => router.push("/core/notification-page")}
                >
                    <Bell className="h-7 w-7 text-black" />
                    {hasNotification && (
                        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 border-2 border-white" />
                    )}
                </div>
            </div>
        </header>
    );
};

export default HeaderBar;
