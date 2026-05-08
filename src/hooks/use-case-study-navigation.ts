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
                        
                        // Check if this is the 3rd section and trigger popup
                        const sectionElements = Array.from(document.querySelectorAll("section[id]"));
                        const thirdSectionIndex = 2; // 0-indexed, so 2 is 3rd section
                        
                        console.log('🔍 Checking third section conditions:');
                        console.log('  - Section elements found:', sectionElements.length);
                        console.log('  - Third section element exists:', !!sectionElements[thirdSectionIndex]);
                        console.log('  - Entry target matches third section:', entry.target === sectionElements[thirdSectionIndex]);
                        console.log('  - Popup already triggered:', popupTriggered);
                        
                        if (sectionElements[thirdSectionIndex] && 
                            entry.target === sectionElements[thirdSectionIndex] && 
                            !popupTriggered) {
                            
                            console.log('✅ Third section reached by scroll, triggering popup');
                            setPopupTriggered(true);
                            
                            // Dispatch custom event for popup component
                            console.log('📤 Dispatching thirdSectionReached event...');
                            const customEvent = new CustomEvent('thirdSectionReached', { bubbles: true, detail: { source: 'scroll' } });
                            console.log('📤 Event details:', customEvent);
                            const dispatched = window.dispatchEvent(customEvent);
                            console.log('📥 Event dispatched successfully:', dispatched);
                        } else {
                            console.log('❌ Third section conditions not met');
                            console.log('  - Section exists:', !!sectionElements[thirdSectionIndex]);
                            console.log('  - Target matches:', entry.target === sectionElements[thirdSectionIndex]);
                            console.log('  - Popup already triggered:', popupTriggered);
                        }
                    }
                });
            },
            { 
                threshold: 0.3, 
                rootMargin: "-100px 0px -40% 0px" 
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
                    const thirdNavLink = navLinks[2]; // 0-indexed, so 2 is 3rd nav link

                    // Only trigger popup if specifically clicking 3rd navigation tab
                    if (navLink === thirdNavLink && !popupTriggered) {
                        console.log('✅ Third nav tab clicked, triggering popup');
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
