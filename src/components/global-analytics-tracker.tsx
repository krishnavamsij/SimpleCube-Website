"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { sendGAEvent } from "@next/third-parties/google";



export function GlobalAnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const maxScrollDepth = useRef(0);

  // Track page views
  useEffect(() => {
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    sendGAEvent({ event: "page_view", page_path: url });
    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({ event: "page_view", page_path: url });
    }
    // Reset scroll depth on new page
    maxScrollDepth.current = 0;
  }, [pathname, searchParams]);

  // Track clicks, forms, and scrolls
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Track Button Clicks
      const button = target.closest("button") || target.closest('[role="button"]');
      if (button) {
        const buttonText = button.textContent?.trim() || "unknown_button";
        const buttonId = button.id || "no_id";
        const eventData = {
          event: "button_click",
          button_text: buttonText,
          button_id: buttonId,
        };
        sendGAEvent(eventData);
        if (typeof window !== "undefined") {
          (window as any).dataLayer = (window as any).dataLayer || [];
          (window as any).dataLayer.push(eventData);
        }
      }

      // Track Outbound Links
      const link = target.closest("a");
      if (link && link.href) {
        const isInternal = link.href.includes(window.location.host) || link.href.startsWith("/");
        if (!isInternal) {
          const eventData = {
            event: "outbound_link_click",
            link_url: link.href,
            link_text: link.textContent?.trim() || "",
          };
          sendGAEvent(eventData);
          if (typeof window !== "undefined") {
            (window as any).dataLayer = (window as any).dataLayer || [];
            (window as any).dataLayer.push(eventData);
          }
        }
      }
    };

    const handleSubmit = (e: SubmitEvent) => {
      const form = e.target as HTMLFormElement;
      const formId = form.id || "unknown_form";
      const formAction = form.action || "unknown_action";
      const eventData = {
        event: "form_submission",
        form_id: formId,
        form_action: formAction,
      };
      sendGAEvent(eventData);
      if (typeof window !== "undefined") {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push(eventData);
      }
    };

    const handleScroll = () => {
      const scrollDepth = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      const thresholds = [25, 50, 75, 90];
      
      for (const threshold of thresholds) {
        if (scrollDepth >= threshold && maxScrollDepth.current < threshold) {
          maxScrollDepth.current = threshold;
          const eventData = {
            event: "scroll_depth",
            scroll_depth: threshold,
          };
          sendGAEvent(eventData);
      if (typeof window !== "undefined") {
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push(eventData);
      }
        }
      }
    };

    // Use passive listeners for better performance
    document.addEventListener("click", handleClick, { passive: true });
    document.addEventListener("submit", handleSubmit, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("submit", handleSubmit);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}
