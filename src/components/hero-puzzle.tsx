"use client";

import { useEffect, useRef, useState } from "react";

// ===================================
// NEO-JIGSAW CONFIGURATION (3x3x3)
// ===================================
const CONFIG = {
    CYCLE_DURATION: 12000,
    PHASES: {
        DRIFT: 2000,        // 0-2s: Initial subtle float
        CONVERGE: 3000,     // 2-5s: Magnetic pull IN
        LOCK: 2000,         // 5-7s: Hold peak state + Shine
        DISPERSE: 3000,     // 7-10s: Return path OUT (Exact mirror of CONVERGE)
        RESET: 2000,        // 10-12s: Settle back to 0s state
    },

    CUBE_SIZE: 1.0,         
    JIGSAW_TAB: 0.22,       
    
    COLORS: {
        BLUE_NEON: 0x3b82f6,    
        CYAN_NEON: 0x00d4aa,    
        OBSIDIAN: 0x011627,     
        STUDIO_GRID: 0x1e3a5f,  
    },

    CAMERA_DIST: 9.5,
    CAMERA_TILT: 0.42,
};

const SEGMENTS = [
    { blocks: [[0,0,0], [1,0,0], [0,1,0]], color: 0 }, 
    { blocks: [[2,0,0], [2,1,0]], color: 1 },
    { blocks: [[1,1,0], [0,2,0]], color: 0 },
    { blocks: [[1,2,0], [2,2,0]], color: 1 },
    { blocks: [[0,0,1], [0,1,1]], color: 1 },
    { blocks: [[1,0,1], [2,0,1]], color: 0 },
    { blocks: [[1,1,1]], color: 1 },
    { blocks: [[0,2,1], [1,2,1]], color: 0 },
    { blocks: [[2,1,1], [2,2,1]], color: 1 },
    { blocks: [[0,0,2], [1,0,2]], color: 0 },
    { blocks: [[2,0,2], [2,1,2]], color: 1 },
    { blocks: [[1,1,2], [0,1,2]], color: 0 },
    { blocks: [[0,2,2], [1,2,2]], color: 1 },
    { blocks: [[2,2,2]], color: 0 },
    { blocks: [[1,2,1], [1,2,0]], color: 0 }, // Adjusting for overlap
    { blocks: [[0,1,1], [0,1,0]], color: 1 },
];

export function HeroPuzzle() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const scriptId = "three-js-cdn";
        let script = document.getElementById(scriptId) as HTMLScriptElement;

        const initAnimation = () => {
            const THREE = (window as any).THREE;
            if (!THREE || !containerRef.current) return;

            let scene: any, camera: any, renderer: any;
            let pieceGroups: any[] = [];
            let globalStartTime = Date.now();
            let animationFrameId: number;

            scene = new THREE.Scene();
            scene.fog = new THREE.Fog(CONFIG.COLORS.OBSIDIAN, 10, 35);

            const width = containerRef.current.clientWidth;
            const height = containerRef.current.clientHeight;

            camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
            camera.position.set(-5.0, 1.5, 20); // Moved slightly left from -7.5 to re-center
            camera.lookAt(0, 0, 0);

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, precision: 'highp' });
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.35;
            containerRef.current.appendChild(renderer.domElement);

            const grid = new THREE.GridHelper(50, 40, CONFIG.COLORS.STUDIO_GRID, CONFIG.COLORS.STUDIO_GRID);
            grid.position.y = -6;
            grid.material.opacity = 0.2;
            grid.material.transparent = true;
            scene.add(grid);

            scene.add(new THREE.AmbientLight(0xffffff, 0.1));
            const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
            keyLight.position.set(-15, 20, 15);
            scene.add(keyLight);

            const rim1 = new THREE.PointLight(CONFIG.COLORS.CYAN_NEON, 8, 30);
            rim1.position.set(-10, 8, 10);
            scene.add(rim1);

            const rim2 = new THREE.PointLight(CONFIG.COLORS.BLUE_NEON, 8, 30);
            rim2.position.set(12, -4, -10);
            scene.add(rim2);

            const createJigsawBlock = (b: number[], segmentColor: number) => {
                const shape = new THREE.Shape();
                const s = CONFIG.CUBE_SIZE / 2;
                const t = CONFIG.JIGSAW_TAB;

                shape.moveTo(-s, -s);
                shape.lineTo(-t/2, -s);
                shape.absarc(0, -s, t/2, Math.PI, 0, true);
                shape.lineTo(s, -s);
                shape.lineTo(s, -t/2);
                shape.absarc(s, 0, t/2, -Math.PI/2, Math.PI/2, false);
                shape.lineTo(s, s);
                shape.lineTo(t/2, s);
                shape.absarc(0, s, t/2, 0, Math.PI, true);
                shape.lineTo(-s, s);
                shape.lineTo(-s, t/2);
                shape.absarc(-s, 0, t/2, Math.PI/2, -Math.PI/2, false);
                shape.lineTo(-s, -s);

                const extrudeSettings = { depth: CONFIG.CUBE_SIZE, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.04, bevelSegments: 3 };
                const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
                geometry.center();

                const neonColor = segmentColor === 0 ? CONFIG.COLORS.CYAN_NEON : CONFIG.COLORS.BLUE_NEON;
                
                // RESTORED PREMIUM GLASS MATERIAL
                const material = new THREE.MeshPhysicalMaterial({
                    color: 0x0a192f,
                    transmission: 1.0,  // Full glassy transmission
                    thickness: 2.5,
                    roughness: 0.15,
                    metalness: 0.1,
                    ior: 1.5,
                    reflectivity: 0.6,
                    clearcoat: 1.0,
                    emissive: neonColor,
                    emissiveIntensity: 0.45, // Glow concentrated on neon rim
                    transparent: true,
                });

                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(b[0] - 1, b[1] - 1, b[2] - 1);
                
                // NEON RIM HIGHLIGHT
                const wireframe = new THREE.EdgesGeometry(geometry);
                const lineMat = new THREE.LineBasicMaterial({ color: neonColor, linewidth: 2, transparent: true, opacity: 0.9 });
                const line = new THREE.LineSegments(wireframe, lineMat);
                mesh.add(line);

                return mesh;
            };

            const createSegment = (data: any) => {
                const group = new THREE.Group();
                data.blocks.forEach((b: number[]) => {
                    group.add(createJigsawBlock(b, data.color));
                });

                // Uniform distribution within a safe container zone
                const rangeX = 10;
                const rangeY = 8;
                group.userData = {
                    initialPos: new THREE.Vector3(
                        (Math.random() - 0.5) * rangeX, 
                        (Math.random() - 0.5) * rangeY, 
                        (Math.random() - 0.5) * 4 - 2
                    ),
                    initialRot: new THREE.Euler(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2),
                    controlPoint: new THREE.Vector3((Math.random() - 0.5) * rangeX * 1.2, (Math.random() - 0.5) * rangeY * 1.2, (Math.random() - 0.5) * 3),
                    idleSpeed: { x: Math.random() * 0.0012, y: Math.random() * 0.0012 }
                };
                return group;
            };

            SEGMENTS.forEach(s => {
                const seg = createSegment(s);
                scene.add(seg);
                pieceGroups.push(seg);
            });

            const eased = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            const lerpRot = (start: THREE.Euler, end: THREE.Euler, t: number) => {
                return new THREE.Euler(
                    start.x + (end.x - start.x) * t,
                    start.y + (end.y - start.y) * t,
                    start.z + (end.z - start.z) * t
                );
            };

            const animate = () => {
                animationFrameId = requestAnimationFrame(animate);
                const elapsed = (Date.now() - globalStartTime) % CONFIG.CYCLE_DURATION;
                const { DRIFT, CONVERGE, LOCK, DISPERSE } = CONFIG.PHASES;

                if (elapsed < DRIFT) {
                    const t = elapsed / DRIFT;
                    pieceGroups.forEach(p => {
                        p.position.copy(p.userData.initialPos);
                        p.rotation.copy(p.userData.initialRot);
                        // Harmonic drift baseline
                        const driftAmt = Math.sin(elapsed * 0.002);
                        p.position.x += Math.sin(p.userData.idleSpeed.x * 1000) * driftAmt * 0.4;
                        p.position.y += Math.cos(p.userData.idleSpeed.y * 1000) * driftAmt * 0.4;
                    });
                    scene.scale.set(1, 1, 1);
                    scene.rotation.y = 0;
                } 
                else if (elapsed < DRIFT + CONVERGE) {
                    const t = eased((elapsed - DRIFT) / CONVERGE);
                    pieceGroups.forEach(p => {
                        const mt = 1 - t;
                        // Formation path IN
                        p.position.set(
                            mt * mt * p.userData.initialPos.x + 2 * mt * t * p.userData.controlPoint.x + t * t * 0,
                            mt * mt * p.userData.initialPos.y + 2 * mt * t * p.userData.controlPoint.y + t * t * 0,
                            mt * mt * p.userData.initialPos.z + 2 * mt * t * p.userData.controlPoint.z + t * t * 0
                        );
                        // Rotation settles to 0
                        p.rotation.set(p.userData.initialRot.x * mt, p.userData.initialRot.y * mt, p.userData.initialRot.z * mt);
                    });
                    // Subtle rotation as it forms
                    scene.rotation.y = t * Math.PI * 0.25;
                }
                else if (elapsed < DRIFT + CONVERGE + LOCK) {
                    const tRaw = (elapsed - DRIFT - CONVERGE) / LOCK;
                    const t = eased(tRaw);
                    const zoom = 1 + (0.12 * Math.sin(tRaw * Math.PI)); // Hero bloom
                    scene.scale.set(zoom, zoom, zoom);
                    scene.rotation.y = Math.PI * 0.25 + (tRaw * Math.PI * 0.25); // Continue rotation
                    
                    pieceGroups.forEach(p => {
                        p.position.set(0, 0, 0);
                        p.rotation.set(0, 0, 0);
                        p.children.forEach((c: any) => {
                            c.material.emissiveIntensity = 0.45 + Math.sin(tRaw * Math.PI) * 0.8;
                        });
                    });
                }
                else if (elapsed < DRIFT + CONVERGE + LOCK + DISPERSE) {
                    const tRaw = (elapsed - DRIFT - CONVERGE - LOCK) / DISPERSE;
                    const t = eased(tRaw);
                    const mt = 1 - t;
                    
                    // MIRROR REVERSE: Rotation continues to a full 180 (PI)
                    scene.rotation.y = Math.PI * 0.5 + (t * Math.PI * 0.5);
                    scene.scale.set(1, 1, 1);

                    pieceGroups.forEach(p => {
                        // MIRROR PATH OUT: Exact reverse of CONVERGE
                        // From 0,0,0 -> controlPoint -> initialPos
                        p.position.set(
                            t * t * p.userData.initialPos.x + 2 * t * mt * p.userData.controlPoint.x + mt * mt * 0,
                            t * t * p.userData.initialPos.y + 2 * t * mt * p.userData.controlPoint.y + mt * mt * 0,
                            t * t * p.userData.initialPos.z + 2 * t * mt * p.userData.controlPoint.z + mt * mt * 0
                        );
                        // Rotation returns to initialRot
                        p.rotation.set(p.userData.initialRot.x * t, p.userData.initialRot.y * t, p.userData.initialRot.z * t);
                    });
                }
                else {
                    const tRaw = (elapsed - DRIFT - CONVERGE - LOCK - DISPERSE) / RESET;
                    const t = eased(tRaw);
                    const mt = 1 - t;
                    
                    // Reset scene rotation to 0 (PI * 2)
                    scene.rotation.y = Math.PI + (t * Math.PI);
                    
                    pieceGroups.forEach(p => {
                        p.position.copy(p.userData.initialPos);
                        p.rotation.copy(p.userData.initialRot);
                    });
                }
                
                renderer.render(scene, camera);
            };

            animate();

            const handleResize = () => {
                if (!containerRef.current) return;
                const w = containerRef.current.clientWidth;
                const h = containerRef.current.clientHeight;
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
                renderer.setSize(w, h);
            };
            window.addEventListener('resize', handleResize);

            return () => {
                cancelAnimationFrame(animationFrameId);
                window.removeEventListener('resize', handleResize);
                if (containerRef.current && renderer.domElement.parentNode === containerRef.current) containerRef.current.removeChild(renderer.domElement);
                renderer.dispose();
            };
        };

        if (!script) {
            script = document.createElement("script");
            script.id = scriptId;
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
            script.async = true;
            script.onload = () => { setIsLoaded(true); initAnimation(); };
            document.head.appendChild(script);
        } else if ((window as any).THREE) {
            setIsLoaded(true); initAnimation();
        } else {
            script.addEventListener("load", () => { setIsLoaded(true); initAnimation(); });
        }
    }, []);

    return (
        <div 
            ref={containerRef} 
            className="absolute top-0 right-0 h-screen w-[42vw] pointer-events-none"
            style={{ zIndex: 1, overflow: 'visible' }}
        >
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                </div>
            )}
        </div>
    );
}
