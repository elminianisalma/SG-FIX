
import { ReactNode } from "react";

export function Avatar({ children }: { children: ReactNode }) {
    return <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">{children}</div>;
}

export function AvatarFallback({ children }: { children: ReactNode }) {
    return <span className="text-sm font-medium">{children}</span>;
}

export function AvatarImage({ src }: { src: string }) {
    return <img src={src} alt="" className="w-10 h-10 rounded-full object-cover" />;
}
