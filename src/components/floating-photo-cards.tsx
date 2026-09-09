"use client";

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   Images from public/about_us_image/
───────────────────────────────────────────── */
const IMAGE_POOL = [
  "/about_us_image/Image-1.PNG",
  "/about_us_image/Image-3.PNG",
  "/about_us_image/Image-4.JPG",
  "/about_us_image/Image-5.jpg",
  "/about_us_image/image-6.JPG",
  "/about_us_image/image-7.JPG",
  "/about_us_image/image-8.jpg",
  "/about_us_image/image-9.JPG",
  "/about_us_image/image-10.JPG",
  "/about_us_image/image-11.jpeg",
  "/about_us_image/image-2.JPG",
];

/* ─────────────────────────────────────────────
   Size variants for visual variety
───────────────────────────────────────────── */
const SIZE_VARIANTS = [
  { width: 140, height: 140 },
  { width: 120, height: 120 },
  { width: 100, height: 100 },
  { width: 160, height: 160 },
  { width: 110, height: 110 },
  { width: 130, height: 130 },
  { width: 90, height: 90 },
];

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

let shuffled: string[] = [];
let shuffleIndex = 0;

function nextImage(): string {
  if (shuffleIndex >= shuffled.length) {
    shuffled = [...IMAGE_POOL].sort(() => Math.random() - 0.5);
    shuffleIndex = 0;
  }
  return shuffled[shuffleIndex++];
}

function getRandomSize() {
  return SIZE_VARIANTS[Math.floor(Math.random() * SIZE_VARIANTS.length)];
}

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export function FloatingPhotoCards() {
  const stageRef = useRef<HTMLDivElement>(null);
  const runningRef = useRef(true);
  const activeCardsRef = useRef<Array<{
    x: number;
    y: number;
    width: number;
    height: number;
    element: HTMLDivElement;
  }>>([]);

  useEffect(() => {
    runningRef.current = true;
    const stage = stageRef.current;
    if (!stage) return;

    /* Smooth continuous animation inspired by services hero */
    const styleId = "floating-cards-style";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .fpc-card {
          position: absolute;
          border-radius: 26px;
          box-shadow:
            0 25px 50px -10px rgba(0, 0, 0, 0.8),
            0 0 30px rgba(56, 134, 206, 0.3);
          border: none;
          overflow: hidden;
          opacity: 0;
          transform: scale(0.1);
          pointer-events: none;
          will-change: transform, opacity;
          background: rgba(15, 23, 42, 0.3);
          backdrop-filter: blur(10px);
          /* ease-in-out creates the sine-wave velocity needed for an orbital look */
          animation: orbitAnim var(--duration) ease-in-out forwards;
          animation-delay: var(--delay);
        }
        .fpc-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 15%;
          display: block;
          filter: grayscale(100%) sepia(100%) hue-rotate(185deg) saturate(150%) brightness(0.9) contrast(1.1);
        }
        .fpc-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.25) 0%,
            rgba(255, 255, 255, 0) 50%,
            rgba(0, 0, 0, 0.2) 100%
          );
          pointer-events: none;
          z-index: 2;
        }
        
        /* Simulated 3D Orbit: 
           - X translates slow -> fast -> slow (due to ease-in-out)
           - Scale grows from small -> 1 -> small 
        */
        @keyframes orbitAnim {
          0% {
            opacity: 0;
            transform: translateX(var(--start-x)) translateY(var(--start-y)) scale(0.1);
          }
          20% {
            opacity: 0.55;
          }
          50% {
            opacity: 0.55;
            transform: translateX(var(--mid-x)) translateY(var(--mid-y)) scale(1);
          }
          80% {
            opacity: 0.55;
          }
          100% {
            opacity: 0;
            transform: translateX(var(--end-x)) translateY(var(--end-y)) scale(0.1);
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Check if two rectangles overlap - using top-left coordinates
    function hasCollision(
      x: number,
      y: number,
      width: number,
      height: number,
      minSpacing: number = 45
    ): boolean {
      for (const card of activeCardsRef.current) {
        // Check rectangle overlap with spacing buffer
        const horizontalOverlap = 
          x < card.x + card.width + minSpacing && 
          x + width + minSpacing > card.x;
        
        const verticalOverlap = 
          y < card.y + card.height + minSpacing && 
          y + height + minSpacing > card.y;
        
        if (horizontalOverlap && verticalOverlap) {
          return true; // Cards would overlap
        }
      }
      return false;
    }

    // Calculate safe positioning - GUARANTEE no cutoffs
    function getSafePosition(size: { width: number; height: number }): { x: number; y: number } | null {
      const stageWidth = stage?.clientWidth || 600;
      let stageHeight = stage?.clientHeight || 600;
      
      // Prevent spawning below the visible bounds of the section
      if (stage) {
        const section = stage.closest('section');
        const sectionHeight = section?.clientHeight || window.innerHeight;
        const stageTopOffset = stage.offsetTop || 0;
        const availableHeight = sectionHeight - stageTopOffset;
        if (availableHeight > 0) {
          stageHeight = Math.min(stageHeight, availableHeight);
        }
      }
      
      // Expand boundary dynamically based on the viewport.
      // The parent container has `right-[-10%]`, meaning exactly 10vw is off the right edge of the screen.
      // We calculate the exact visible width of the stage so cards can go all the way to the right edge!
      const offScreenPixels = window.innerWidth * 0.1;
      const RIGHT_BOUNDARY = stageWidth - offScreenPixels; 
      
      const TOP_PADDING = 70;
      const LEFT_PADDING = 35;
      
      // CRITICAL: Calculate max positions so card BOTTOM and RIGHT edges stay visible
      // maxX = rightmost point where left edge can be placed
      const maxX = RIGHT_BOUNDARY - size.width - 35;
      // maxY = lowest point where top edge can be placed  
      // Add extra 140px buffer because the float animation moves cards down significantly
      const maxY = stageHeight - size.height - 140; 
      
      const minX = LEFT_PADDING;
      const minY = TOP_PADDING;
      
      // Ensure we have valid space
      if (maxX <= minX || maxY <= minY) {
        return null;
      }
      
      // Try to find non-overlapping position
      for (let attempt = 0; attempt < 200; attempt++) {
        const x = minX + Math.random() * (maxX - minX);
        const y = minY + Math.random() * (maxY - minY);
        
        if (!hasCollision(x, y, size.width, size.height)) {
          return { x, y };
        }
      }
      
      return null;
    }

    // Create and animate a single card with smooth, natural transitions
    async function animateSingleCard() {
      const sizeVariant = getRandomSize();
      const posData = getSafePosition(sizeVariant);
      
      if (!posData) {
        // If space is full, wait longer before retry
        await sleep(3000);
        return;
      }
      
      const { x, y } = posData;
      const imgSrc = nextImage();

      const el = document.createElement("div");
      el.className = "fpc-card";
      el.style.width = `${sizeVariant.width}px`;
      el.style.height = `${sizeVariant.height}px`;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;

      // Slow, majestic orbit (10-15 seconds)
      const duration = 10 + Math.random() * 5; 
      const delay = Math.random() * 0.6;
      el.style.setProperty('--duration', `${duration}s`);
      el.style.setProperty('--delay', `${delay}s`);

      // Calculate an orbital arc across the X axis.
      // Because we use `ease-in-out` in the CSS, it automatically creates the sine-wave speed curve
      // (fastest when crossing the center, slower at the edges) simulating 3D rotation.
      const orbitWidth = 250 + Math.random() * 150; // Total width of the simulated orbit
      const orbitCurve = (Math.random() - 0.5) * 60; // Slight vertical bowing for the arc
      
      el.style.setProperty('--start-x', `${-orbitWidth / 2}px`);
      el.style.setProperty('--start-y', `${-orbitCurve}px`);
      
      el.style.setProperty('--mid-x', `0px`);
      el.style.setProperty('--mid-y', `0px`);
      
      el.style.setProperty('--end-x', `${orbitWidth / 2}px`);
      el.style.setProperty('--end-y', `${orbitCurve}px`);

      const img = document.createElement("img");
      img.src = imgSrc;
      img.alt = "Hyniva team";
      img.draggable = false;
      el.appendChild(img);

      const overlay = document.createElement("div");
      overlay.className = "fpc-overlay";
      el.appendChild(overlay);

      // Track active card - store actual position and dimensions
      const cardData = {
        x: x,
        y: y,
        width: sizeVariant.width,
        height: sizeVariant.height,
        element: el,
      };
      activeCardsRef.current.push(cardData);

      stage!.appendChild(el);

      // Wait for full lifecycle, then cleanup
      await sleep((duration + delay) * 1000);
      el.remove();
      
      const index = activeCardsRef.current.indexOf(cardData);
      if (index > -1) {
        activeCardsRef.current.splice(index, 1);
      }
    }

    // Spawn cards with balanced timing - fill the space nicely
    async function cardSpawner() {
      while (runningRef.current) {
        const activeCards = activeCardsRef.current.length;
        
        // Allow more cards to fill space effectively (8-10 cards)
        if (activeCards < 10) {
          animateSingleCard();
        }
        
        // Slower spawn rate for smoother, less chaotic feel
        let spawnDelay = 800; // Base: 0.8 seconds
        
        if (activeCards > 7) {
          spawnDelay = 1400; // Slow when getting full
        } else if (activeCards > 5) {
          spawnDelay = 1100; // Moderate pace
        }
        
        // Small variation for natural feel
        spawnDelay += Math.random() * 400;
        
        await sleep(spawnDelay);
      }
    }

    cardSpawner();

    return () => {
      runningRef.current = false;
      activeCardsRef.current = [];
      if (stage) {
        stage.querySelectorAll(".fpc-card").forEach((c) => c.remove());
      }
    };
  }, []);

  return (
    <div
      ref={stageRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 5,
        pointerEvents: "none",
        overflow: "visible",
      }}
    />
  );
}
