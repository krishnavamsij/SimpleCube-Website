"use client";

import React, { useRef, useEffect, useCallback } from "react";

/* ─────────────── Types ─────────────── */

interface NetworkNode {
    lat: number;
    lng: number;
    size: number;
    pulseSpeed: number;
    pulseOffset: number;
    brightness: number;
    connections: number[];
}

interface Particle {
    x: number;
    y: number;
    z: number;
    size: number;
    alpha: number;
    speed: number;
}

interface Star {
    x: number;
    y: number;
    size: number;
    twinkleSpeed: number;
    twinkleOffset: number;
}

/* ─────────────── Helpers ─────────────── */

function latLngTo3D(
    lat: number,
    lng: number,
    radius: number,
    rotation: number
): { x: number; y: number; z: number } {
    const phi = ((90 - lat) * Math.PI) / 180;
    const theta = ((lng + rotation) * Math.PI) / 180;
    return {
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.cos(phi),
        z: radius * Math.sin(phi) * Math.sin(theta),
    };
}

function project(
    x3d: number,
    y3d: number,
    z3d: number,
    cx: number,
    cy: number,
    perspective: number
): { x: number; y: number; scale: number; visible: boolean } {
    const scale = perspective / (perspective + z3d);
    return {
        x: cx + x3d * scale,
        y: cy + y3d * scale,
        scale,
        visible: z3d < perspective * 0.9,
    };
}

function seededRng(seed: number) {
    let s = seed;
    return () => {
        s = (s * 16807 + 0) % 2147483647;
        return (s - 1) / 2147483646;
    };
}

/* ─────────────── Initialization ─────────────── */

function createNetwork(radius: number): NetworkNode[] {
    const nodes: NetworkNode[] = [];
    const rng = seededRng(999);

    const lats = [-75, -60, -45, -30, -15, 0, 15, 30, 45, 60, 75];
    const lngsCount = 45; 
    
    for (const lat of lats) {
        const pointsInLat = Math.max(10, Math.floor(lngsCount * Math.cos(lat * Math.PI / 180)));
        for (let i = 0; i < pointsInLat; i++) {
            const lng = (i / pointsInLat) * 360 + (rng() - 0.5) * 10;
            const finalLat = lat + (rng() - 0.5) * 10;
            
            nodes.push({
                lat: finalLat,
                lng: lng,
                size: 0.8 + rng() * 2.2,
                pulseSpeed: 0.02 + rng() * 0.05,
                pulseOffset: rng() * Math.PI * 2,
                brightness: 0.4 + rng() * 0.6,
                connections: [],
            });
        }
    }

    // Connect close nodes
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const p1 = latLngTo3D(nodes[i].lat, nodes[i].lng, radius, 0);
            const p2 = latLngTo3D(nodes[j].lat, nodes[j].lng, radius, 0);
            const dist = Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2 + (p1.z - p2.z)**2);
            
            if (dist < radius * 0.35 && rng() > 0.35) {
                nodes[i].connections.push(j);
            }
        }
    }
    return nodes;
}

function createStars(count: number, width: number, height: number): Star[] {
    const stars: Star[] = [];
    const rng = seededRng(888);
    for (let i = 0; i < count; i++) {
        stars.push({
            x: rng() * width,
            y: rng() * height,
            size: 0.3 + rng() * 1.8,
            twinkleSpeed: 0.01 + rng() * 0.04,
            twinkleOffset: rng() * Math.PI * 2,
        });
    }
    return stars;
}

function createParticles(count: number, radius: number): Particle[] {
    const particles: Particle[] = [];
    const rng = seededRng(777);
    for (let i = 0; i < count; i++) {
        // distribute randomly around the globe surface
        const u = rng();
        const v = rng();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = radius * (1.02 + rng() * 0.25); // float slightly above surface
        particles.push({
            x: r * Math.sin(phi) * Math.cos(theta),
            y: r * Math.sin(phi) * Math.sin(theta),
            z: r * Math.cos(phi),
            size: 0.4 + rng() * 2.0,
            alpha: 0.3 + rng() * 0.7,
            speed: 0.003 + rng() * 0.015,
        });
    }
    return particles;
}

/* ─────────────── Draw Functions ─────────────── */

function drawStars(ctx: CanvasRenderingContext2D, stars: Star[], frame: number) {
    for (const star of stars) {
        const twinkle = Math.sin(frame * star.twinkleSpeed + star.twinkleOffset) * 0.5 + 0.5;
        const alpha = 0.1 + twinkle * 0.7;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 220, 255, ${alpha})`;
        ctx.fill();
    }
}

function drawGlobeBase(ctx: CanvasRenderingContext2D, cx: number, cy: number, radius: number) {
    // Core fill — very transparent so the photo collage underneath shows through clearly
    const baseGrad = ctx.createRadialGradient(cx - radius * 0.3, cy - radius * 0.3, 0, cx, cy, radius);
    baseGrad.addColorStop(0, "rgba(10, 20, 50, 0.03)");
    baseGrad.addColorStop(0.6, "rgba(5, 10, 30, 0.05)");
    baseGrad.addColorStop(1, "rgba(2, 5, 15, 0.10)");
    
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = baseGrad;
    ctx.fill();

    // 3D Specular Highlight
    const specular = ctx.createRadialGradient(cx - radius * 0.4, cy - radius * 0.4, 0, cx - radius * 0.4, cy - radius * 0.4, radius * 0.8);
    specular.addColorStop(0, "rgba(60, 160, 255, 0.06)");
    specular.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = specular;
    ctx.fill();

    // Outer glow rim - slightly more visible
    const rimGrad = ctx.createLinearGradient(cx - radius, cy - radius, cx + radius, cy + radius);
    rimGrad.addColorStop(0, "rgba(30, 144, 255, 0.5)");
    rimGrad.addColorStop(0.3, "rgba(20, 100, 220, 0.20)");
    rimGrad.addColorStop(0.8, "rgba(10, 40, 100, 0.06)");
    rimGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = rimGrad;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Atmospheric halo
    const halo = ctx.createRadialGradient(cx, cy, radius, cx, cy, radius * 1.3);
    halo.addColorStop(0, "rgba(30, 144, 255, 0.08)");
    halo.addColorStop(0.5, "rgba(20, 80, 200, 0.04)");
    halo.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.3, 0, Math.PI * 2);
    ctx.fillStyle = halo;
    ctx.fill();
}

function drawNetwork(
    ctx: CanvasRenderingContext2D,
    nodes: NetworkNode[],
    cx: number,
    cy: number,
    radius: number,
    rotation: number,
    perspective: number,
    frame: number
) {
    const projected = nodes.map((node) => {
        const pos = latLngTo3D(node.lat, node.lng, radius, rotation);
        const p = project(pos.x, pos.y, pos.z, cx, cy, perspective);
        return { ...p, z: pos.z, node };
    });

    // Draw Data Lines - Enhanced visibility on images with adaptive brightness
    for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        if (!p1.visible || p1.z > 0) continue;

        for (const j of p1.node.connections) {
            const p2 = projected[j];
            if (!p2.visible || p2.z > 0) continue;

            const depthFactor = Math.max(0, 1 - Math.abs(p1.z) / radius);
            
            // Lines on top of images (front-facing) get higher visibility
            const isFrontFacing = p1.z < -radius * 0.3 && p2.z < -radius * 0.3;
            const baseAlpha = isFrontFacing ? 0.40 : 0.30;
            const depthBoost = isFrontFacing ? 0.50 : 0.40;
            const alpha = baseAlpha + depthFactor * depthBoost;

            // Draw stronger glow for front-facing lines
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(140, 210, 255, ${alpha * (isFrontFacing ? 0.4 : 0.3)})`; 
            ctx.lineWidth = isFrontFacing ? 3.0 : 2.5;
            ctx.stroke();

            // Draw main line on top
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(120, 205, 255, ${alpha})`; 
            ctx.lineWidth = isFrontFacing ? 1.8 : 1.5;
            ctx.stroke();
        }
    }

    // Draw Nodes - Balanced glow
    for (const p of projected) {
        if (!p.visible || p.z > 0) continue;

        const pulse = Math.sin(frame * p.node.pulseSpeed + p.node.pulseOffset) * 0.5 + 0.5;
        const depthFactor = Math.max(0, 1 - Math.abs(p.z) / radius);
        const alpha = (0.55 + p.node.brightness * 0.35) * depthFactor * (0.75 + pulse * 0.25);
        const sz = p.node.size * p.scale * (1 + pulse * 0.3);

        // Outer glow - reduced
        const outerGlow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, sz * 4);
        outerGlow.addColorStop(0, `rgba(130, 220, 255, ${alpha * 0.5})`);
        outerGlow.addColorStop(0.5, `rgba(90, 190, 255, ${alpha * 0.25})`);
        outerGlow.addColorStop(1, "rgba(70, 170, 255, 0)");
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, sz * 4, 0, Math.PI * 2);
        ctx.fillStyle = outerGlow;
        ctx.fill();

        // Inner glow
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, sz * 2.5);
        glow.addColorStop(0, `rgba(140, 220, 255, ${alpha * 0.85})`);
        glow.addColorStop(1, "rgba(80, 170, 255, 0)");
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, sz * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Node core - bright but not overwhelming
        ctx.beginPath();
        ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 248, 255, ${alpha})`; // Slightly reduced brightness
        ctx.fill();
    }
}

function drawParticles(
    ctx: CanvasRenderingContext2D,
    particles: Particle[],
    cx: number,
    cy: number,
    perspective: number,
    rotation: number
) {
    for (const p of particles) {
        // Rotate particle in 3D
        const cosR = Math.cos(rotation * p.speed);
        const sinR = Math.sin(rotation * p.speed);
        const xRot = p.x * cosR - p.z * sinR;
        const zRot = p.z * cosR + p.x * sinR;

        const proj = project(xRot, p.y, zRot, cx, cy, perspective);
        if (!proj.visible || zRot > 0) continue;

        const depthFactor = Math.max(0, 1 - Math.abs(zRot) / perspective);
        const alpha = p.alpha * depthFactor;

        ctx.beginPath();
        ctx.arc(proj.x, proj.y, p.size * proj.scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(150, 210, 255, ${alpha})`;
        ctx.fill();
    }
}

/* ─────────────── Component ─────────────── */

export function DigitalGlobe() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const stateRef = useRef<{
        nodes: NetworkNode[];
        stars: Star[];
        particles: Particle[];
        frame: number;
        initialized: boolean;
    }>({
        nodes: [],
        stars: [],
        particles: [],
        frame: 0,
        initialized: false,
    });

    const render = useCallback(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = container.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;

        if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        const state = stateRef.current;
        const globeRadius = Math.min(w, h) * 0.42;
        const cx = w * 0.5;
        const cy = h * 0.5;

        if (!state.initialized) {
            state.nodes = createNetwork(globeRadius);
            state.stars = createStars(250, w, h);
            state.particles = createParticles(150, globeRadius);
            state.initialized = true;
        }

        const perspective = globeRadius * 2.5;
        const rotation = state.frame * 0.06;

        ctx.clearRect(0, 0, w, h);

        drawStars(ctx, state.stars, state.frame);
        drawGlobeBase(ctx, cx, cy, globeRadius);
        drawParticles(ctx, state.particles, cx, cy, perspective, state.frame);
        drawNetwork(ctx, state.nodes, cx, cy, globeRadius, rotation, perspective, state.frame);

        state.frame++;
        animRef.current = requestAnimationFrame(render);
    }, []);

    useEffect(() => {
        animRef.current = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animRef.current);
    }, [render]);

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none">
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ display: "block" }}
            />
        </div>
    );
}
