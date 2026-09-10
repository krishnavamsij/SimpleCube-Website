import React from "react";

interface HighlightedHeadlineProps {
    headline: string;
    highlightedWord: string;
    highlightClassName?: string;
    partClassName?: string;
    className?: string;
}

export function HighlightedHeadline({
    headline,
    highlightedWord,
    highlightClassName = "text-[#135498]",
    partClassName,
    className,
}: HighlightedHeadlineProps) {
    const parts = headline.split(highlightedWord);

    return (
        <span className={className}>
            {parts.map((part, i, arr) => (
                <React.Fragment key={i}>
                    {partClassName ? (
                        <span className={partClassName}>{part}</span>
                    ) : (
                        part
                    )}
                    {i < arr.length - 1 && (
                        <span className={highlightClassName}>{highlightedWord}</span>
                    )}
                </React.Fragment>
            ))}
        </span>
    );
}
