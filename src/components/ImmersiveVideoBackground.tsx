import React, { useEffect, useRef, useState, useCallback } from 'react';

// Section alignment and color themes that transition smoothly as you scroll
const SECTION_THEMES = [
  { name: 'hero', hue: 0, brightness: 1, saturation: 1.15, scale: 1.08, alignX: 0, alignY: 0, rotZ: 0, overlay: 0.3 },
  { name: 'work', hue: 18, brightness: 0.82, saturation: 1.25, scale: 1.14, alignX: -30, alignY: -15, rotZ: -0.6, overlay: 0.48 },
  { name: 'journal', hue: -18, brightness: 0.75, saturation: 1.3, scale: 1.12, alignX: 30, alignY: 15, rotZ: 0.6, overlay: 0.52 },
  { name: 'explorations', hue: 35, brightness: 0.8, saturation: 1.2, scale: 1.18, alignX: 0, alignY: -30, rotZ: -0.8, overlay: 0.44 },
  { name: 'stats', hue: -25, brightness: 0.7, saturation: 1.35, scale: 1.1, alignX: -20, alignY: 20, rotZ: 0.5, overlay: 0.58 },
  { name: 'contact', hue: 12, brightness: 0.88, saturation: 1.15, scale: 1.15, alignX: 0, alignY: 0, rotZ: 0, overlay: 0.35 },
];

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export const ImmersiveVideoBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const scrollProgressRef = useRef(0);
  const frameRef = useRef(0);
  const currentThemeRef = useRef({
    hue: 0,
    brightness: 1,
    saturation: 1.15,
    scale: 1.08,
    alignX: 0,
    alignY: 0,
    rotZ: 0,
    overlay: 0.3,
  });

  // Track mouse coordinates normalized between -1 and 1
  const handleMouseMove = useCallback((e: MouseEvent) => {
    targetMouseRef.current = {
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    };
  }, []);

  // Track scroll position across the full document
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgressRef.current = docHeight > 0 ? scrollY / docHeight : 0;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Smooth animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      // Smooth mouse lerp (inertia)
      mouseRef.current.x = lerp(mouseRef.current.x, targetMouseRef.current.x, 0.05);
      mouseRef.current.y = lerp(mouseRef.current.y, targetMouseRef.current.y, 0.05);

      const progress = scrollProgressRef.current;

      // Determine which two section themes to interpolate between
      const totalSections = SECTION_THEMES.length;
      const sectionFloat = progress * (totalSections - 1);
      const sectionIdx = Math.min(Math.floor(sectionFloat), totalSections - 2);
      const sectionT = sectionFloat - sectionIdx;

      const themeA = SECTION_THEMES[sectionIdx];
      const themeB = SECTION_THEMES[Math.min(sectionIdx + 1, totalSections - 1)];

      // Interpolate theme target values
      const targetHue = lerp(themeA.hue, themeB.hue, sectionT);
      const targetBrightness = lerp(themeA.brightness, themeB.brightness, sectionT);
      const targetSaturation = lerp(themeA.saturation, themeB.saturation, sectionT);
      const targetScale = lerp(themeA.scale, themeB.scale, sectionT);
      const targetAlignX = lerp(themeA.alignX, themeB.alignX, sectionT);
      const targetAlignY = lerp(themeA.alignY, themeB.alignY, sectionT);
      const targetRotZ = lerp(themeA.rotZ, themeB.rotZ, sectionT);
      const targetOverlay = lerp(themeA.overlay, themeB.overlay, sectionT);

      // Smoothly transition current theme towards targets
      const cur = currentThemeRef.current;
      cur.hue = lerp(cur.hue, targetHue, 0.06);
      cur.brightness = lerp(cur.brightness, targetBrightness, 0.06);
      cur.saturation = lerp(cur.saturation, targetSaturation, 0.06);
      cur.scale = lerp(cur.scale, targetScale, 0.06);
      cur.alignX = lerp(cur.alignX, targetAlignX, 0.06);
      cur.alignY = lerp(cur.alignY, targetAlignY, 0.06);
      cur.rotZ = lerp(cur.rotZ, targetRotZ, 0.06);
      cur.overlay = lerp(cur.overlay, targetOverlay, 0.06);

      // Mouse-driven 3D parallax & tilt calculations
      const mousePanX = mouseRef.current.x * 25;
      const mousePanY = mouseRef.current.y * 18;
      const mouseTiltX = mouseRef.current.y * -4;
      const mouseTiltY = mouseRef.current.x * 4;

      const totalX = cur.alignX + mousePanX;
      const totalY = cur.alignY + mousePanY;

      // Apply transformations to the video
      if (videoRef.current) {
        videoRef.current.style.transform = `translate(calc(-50% + ${totalX.toFixed(2)}px), calc(-50% + ${totalY.toFixed(2)}px)) perspective(1200px) rotateX(${mouseTiltX.toFixed(2)}deg) rotateY(${mouseTiltY.toFixed(2)}deg) rotateZ(${cur.rotZ.toFixed(2)}deg) scale(${cur.scale.toFixed(3)})`;
        videoRef.current.style.filter = `hue-rotate(${cur.hue.toFixed(1)}deg) brightness(${cur.brightness.toFixed(2)}) saturate(${cur.saturation.toFixed(2)})`;
      }

      // Dynamic overlay opacity for perfect contrast per section
      if (overlayRef.current) {
        overlayRef.current.style.backgroundColor = `rgba(10, 10, 10, ${cur.overlay.toFixed(2)})`;
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleMouseMove, handleScroll]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Video element with 3D transform & filter capability */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 min-w-[115%] min-h-[115%] w-auto h-auto object-cover"
        style={{
          transform: 'translate(-50%, -50%) scale(1.08)',
          willChange: 'transform, filter',
        }}
      >
        <source src="/assets/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Dynamic color overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(10, 10, 10, 0.3)', willChange: 'background-color' }}
      />

      {/* Radial vignette for cinematic depth */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 25%, rgba(10, 10, 10, 0.75) 100%)',
        }}
      />
    </div>
  );
};
