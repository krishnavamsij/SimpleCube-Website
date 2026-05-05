import React from "react";
import Link from "next/link";

interface EyebrowButtonProps {
    href?: string;
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
}

export function EyebrowButton({ href, onClick, className = "", children = "CONTACT US" }: EyebrowButtonProps) {
    const Component = href ? Link : "button";
    
    return (
        <Component
            href={href || "#"}
            onClick={onClick}
            className={`
                eyebrow
                text-[#1e90ff] 
                bg-[#1e90ff]/10 
                border border-[#1e90ff]/20
                hover:bg-[#1e90ff]/20
                hover:border-[#1e90ff]/40
                transition-all
                duration-300
                ${className}
            `}
        >
            <span className="dot bg-[#1e90ff] shadow-[#1e90ff]" />
            <span>{children}</span>
        </Component>
    );
}
