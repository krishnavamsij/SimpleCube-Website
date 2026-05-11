import React from "react";
import Link from "next/link";

interface EyebrowButtonProps {
    href?: string;
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
    html?: string;
}

export function EyebrowButton({ href, onClick, className = "", children = "CONTACT US", html }: EyebrowButtonProps) {
    const baseClassName = `
        eyebrow
        text-[#1e90ff] 
        bg-[#1e90ff]/10 
        border border-[#1e90ff]/20
        hover:bg-[#1e90ff]/20
        hover:border-[#1e90ff]/40
        transition-all
        duration-300
        ${className}
    `;

    if (href) {
        return (
            <Link href={href} onClick={onClick} className={baseClassName}>
                <span className="dot bg-[#1e90ff] shadow-[#1e90ff]" />
                <span>{children}</span>
            </Link>
        );
    }

    return (
        <button type="button" onClick={onClick} className={baseClassName}>
            <span className="dot bg-[#1e90ff] shadow-[#1e90ff]" />
            <span>{children}</span>
        </button>
    );
}
