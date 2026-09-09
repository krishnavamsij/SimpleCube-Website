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
        text-[#3886CE] 
        bg-[#3886CE]/10 
        border border-[#3886CE]/20
        hover:bg-[#3886CE]/20
        hover:border-[#3886CE]/40
        transition-all
        duration-300
        ${className}
    `;

    if (href) {
        return (
            <Link href={href} onClick={onClick} className={baseClassName}>
                <span className="dot bg-[#3886CE] shadow-[#3886CE]" />
                <span>{children}</span>
            </Link>
        );
    }

    return (
        <button type="button" onClick={onClick} className={baseClassName}>
            <span className="dot bg-[#3886CE] shadow-[#3886CE]" />
            <span>{children}</span>
        </button>
    );
}
