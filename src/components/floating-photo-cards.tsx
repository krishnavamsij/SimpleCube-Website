"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

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
   3D Sphere with photo-collage texture
   - cols × rows grid baked into a canvas texture
   - Mapped onto a THREE.SphereGeometry so each
     cell naturally curves with lat/lon lines
───────────────────────────────────────────── */
function SphereCollage({ radius }: { radius: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    let isMounted = true;

    const TEX_W = 4096;
    const TEX_H = 2048;
    const COLS = 12;
    const ROWS = 6;
    const BORDER = 24; // black gap between images in px (at texture res)

    const canvas = document.createElement("canvas");
    canvas.width = TEX_W;
    canvas.height = TEX_H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, TEX_W, TEX_H);

    const cellW = TEX_W / COLS;
    const cellH = TEX_H / ROWS;

    const loadImages = async () => {
      const loaded = await Promise.all(
        IMAGE_POOL.map(
          (src) =>
            new Promise<HTMLImageElement>((resolve) => {
              const img = new Image();
              img.crossOrigin = "anonymous";
              img.onload = () => resolve(img);
              img.onerror = () => resolve(img);
              img.src = src;
            })
        )
      );
      const valid = loaded.filter((img) => img.width > 0);
      if (valid.length === 0) return;

      let idx = 0;
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const img = valid[idx % valid.length];
          idx++;

          const destX = c * cellW + BORDER / 2;
          const destY = r * cellH + BORDER / 2;
          const destW = cellW - BORDER;
          const destH = cellH - BORDER;

          // object-fit: cover
          const imgAR = img.width / img.height;
          const cellAR = destW / destH;
          let sx = 0, sy = 0, sw = img.width, sh = img.height;
          if (imgAR > cellAR) {
            sw = img.height * cellAR;
            sx = (img.width - sw) / 2;
          } else {
            sh = img.width / cellAR;
            sy = (img.height - sh) / 2;
          }

          ctx.drawImage(img, sx, sy, sw, sh, destX, destY, destW, destH);
        }
      }

      if (isMounted) {
        const tex = new THREE.CanvasTexture(canvas);
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = 16;
        setTexture(tex);
      }
    };

    loadImages();
    return () => { isMounted = false; };
  }, []);

  // Slow spin matching the DigitalGlobe's rotation speed (frame * 0.06 deg/frame at ~60fps)
  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.06 * (Math.PI / 180) * 60;
    }
  });

  if (!texture) return null;

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshBasicMaterial 
        map={texture} 
        transparent 
        opacity={0.55}
      />
    </mesh>
  );
}

/* ─────────────────────────────────────────────
   Scene — syncs orthographic camera to pixel size
───────────────────────────────────────────── */
function Scene({ radius }: { radius: number }) {
  const { camera, size } = useThree();

  useEffect(() => {
    if (camera instanceof THREE.OrthographicCamera) {
      camera.left   = -size.width  / 2;
      camera.right  =  size.width  / 2;
      camera.top    =  size.height / 2;
      camera.bottom = -size.height / 2;
      camera.updateProjectionMatrix();
    }
  }, [camera, size]);

  return <SphereCollage radius={radius} />;
}

/* ─────────────────────────────────────────────
   FloatingPhotoCards
   - Sits BEHIND the DigitalGlobe canvas (zIndex -1)
   - Matches the exact globe radius (Math.min(w,h)*0.42)
   - Renders via WebGL so latitude/longitude curves
     appear naturally on the sphere surface
───────────────────────────────────────────── */
export function FloatingPhotoCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(0);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setRadius(Math.min(width, height) * 0.42);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: -1, // strictly behind the DigitalGlobe canvas
        pointerEvents: "none",
      }}
    >
      {radius > 0 && (
        <Canvas
          orthographic
          camera={{ position: [0, 0, 1000], zoom: 1 }}
          gl={{ antialias: true, alpha: true }}
          style={{ width: "100%", height: "100%" }}
        >
          <Scene radius={radius} />
        </Canvas>
      )}
    </div>
  );
}
