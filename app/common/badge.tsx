import { ReactNode } from "react";
import clsx from "clsx";

interface BadgeProps {
    children: ReactNode;
    variant?: "default" | "outline" | "success" | "warning" | "danger";
    className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
    return (
        <span
            className={clsx(
                "text-xs font-medium px-2 py-0.5 rounded",
                variant === "default" && "bg-gray-200 text-gray-700",
                variant === "outline" && "border border-gray-300 text-gray-700",
                variant === "success" && "bg-green-200 text-green-700",
                variant === "warning" && "bg-yellow-200 text-yellow-700",
                variant === "danger" && "bg-red-200 text-red-700",
                className
            )}
        >
      {children}
    </span>
    );
}
