"use client";

import { useEffect, useRef, useCallback, useState } from 'react';
import { usePathname } from 'next/navigation'; // For Next.js App Router

interface ScrollSyncConfig {
  sectionIds: string[];
  onActiveTabChange?: (tabIndex: number) => void;
  onThirdSectionReached?: () => void;
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * Custom hook for synchronizing tab active state with scroll position
 * FIXED: Properly resets state when navigating between pages
 */
export function useScrollTabSync({
  sectionIds,
  onActiveTabChange,
  onThirdSectionReached,
  rootMargin = '-50% 0px -50% 0px',
  threshold = 0
}: ScrollSyncConfig) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [hasTriggeredThirdSection, setHasTriggeredThirdSection] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sectionRefsMap = useRef<Map<string, Element>>(new Map());
  const hasUserInteractedRef = useRef(false);
  const trackScrollAfterMsRef = useRef(0);
  
  // Get current pathname to detect page changes
  const pathname = usePathname();
  
  // Create a unique session ID for this page load
  const sessionIdRef = useRef<string>(generateSessionId());

  // Reset state when pathname changes (user navigated to different page)
  useEffect(() => {
    // User navigated to a new page - reset everything
    setHasTriggeredThirdSection(false);
    setActiveTabIndex(0);
    hasUserInteractedRef.current = false;
    // Ignore carried scroll momentum immediately after client-side navigation.
    trackScrollAfterMsRef.current = performance.now() + 700;
    sessionIdRef.current = generateSessionId();
  }, [pathname]);

  // Mark intent only after explicit manual scrolling to prevent load-time auto triggers.
  useEffect(() => {
    const markInteracted = () => {
      if (performance.now() < trackScrollAfterMsRef.current) {
        return;
      }
      hasUserInteractedRef.current = true;
    };

    window.addEventListener('wheel', markInteracted, { passive: true });
    window.addEventListener('touchmove', markInteracted, { passive: true });

    return () => {
      window.removeEventListener('wheel', markInteracted);
      window.removeEventListener('touchmove', markInteracted);
    };
  }, []);

  // Create or update intersection observer
  useEffect(() => {
    // Collect all section elements
    sectionRefsMap.current.clear();
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        sectionRefsMap.current.set(id, element);
      }
    });

    // Cleanup existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      // Find the most visible section
      let mostVisibleEntry = entries[0];
      
      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (entry.intersectionRatio > mostVisibleEntry.intersectionRatio) {
            mostVisibleEntry = entry;
          }
        }
      }

      if (mostVisibleEntry.isIntersecting) {
        const sectionId = mostVisibleEntry.target.id;
        const newTabIndex = sectionIds.indexOf(sectionId);

        if (newTabIndex !== -1) {
          setActiveTabIndex(newTabIndex);
          onActiveTabChange?.(newTabIndex);

          // ✅ FIXED: Only trigger popup on third section if not already triggered THIS SESSION
          if (
            newTabIndex === 2 &&
            !hasTriggeredThirdSection &&
            hasUserInteractedRef.current
          ) {
            setHasTriggeredThirdSection(true);
            onThirdSectionReached?.();
            
            // Dispatch custom event
            window.dispatchEvent(new CustomEvent('thirdSectionReached', { 
              detail: { sectionId, sessionId: sessionIdRef.current, source: 'scroll' } 
            }));
          }
        }
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin,
      threshold
    });

    // Observe all sections
    sectionRefsMap.current.forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sectionIds, onActiveTabChange, onThirdSectionReached, rootMargin, threshold, hasTriggeredThirdSection]);

  // Manual reset function
  const resetThirdSectionTrigger = useCallback(() => {
    setHasTriggeredThirdSection(false);
  }, []);

  // Scroll to specific tab
  const scrollToTab = useCallback((tabIndex: number) => {
    const sectionId = sectionIds[tabIndex];
    const element = document.getElementById(sectionId);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [sectionIds]);

  return {
    activeTabIndex,
    scrollToTab,
    resetThirdSectionTrigger,
    hasTriggeredThirdSection
  };
}

/**
 * Generate unique session ID for this page load
 * Prevents popup from triggering on unrelated pages
 */
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
