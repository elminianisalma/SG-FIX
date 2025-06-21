import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "ghost" | "outline";
    size?: "default" | "sm" | "lg";
}

export function Button({ children, variant = "default", size = "default", className, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className={clsx(
                "rounded-md text-sm font-medium transition",
                variant === "default" && "bg-black text-white hover:bg-gray-800",
                variant === "ghost" && "bg-transparent hover:bg-gray-100",
                variant === "outline" && "border border-gray-300 hover:bg-gray-100",
                size === "default" && "px-3 py-1.5",
                size === "sm" && "px-2 py-1 text-xs",
                size === "lg" && "px-4 py-2 text-base",
                className
            )}
        >
            {children}
        </button>
    );
}