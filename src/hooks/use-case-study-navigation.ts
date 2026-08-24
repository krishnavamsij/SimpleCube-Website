"use client";

import { useState, useEffect, useRef } from 'react';

export function useCaseStudyNavigation(sections: any[]) {
    const [activeSection, setActiveSection] = useState("");
    const [popupTriggered, setPopupTriggered] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    // Reset popup state when page changes
    useEffect(() => {
        setPopupTriggered(false);
        setActiveSection("");
    }, [sections]);

    useEffect(() => {
        // Create intersection observer for scroll-based navigation
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;
                        
                        // Map sub-sections to their parent section for navigation
                        let activeId = sectionId;
                        if (sectionId.startsWith('solutions-')) {
                            activeId = 'solutions';
                        }
                        
                        setActiveSection(activeId);
                        
                        // Check if this is 3rd section or if there are fewer sections, trigger on the last section
                        const allSectionElements = Array.from(document.querySelectorAll("section[id]"));
                        const triggerSectionIndex = Math.min(2, allSectionElements.length - 1); // 3rd section or last available
                        
                        if (allSectionElements[triggerSectionIndex] && 
                            entry.target === allSectionElements[triggerSectionIndex] && 
                            !popupTriggered) {
                            
                            setPopupTriggered(true);
                            const customEvent = new CustomEvent('thirdSectionReached', { bubbles: true, detail: { source: 'scroll' } });
                            window.dispatchEvent(customEvent);
                        }
                    }
                });
            },
            { 
                threshold: 0.3, 
                rootMargin: "0px 0px -40% 0px" 
            }
        );

        // Observe all sections
        const sectionElements = document.querySelectorAll("section[id]");
        sectionElements.forEach((section) => {
            if (observerRef.current) {
                observerRef.current.observe(section);
            }
        });

        return () => {
            if (observerRef.current) {
                sectionElements.forEach((section) => {
                    observerRef.current?.unobserve(section);
                });
            }
        };
    }, [sections, popupTriggered]);

    // Handle navigation clicks
    useEffect(() => {
        const handleNavClick = (e: Event) => {
            const target = e.target as HTMLElement;
            const navLink = target.closest('a[href^="#"]');
            
            if (navLink) {
                const href = navLink.getAttribute('href');
                if (href) {
                    const navLinks = document.querySelectorAll('a[href^="#"]');
                    const triggerNavLinkIndex = Math.min(2, navLinks.length - 1); // 3rd nav link or last available
                    const triggerNavLink = navLinks[triggerNavLinkIndex];

                    // Only trigger popup if clicking 3rd navigation tab (Impact) specifically
                    if (navLink === triggerNavLink && !popupTriggered) {
                        setPopupTriggered(true);
                        
                        // Dispatch custom event for popup component
                        window.dispatchEvent(new CustomEvent('thirdTabClicked'));
                    }
                }
            }
        };

        document.addEventListener('click', handleNavClick);
        return () => document.removeEventListener('click', handleNavClick);
    }, [popupTriggered]);

    return { activeSection, popupTriggered };
}
