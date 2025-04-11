import { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
    return <div className="border rounded-lg shadow-sm bg-white">{children}</div>;
}

export function CardContent({children, className}: { children: ReactNode, className?: string }) {
    return <div className="p-4">{children}</div>;
}
