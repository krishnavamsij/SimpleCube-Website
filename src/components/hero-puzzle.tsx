"use client";

import { useEffect, useRef, useState } from "react";

// THREE.js is loaded at runtime from CDN; use loose typing for the dynamic API surface.
type ThreeLib = typeof import("three");
type ThreeObject3D = import("three").Object3D;
type ThreeCamera = import("three").PerspectiveCamera;
type ThreeMaterial = import("three").MeshBasicMaterial;

declare global {
    interface Window {
        THREE?: ThreeLib;
    }
}

// ===================================
// SIMPLECUBE CONFIGURATION (3x3x3)
// Logo-matched: flat #135498 faces, fat white edges, isometric rest pose
// ===================================
const CONFIG = {
    CYCLE_DURATION: 13000,
    PHASES: {
        ASSEMBLE: 4500,
        HOLD: 7000,
        SHATTER: 1500,
    },
    CUBE_SIZE: 1.12,
    COLORS: {
        PRIMARY: 0x135498,
        EDGE: 0xffffff,
        BACKGROUND: 0xf5f9fc,
    },
    CAMERA_DIST: 18.0,
    /** Cell wireframes while flying / pre-shatter */
    LINE_OPACITY: 0.75,
    /** Thin white cell seams — during late assemble & before shatter */
    CELL_SEAM_OPACITY: 0.55,
    CELL_SEAM_MS: 2000,
    CELL_SEAM_FADE_MS: 200,
    /** White outer silhouette while assembled */
    OUTER_EDGE_OPACITY: 1,
    /** Fat edge ribbon thickness (world units) — logo-like weight */
    EDGE_THICKNESS: 0.055,
    /** Thin white 3×3 grid lines on each large face (always on) */
    FACE_LINE_THICKNESS: 0.022,
    FACE_LINE_OPACITY: 0.9,
    LINE_FADE_OUT_MS: 800,
    LINE_PRE_SHATTER_MS: 1000,
    LINE_FADE_IN_MS: 280,
    /** Classic isometric pitch: arctan(1/√2) — logo-matched, held fixed while spinning */
    ISO_PITCH: Math.atan(1 / Math.sqrt(2)),
    /** Continuous slow spin about vertical axis only (rad/sec) */
    SPIN_RAD_PER_SEC: 0.18,
};

const updateCameraFov = (camera: ThreeCamera, width: number, height: number) => {
    const aspect = width / height;
    camera.aspect = aspect;
    const targetWidth = 9.0;
    const dist = CONFIG.CAMERA_DIST;
    const defaultFov = 32;
    const radHeightForDefault = 2 * dist * Math.tan((defaultFov * Math.PI) / 360);
    const defaultWidth = radHeightForDefault * aspect;

    if (defaultWidth < targetWidth) {
        const requiredHeight = targetWidth / aspect;
        const requiredFov = 2 * Math.atan(requiredHeight / (2 * dist)) * (180 / Math.PI);
        camera.fov = Math.min(requiredFov, 70);
    } else {
        camera.fov = defaultFov;
    }
    camera.updateProjectionMatrix();
};

/** 12 fat box-ribbons along a cube’s edges (WebGL-safe thick lines) */
const createFatCubeEdges = (THREE: ThreeLib, size: number, thickness: number, color: number) => {
    const group = new THREE.Group();
    const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0,
        depthTest: true,
        depthWrite: false,
    });

    const h = size / 2;
    const t = thickness;
    const corners: [number, number, number][] = [
        [-h, -h, -h],
        [h, -h, -h],
        [h, -h, h],
        [-h, -h, h],
        [-h, h, -h],
        [h, h, -h],
        [h, h, h],
        [-h, h, h],
    ];
    const pairs: [number, number][] = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
        [4, 5],
        [5, 6],
        [6, 7],
        [7, 4],
        [0, 4],
        [1, 5],
        [2, 6],
        [3, 7],
    ];

    const zAxis = new THREE.Vector3(0, 0, 1);
    const dir = new THREE.Vector3();

    pairs.forEach(([i, j]) => {
        const a = corners[i];
        const b = corners[j];
        dir.set(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
        const length = dir.length();
        dir.normalize();

        const geo = new THREE.BoxGeometry(t, t, length + t * 0.15);
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
        mesh.quaternion.setFromUnitVectors(zAxis, dir);
        mesh.renderOrder = 3;
        group.add(mesh);
    });

    return { group, mat };
};

/** 3×3 subdivision lines on each of the 6 large cube faces (always-on skeleton detail) */
const createFaceGridLines = (THREE: ThreeLib, size: number, thickness: number, color: number) => {
    const group = new THREE.Group();
    const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 1,
        depthTest: true,
        depthWrite: false,
    });

    const h = size / 2;
    const t = thickness;
    const divs = [-size / 6, size / 6]; // equal thirds
    const zAxis = new THREE.Vector3(0, 0, 1);
    const dir = new THREE.Vector3();

    const addSegment = (ax: number, ay: number, az: number, bx: number, by: number, bz: number) => {
        dir.set(bx - ax, by - ay, bz - az);
        const length = dir.length();
        dir.normalize();
        const geo = new THREE.BoxGeometry(t, t, length + t * 0.05);
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set((ax + bx) / 2, (ay + by) / 2, (az + bz) / 2);
        mesh.quaternion.setFromUnitVectors(zAxis, dir);
        mesh.renderOrder = 2;
        group.add(mesh);
    };

    // ±Z faces
    for (const z of [-h, h]) {
        for (const x of divs) addSegment(x, -h, z, x, h, z);
        for (const y of divs) addSegment(-h, y, z, h, y, z);
    }
    // ±Y faces
    for (const y of [-h, h]) {
        for (const x of divs) addSegment(x, y, -h, x, y, h);
        for (const z of divs) addSegment(-h, y, z, h, y, z);
    }
    // ±X faces
    for (const x of [-h, h]) {
        for (const y of divs) addSegment(x, y, -h, x, y, h);
        for (const z of divs) addSegment(x, -h, z, x, h, z);
    }

    return { group, mat };
};

export function HeroPuzzle() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const scriptId = "three-js-cdn";
        let script = document.getElementById(scriptId) as HTMLScriptElement;

        const initAnimation = () => {
            const THREE = window.THREE;
            if (!THREE || !containerRef.current) return;

            const pieceGroups: ThreeObject3D[] = [];
            const globalStartTime = Date.now();
            let animationFrameId = 0;

            const scene = new THREE.Scene();
            scene.fog = new THREE.Fog(CONFIG.COLORS.BACKGROUND, 32, 60);

            // orbit = constant slow spin; content = isometric pose + mouse parallax
            const orbit = new THREE.Group();
            const content = new THREE.Group();
            content.rotation.order = "YXZ";
            orbit.add(content);
            scene.add(orbit);

            const width = containerRef.current.clientWidth;
            const height = containerRef.current.clientHeight;
            let aspect = width / height;
            let scaleFactor = Math.max(0.85, Math.min(1.0, aspect * 1.15));

            // Frontal camera — isometric comes from content rotation (logo match)
            const camera = new THREE.PerspectiveCamera(32, aspect, 0.1, 1000);
            camera.position.set(0, 0, CONFIG.CAMERA_DIST);
            updateCameraFov(camera, width, height);
            camera.lookAt(0, 0, 0);

            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, precision: "highp" });
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.toneMapping = THREE.NoToneMapping;
            containerRef.current.appendChild(renderer.domElement);

            // ===================================
            // Flat #135498 cells (MeshBasicMaterial = unshaded, logo-like)
            // ===================================
            const createComplexCube = (x: number, y: number, z: number) => {
                const geometry = new THREE.BoxGeometry(CONFIG.CUBE_SIZE, CONFIG.CUBE_SIZE, CONFIG.CUBE_SIZE);

                const solidMaterial = new THREE.MeshBasicMaterial({
                    color: CONFIG.COLORS.PRIMARY,
                    transparent: true,
                    opacity: 0.0,
                    depthWrite: true,
                });

                const solidMesh = new THREE.Mesh(geometry, solidMaterial);
                solidMesh.position.set(x - 1, y - 1, z - 1);

                // Thin white cell seams (shown briefly after assemble / before shatter)
                const wireframe = new THREE.EdgesGeometry(geometry);
                const lineMat = new THREE.LineBasicMaterial({
                    color: CONFIG.COLORS.EDGE,
                    transparent: true,
                    opacity: 0,
                    depthWrite: false,
                });
                const lineMesh = new THREE.LineSegments(wireframe, lineMat);
                lineMesh.renderOrder = 2;
                solidMesh.add(lineMesh);

                return { group: solidMesh, solidMaterial, lineMat };
            };

            const applyFaceOpacity = (mat: ThreeMaterial, opacity: number) => {
                mat.color.setHex(CONFIG.COLORS.PRIMARY);
                mat.opacity = Math.max(0, Math.min(1, opacity));
                mat.transparent = mat.opacity < 0.999;
                mat.depthWrite = mat.opacity > 0.5;
                mat.needsUpdate = true;
            };

            const rangeLimit = 20;

            for (let x = 0; x < 3; x++) {
                for (let y = 0; y < 3; y++) {
                    for (let z = 0; z < 3; z++) {
                        const wrapper = new THREE.Group();
                        const { group, solidMaterial, lineMat } = createComplexCube(x, y, z);
                        wrapper.add(group);

                        const staggerDelay = y * 200 + x * 100 + z * 100;
                        const scatterDir = new THREE.Vector3(
                            (Math.random() - 0.5) * rangeLimit,
                            (Math.random() - 0.5) * rangeLimit,
                            (Math.random() - 0.5) * rangeLimit
                        );

                        wrapper.userData = {
                            initialPos: scatterDir,
                            initialRot: new THREE.Euler(
                                Math.random() * Math.PI * 4,
                                Math.random() * Math.PI * 4,
                                Math.random() * Math.PI * 4
                            ),
                            staggerDelay,
                            solidMat: solidMaterial,
                            lineMat,
                        };

                        content.add(wrapper);
                        pieceGroups.push(wrapper);
                    }
                }
            }

            // Fat white outer silhouette (assembled cube only — not per-cell)
            const outerSize = 2 + CONFIG.CUBE_SIZE;
            const { group: outerOutline, mat: outerEdgeMat } = createFatCubeEdges(
                THREE,
                outerSize,
                CONFIG.EDGE_THICKNESS,
                CONFIG.COLORS.EDGE
            );
            // Always-on SimpleCube frame — small cubes magnetize into / out of this silhouette
            outerOutline.scale.setScalar(1.01);
            outerEdgeMat.opacity = CONFIG.OUTER_EDGE_OPACITY;
            content.add(outerOutline);

            // Always-on thin white grid on each large face (3×3)
            const { group: faceGrid, mat: faceGridMat } = createFaceGridLines(
                THREE,
                outerSize,
                CONFIG.FACE_LINE_THICKNESS,
                CONFIG.COLORS.EDGE
            );
            faceGrid.scale.setScalar(1.012);
            faceGridMat.opacity = CONFIG.FACE_LINE_OPACITY;
            content.add(faceGrid);

            const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

            const cellLineOpacityForElapsed = (elapsed: number, ASSEMBLE: number, HOLD: number) => {
                const { CELL_SEAM_OPACITY, CELL_SEAM_MS, CELL_SEAM_FADE_MS } = CONFIG;
                const fade = CELL_SEAM_FADE_MS;

                const seamOpacityInWindow = (sinceStart: number, windowMs: number) => {
                    if (sinceStart < 0 || sinceStart > windowMs) return 0;
                    if (sinceStart < fade) return CELL_SEAM_OPACITY * (sinceStart / fade);
                    if (sinceStart > windowMs - fade) {
                        return CELL_SEAM_OPACITY * ((windowMs - sinceStart) / fade);
                    }
                    return CELL_SEAM_OPACITY;
                };

                // 2s window that starts during assembly (last 2s of assemble)
                if (elapsed < ASSEMBLE) {
                    const windowStart = Math.max(0, ASSEMBLE - CELL_SEAM_MS);
                    return seamOpacityInWindow(elapsed - windowStart, CELL_SEAM_MS);
                }

                // 2s before shatter
                if (elapsed < ASSEMBLE + HOLD) {
                    const holdElapsed = elapsed - ASSEMBLE;
                    const preShatterAt = HOLD - CELL_SEAM_MS;
                    return seamOpacityInWindow(holdElapsed - preShatterAt, CELL_SEAM_MS);
                }

                return 0;
            };

            /** White outer silhouette — always visible as the SimpleCube “magnet” frame */
            const outerLineOpacityForElapsed = () => CONFIG.OUTER_EDGE_OPACITY;

            const animate = () => {
                animationFrameId = requestAnimationFrame(animate);
                const now = Date.now();
                const elapsed = (now - globalStartTime) % CONFIG.CYCLE_DURATION;
                const { ASSEMBLE, HOLD, SHATTER } = CONFIG.PHASES;
                const { ISO_PITCH, SPIN_RAD_PER_SEC } = CONFIG;

                // Fixed isometric elevation (logo angle); spin only around world up
                content.rotation.x = -ISO_PITCH;
                content.rotation.y = 0;
                content.rotation.z = 0;
                orbit.rotation.y = ((now - globalStartTime) / 1000) * SPIN_RAD_PER_SEC;

                const cellLineOpacity = cellLineOpacityForElapsed(elapsed, ASSEMBLE, HOLD);
                outerEdgeMat.opacity = outerLineOpacityForElapsed();
                outerOutline.visible = true;

                pieceGroups.forEach((p) => {
                    const data = p.userData;
                    data.lineMat.opacity = cellLineOpacity;

                    if (elapsed < ASSEMBLE) {
                        const localTime = Math.max(0, elapsed - data.staggerDelay);
                        const duration = ASSEMBLE - 1000;
                        const t = Math.min(1, localTime / duration);
                        const easedT = easeOutExpo(t);
                        const mt = 1 - easedT;

                        p.position.set(
                            data.initialPos.x * mt,
                            data.initialPos.y * mt,
                            data.initialPos.z * mt
                        );
                        p.rotation.set(
                            data.initialRot.x * mt,
                            data.initialRot.y * mt,
                            data.initialRot.z * mt
                        );

                        applyFaceOpacity(data.solidMat, easedT);
                    } else if (elapsed < ASSEMBLE + HOLD) {
                        p.position.set(0, 0, 0);
                        p.rotation.set(0, 0, 0);
                        applyFaceOpacity(data.solidMat, 1.0);
                    } else {
                        // Shatter: pieces leave the SimpleCube; white outer ribbons stay put
                        const shatterElapsed = elapsed - ASSEMBLE - HOLD;
                        const t = shatterElapsed / SHATTER;
                        const easedT = t * t * t;

                        p.position.set(
                            data.initialPos.x * easedT,
                            data.initialPos.y * easedT,
                            data.initialPos.z * easedT
                        );
                        p.rotation.set(
                            data.initialRot.x * easedT,
                            data.initialRot.y * easedT,
                            data.initialRot.z * easedT
                        );
                        // Keep faces readable longer so disassemble feels continuous
                        applyFaceOpacity(data.solidMat, Math.max(0, 1 - t * 1.25));
                    }
                });

                content.scale.set(scaleFactor, scaleFactor, scaleFactor);
                renderer.render(scene, camera);
            };

            animate();

            const handleResize = () => {
                if (!containerRef.current) return;
                const w = containerRef.current.clientWidth;
                const h = containerRef.current.clientHeight;
                aspect = w / h;
                scaleFactor = Math.max(0.85, Math.min(1.0, aspect * 1.15));
                updateCameraFov(camera, w, h);
                renderer.setSize(w, h);
            };

            window.addEventListener("resize", handleResize);

            return () => {
                cancelAnimationFrame(animationFrameId);
                window.removeEventListener("resize", handleResize);
                if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
                    containerRef.current.removeChild(renderer.domElement);
                }
                renderer.dispose();
            };
        };

        if (!script) {
            script = document.createElement("script");
            script.id = scriptId;
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
            script.async = true;
            script.onload = () => {
                queueMicrotask(() => setIsLoaded(true));
                initAnimation();
            };
            document.head.appendChild(script);
        } else if (window.THREE) {
            queueMicrotask(() => setIsLoaded(true));
            initAnimation();
        } else {
            script.addEventListener("load", () => {
                queueMicrotask(() => setIsLoaded(true));
                initAnimation();
            });
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 1, overflow: "visible" }}
        >
            {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-[#135498]/20 border-t-[#135498] rounded-full animate-spin" />
                </div>
            )}
        </div>
    );
}
