"use client";

import { useEffect, useState, useRef, useCallback } from "react";

/**
 * Hook to animate a number counting up from 0 to a target value
 * when the element enters the viewport.
 */
export function useCountUp(
    target: number,
    duration: number = 2000,
    startOnView: boolean = true
) {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(!startOnView);
    const ref = useRef<HTMLDivElement>(null);

    const start = useCallback(() => setHasStarted(true), []);

    useEffect(() => {
        if (!startOnView || !ref.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    start();
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [startOnView, start]);

    useEffect(() => {
        if (!hasStarted) return;
        const startTime = performance.now();

        function animate(now: number) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutQuart
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.round(eased * target));
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }

        requestAnimationFrame(animate);
    }, [hasStarted, target, duration]);

    return { count, ref };
}
