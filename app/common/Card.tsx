import { ReactNode } from "react";

import { HTMLAttributes } from "react";

export function Card({ children, className = "", ...rest }: HTMLAttributes<HTMLDivElement>) {
    return <div className={`border rounded-lg shadow-sm bg-white ${className}`} {...rest}>{children}</div>;
}


export function CardContent({children, className}: { children: ReactNode, className?: string }) {
    return <div className="p-4">{children}</div>;
}
