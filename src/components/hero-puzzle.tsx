"use client";

import { useEffect, useRef, useState } from "react";

// ===================================
// NEO-JIGSAW CONFIGURATION (3x3x3)
// ===================================
const CONFIG = {
    CYCLE_DURATION: 12000,
    PHASES: {
        CONVERGE: 4000,     // 0-4s: Immediate magnetic pull IN
        CLIMAX: 4000,       // 4-8s: Rotate + Enlarge + Shine
        REVERSE: 4000,      // 8-12s: Shrink + Rotate + Descatter
    },

    CUBE_SIZE: 1.1,         
    JIGSAW_TAB: 0.24,       
    
    COLORS: {
        BLUE_NEON: 0x3b82f6,    
        CYAN_NEON: 0x00d4aa,    
        BACKGROUND: 0x030b1e,   // Aligned with Hero BG
        STUDIO_GRID: 0x1e3a5f,  
    },

    CAMERA_DIST: 20.0,
    CAMERA_TILT: 0.35,
};

const updateCameraFov = (camera: any, width: number, height: number) => {
    const aspect = width / height;
    camera.aspect = aspect;
    
    // We want to ensure a minimum horizontal visible width.
    // Fit a horizontal span of 9.0 units.
    const targetWidth = 9.0;
    const dist = CONFIG.CAMERA_DIST; // 20.0
    
    // Standard vertical FOV is 35 degrees.
    const defaultFov = 35;
    const radHeightForDefault = 2 * dist * Math.tan((defaultFov * Math.PI) / 360);
    const defaultWidth = radHeightForDefault * aspect;
    
    if (defaultWidth < targetWidth) {
        // Increase vertical FOV to maintain the target width
        const requiredHeight = targetWidth / aspect;
        const requiredFov = 2 * Math.atan(requiredHeight / (2 * dist)) * (180 / Math.PI);
        camera.fov = Math.min(requiredFov, 75); // Cap at 75 to avoid extreme fisheye/distortion
    } else {
        camera.fov = defaultFov;
    }
    camera.updateProjectionMatrix();
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
    { blocks: [[1,2,1], [1,2,0]], color: 0 },
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
            // Fog color matches hero background for seamless blend
            scene.fog = new THREE.Fog(CONFIG.COLORS.BACKGROUND, 5, 40);

            const width = containerRef.current.clientWidth;
            const height = containerRef.current.clientHeight;

            camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
            camera.position.set(-5.0, 1.0, CONFIG.CAMERA_DIST); 
            camera.lookAt(0, 0, 0);
            updateCameraFov(camera, width, height);

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, precision: 'highp' });
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.5; // More vibrant
            containerRef.current.appendChild(renderer.domElement);

            // Removed GridHelper to eliminate the "frame" look as requested

            scene.add(new THREE.AmbientLight(0xffffff, 0.15));
            const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
            keyLight.position.set(-15, 20, 15);
            scene.add(keyLight);

            const rim1 = new THREE.PointLight(CONFIG.COLORS.CYAN_NEON, 10, 35);
            rim1.position.set(-10, 8, 10);
            scene.add(rim1);

            const rim2 = new THREE.PointLight(CONFIG.COLORS.BLUE_NEON, 10, 35);
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
                
                const material = new THREE.MeshPhysicalMaterial({
                    color: 0x0a192f,
                    transmission: 1.0,
                    thickness: 3.0,
                    roughness: 0.1,
                    metalness: 0.1,
                    ior: 1.5,
                    reflectivity: 0.6,
                    clearcoat: 1.0,
                    emissive: neonColor,
                    emissiveIntensity: 0.5,
                    transparent: true,
                });

                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(b[0] - 1, b[1] - 1, b[2] - 1);
                
                const wireframe = new THREE.EdgesGeometry(geometry);
                const lineMat = new THREE.LineBasicMaterial({ color: neonColor, linewidth: 2, transparent: true, opacity: 0.95 });
                const line = new THREE.LineSegments(wireframe, lineMat);
                mesh.add(line);

                return mesh;
            };

            const createSegment = (data: any) => {
                const group = new THREE.Group();
                data.blocks.forEach((b: number[]) => {
                    group.add(createJigsawBlock(b, data.color));
                });

                // Cluster pieces more tightly within a smaller frame
                const rangeX = 7;
                const rangeY = 6;
                group.userData = {
                    initialPos: new THREE.Vector3(
                        (Math.random() - 0.5) * rangeX, 
                        (Math.random() - 0.5) * rangeY, 
                        (Math.random() - 0.5) * 5 - 2.5
                    ),
                    initialRot: new THREE.Euler(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2),
                    controlPoint: new THREE.Vector3((Math.random() - 0.5) * rangeX * 1.2, (Math.random() - 0.5) * rangeY * 1.2, (Math.random() - 0.5) * 4),
                    idleSpeed: { x: Math.random() * 0.0015, y: Math.random() * 0.0015 }
                };
                return group;
            };

            SEGMENTS.forEach(s => {
                const seg = createSegment(s);
                scene.add(seg);
                pieceGroups.push(seg);
            });

            const eased = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

            const animate = () => {
                animationFrameId = requestAnimationFrame(animate);
                const elapsed = (Date.now() - globalStartTime) % CONFIG.CYCLE_DURATION;
                const { CONVERGE, CLIMAX, REVERSE } = CONFIG.PHASES;

                if (elapsed < CONVERGE) {
                    const t = eased(elapsed / CONVERGE);
                    pieceGroups.forEach(p => {
                        const mt = 1 - t;
                        // Magnetic pull path
                        p.position.set(
                            mt * mt * p.userData.initialPos.x + 2 * mt * t * p.userData.controlPoint.x + t * t * 0,
                            mt * mt * p.userData.initialPos.y + 2 * mt * t * p.userData.controlPoint.y + t * t * 0,
                            mt * mt * p.userData.initialPos.z + 2 * mt * t * p.userData.controlPoint.z + t * t * 0
                        );
                        p.rotation.set(p.userData.initialRot.x * mt, p.userData.initialRot.y * mt, p.userData.initialRot.z * mt);
                    });
                    // Subtle rotation
                    scene.rotation.y = t * Math.PI * 0.25;
                    scene.scale.set(1, 1, 1);
                }
                else if (elapsed < CONVERGE + CLIMAX) {
                    const tRaw = (elapsed - CONVERGE) / CLIMAX;
                    const t = eased(tRaw);
                    
                    // ENLARGE: Scale up to 1.75x
                    const zoom = 1 + (0.45 * Math.sin(tRaw * Math.PI)); 
                    scene.scale.set(zoom, zoom, zoom);
                    
                    // ROTATE: Full rotation cycle
                    scene.rotation.y = Math.PI * 0.25 + (tRaw * Math.PI * 1.5); 
                    
                    pieceGroups.forEach(p => {
                        p.position.set(0, 0, 0);
                        p.rotation.set(0, 0, 0);
                        p.children.forEach((c: any) => {
                            // PULSING GLOW
                            c.material.emissiveIntensity = 0.5 + Math.sin(tRaw * Math.PI) * 1.2;
                        });
                    });
                }
                else {
                    const tRaw = (elapsed - CONVERGE - CLIMAX) / REVERSE;
                    const t = eased(tRaw);
                    const mt = 1 - t;
                    
                    // REVERSE: Rotation completes back to original scatter orientation
                    scene.rotation.y = (Math.PI * 0.25 + Math.PI * 1.5) * mt;
                    scene.scale.set(1, 1, 1);

                    pieceGroups.forEach(p => {
                        // PERFECT INVERSE PATH: From 0,0,0 -> controlPoint -> initialPos
                        p.position.set(
                            t * t * p.userData.initialPos.x + 2 * t * mt * p.userData.controlPoint.x + mt * mt * 0,
                            t * t * p.userData.initialPos.y + 2 * t * mt * p.userData.controlPoint.y + mt * mt * 0,
                            t * t * p.userData.initialPos.z + 2 * t * mt * p.userData.controlPoint.z + mt * mt * 0
                        );
                        p.rotation.set(p.userData.initialRot.x * t, p.userData.initialRot.y * t, p.userData.initialRot.z * t);
                    });
                }
                
                renderer.render(scene, camera);
            };

            animate();

            const handleResize = () => {
                if (!containerRef.current) return;
                const w = containerRef.current.clientWidth;
                const h = containerRef.current.clientHeight;
                updateCameraFov(camera, w, h);
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
            className="absolute inset-0 pointer-events-none w-full h-full"
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

