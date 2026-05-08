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
        // Manual fallback for specific studies that aren't matching properly
        const knownSlugs = [
            'scaling-a-secure-pre-qualification-loan-routing-platform-with-intelligent-automation',
            'modernizing-a-legacy-platform',
            'transforming-insurance-claims-operations-with-a-scalable-digital-platform'
        ];
        
        // Check if this is one of the problematic studies
        if (knownSlugs.includes(slugOrHref)) {
            // Manual search in case studies array for matching title
            const fallbackStudy = caseStudiesContent.studies.find(s => {
                const slugWords = s.href.split('-');
                const studyWords = s.title.split(' ');
                // Check if all slug words are contained in the study title
                const isMatch = slugWords.every(word => studyWords.includes(word));
                if (isMatch && fallbackStudy?.title) {
                    // Use the title from the found study
                    return { parts: [{ text: fallbackStudy.title, highlighted: false }] };
                }
            });
            if (fallbackStudy) return fallbackStudy;
        }
        
        // If still no match, try to find by partial slug match
        const partialMatch = caseStudiesContent.studies.find(s => {
            const studySlugWords = s.href.split('-');
            const currentSlugWords = slugOrHref.split('-');
            // Check if current slug contains all words from study slug
            const partialMatchCount = currentSlugWords.filter(word => studySlugWords.includes(word)).length;
            const requiredMatchCount = studySlugWords.length;
            
            // If we have a good partial match (at least 50% of words), use it
            if (partialMatchCount >= requiredMatchCount * 0.5) {
                const matchingStudy = caseStudiesContent.studies.find(s => s.href.includes(slugOrHref));
                if (matchingStudy?.title) {
                    return { parts: [{ text: matchingStudy.title, highlighted: false }] };
                }
            }
        });
        if (partialMatch) return partialMatch;
        
        // If still no match, return empty
        const fallbackTitle = slugOrHref.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        return { parts: [{ text: fallbackTitle, highlighted: false }] };
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
