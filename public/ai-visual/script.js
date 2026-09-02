/**
 * script.js
 * Subtle parallax interaction on mouse move.
 * Uses requestAnimationFrame with lerp smoothing.
 * Parallax is disabled on touch devices.
 */

(function () {
  'use strict';

  const scene = document.getElementById('scene');
  const topCircle = document.getElementById('topCircleGroup');
  const botCircle = document.getElementById('botCircleGroup');
  const orbWrapper = document.getElementById('orbWrapper');
  const decorRings = document.getElementById('decorRings');

  if (!scene) return;

  const isTouchDevice = () => window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  const LERP_FACTOR = 0.06;

  // Maximum parallax offsets in pixels
  const LIMITS = {
    circles: 5,
    orb: 10,
    decor: 12
  };

  function handleMouseMove(e) {
    if (isTouchDevice()) return;

    const rect = scene.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    targetX = (e.clientX - centerX) / (rect.width / 2);
    targetY = (e.clientY - centerY) / (rect.height / 2);

    targetX = Math.max(-1, Math.min(1, targetX));
    targetY = Math.max(-1, Math.min(1, targetY));
  }

  function handleMouseLeave() {
    targetX = 0;
    targetY = 0;
  }

  function render() {
    mouseX += (targetX - mouseX) * LERP_FACTOR;
    mouseY += (targetY - mouseY) * LERP_FACTOR;

    if (!isTouchDevice()) {
      if (topCircle) {
        topCircle.style.transform = `translate(${(mouseX * LIMITS.circles).toFixed(2)}px, ${(mouseY * LIMITS.circles).toFixed(2)}px)`;
      }
      if (botCircle) {
        botCircle.style.transform = `translate(${(-mouseX * LIMITS.circles * 0.7).toFixed(2)}px, ${(-mouseY * LIMITS.circles * 0.7).toFixed(2)}px)`;
      }
      // Center circle stays stationary in the exact center
      if (decorRings) {
        decorRings.style.transform = `translate(${(mouseX * LIMITS.decor).toFixed(2)}px, ${(mouseY * LIMITS.decor).toFixed(2)}px)`;
      }
    }

    requestAnimationFrame(render);
  }

  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

  requestAnimationFrame(render);
})();
