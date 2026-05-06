import React from 'react';
import { caseStudiesContent } from "@/content/case-studies";

export interface ParsedTitle {
    parts: Array<{
        text: string;
        highlighted: boolean;
        color?: string;
    }>;
}

/**
 * Gets the href for a case study by its slug
 */
export function getCaseStudyHref(slug: string): string {
    const study = caseStudiesContent.studies.find(s => s.href.includes(slug));
    return study?.href || `/insights/case-studies/${slug}`;
}

/**
 * Parses HTML title from case studies data to extract text segments and highlight colors
 * Matches the exact same highlighting logic used in the preview cards
 */
export function parseCaseStudyTitle(slugOrHref: string): ParsedTitle {
    // Find the corresponding study from the case studies content
    const study = caseStudiesContent.studies.find(s => 
        s.href === slugOrHref || s.href.includes(slugOrHref)
    );
    
    if (!study || !study.title) {
        return { parts: [{ text: '', highlighted: false }] };
    }

    const parts: Array<{ text: string; highlighted: boolean; color?: string }> = [];
    
    // Parse the HTML title to extract text and highlight information
    const html = study.title;
    
    // Use regex to find span tags with highlight classes
    const spanRegex = /<span[^>]*class=['"]([^'"]*)['"][^>]*>(.*?)<\/span>/gi;
    let lastIndex = 0;
    let match;
    
    while ((match = spanRegex.exec(html)) !== null) {
        // Add text before the span
        if (match.index > lastIndex) {
            const beforeText = html.substring(lastIndex, match.index);
            if (beforeText.trim()) {
                parts.push({
                    text: beforeText.trim(),
                    highlighted: false
                });
            }
        }
        
        // Extract color from the class
        const classString = match[1];
        let color = '#3B82F6'; // Default blue color
        
        // Look for Tailwind text color classes
        const colorMatch = classString.match(/text-\[([^\]]+)\]/);
        if (colorMatch) {
            color = colorMatch[1];
        }
        
        // Add the highlighted text
        const highlightedText = match[2].replace(/<[^>]*>/g, '').trim(); // Remove any nested HTML
        if (highlightedText) {
            parts.push({
                text: highlightedText,
                highlighted: true,
                color
            });
        }
        
        lastIndex = spanRegex.lastIndex;
    }
    
    // Add any remaining text after the last span
    if (lastIndex < html.length) {
        const afterText = html.substring(lastIndex);
        if (afterText.trim()) {
            parts.push({
                text: afterText.trim(),
                highlighted: false
            });
        }
    }
    
    // If no spans were found, treat the entire title as non-highlighted text
    if (parts.length === 0) {
        const cleanText = html.replace(/<[^>]*>/g, '').trim();
        parts.push({
            text: cleanText,
            highlighted: false
        });
    }
    
    return { parts };
}

/**
 * Renders a parsed title with consistent styling matching the preview cards
 */
export function renderParsedTitle(parts: ParsedTitle['parts'], className: string = '') {
    return (
        <div className={className}>
            {parts.map((part, index) => (
                <React.Fragment key={index}>
                    <span
                        className="font-sans"
                        style={part.highlighted ? { color: '#10B981' } : {}}
                    >
                        {part.text}
                    </span>
                    {index < parts.length - 1 && ' '}
                </React.Fragment>
            ))}
        </div>
    );
}
