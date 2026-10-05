import React, { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';

interface ParticleUniverseProps {
  isReady: boolean;
}

// Configuration
const PARTICLE_COUNT = 600;
const SHAPE_COUNT = 12;
const CONNECTION_DISTANCE = 2.8;
const MOUSE_INFLUENCE_RADIUS = 4;
const MOUSE_REPULSION_STRENGTH = 0.02;

// Color palette matching the portfolio accent
const ACCENT_PRIMARY = new THREE.Color('#4E85BF');
const ACCENT_SECONDARY = new THREE.Color('#89AACC');
const ACCENT_GLOW = new THREE.Color('#6BA3D6');
const DEEP_BLUE = new THREE.Color('#1a3a5c');

// Geometric shape types
type ShapeType = 'sphere' | 'torus' | 'icosahedron' | 'octahedron' | 'torusKnot';

interface FloatingShape {
  mesh: THREE.Mesh;
  basePosition: THREE.Vector3;
  orbitRadius: number;
  orbitSpeed: number;
  rotationSpeed: THREE.Vector3;
  phase: number;
  floatAmplitude: number;
  floatSpeed: number;
}

function createShapeGeometry(type: ShapeType): THREE.BufferGeometry {
  switch (type) {
    case 'sphere':
      return new THREE.SphereGeometry(0.3, 16, 16);
    case 'torus':
      return new THREE.TorusGeometry(0.3, 0.12, 12, 24);
    case 'icosahedron':
      return new THREE.IcosahedronGeometry(0.3, 0);
    case 'octahedron':
      return new THREE.OctahedronGeometry(0.3, 0);
    case 'torusKnot':
      return new THREE.TorusKnotGeometry(0.22, 0.08, 48, 8);
    default:
      return new THREE.SphereGeometry(0.3, 16, 16);
  }
}

export const ParticleUniverse: React.FC<ParticleUniverseProps> = ({ isReady }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameIdRef = useRef<number>(0);
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const targetMouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const particlesRef = useRef<THREE.Points | null>(null);
  const shapesRef = useRef<FloatingShape[]>([]);
  const connectionLinesRef = useRef<THREE.LineSegments | null>(null);
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());
  const fadeInRef = useRef<number>(0);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    targetMouseRef.current.set(x, y);
  }, []);

  const handleResize = useCallback(() => {
    if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(width, height);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // --- Ambient Light ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // --- Point Lights (accent colors) ---
    const pointLight1 = new THREE.PointLight(ACCENT_PRIMARY, 2, 20);
    pointLight1.position.set(-5, 3, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(ACCENT_SECONDARY, 1.5, 20);
    pointLight2.position.set(5, -2, 3);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(DEEP_BLUE, 1, 15);
    pointLight3.position.set(0, 5, -3);
    scene.add(pointLight3);

    // --- Particle System ---
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const originalPositions = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      // Distribute particles in a large sphere
      const radius = 5 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi) - 2;

      originalPositions[i3] = positions[i3];
      originalPositions[i3 + 1] = positions[i3 + 1];
      originalPositions[i3 + 2] = positions[i3 + 2];

      // Random drift velocities
      velocities[i3] = (Math.random() - 0.5) * 0.003;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.003;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.002;

      // Blend between accent colors
      const colorMix = Math.random();
      const color = new THREE.Color().lerpColors(ACCENT_PRIMARY, ACCENT_SECONDARY, colorMix);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 3 + 1;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // --- Connection Lines ---
    const lineGeometry = new THREE.BufferGeometry();
    const maxLines = 400;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
    lineGeometry.setDrawRange(0, 0);

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const connectionLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(connectionLines);
    connectionLinesRef.current = connectionLines;

    // --- Floating Geometric Shapes ---
    const shapeTypes: ShapeType[] = ['sphere', 'torus', 'icosahedron', 'octahedron', 'torusKnot'];
    const shapes: FloatingShape[] = [];

    for (let i = 0; i < SHAPE_COUNT; i++) {
      const type = shapeTypes[i % shapeTypes.length];
      const geometry = createShapeGeometry(type);
      const material = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color().lerpColors(ACCENT_PRIMARY, ACCENT_SECONDARY, Math.random()),
        metalness: 0.3,
        roughness: 0.2,
        transparent: true,
        opacity: 0.4,
        wireframe: Math.random() > 0.5,
        emissive: ACCENT_GLOW,
        emissiveIntensity: 0.15,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);

      const angle = (i / SHAPE_COUNT) * Math.PI * 2;
      const orbitRadius = 3 + Math.random() * 4;
      const basePosition = new THREE.Vector3(
        Math.cos(angle) * orbitRadius,
        (Math.random() - 0.5) * 5,
        Math.sin(angle) * orbitRadius - 3
      );

      mesh.position.copy(basePosition);
      mesh.scale.setScalar(0.6 + Math.random() * 0.8);
      scene.add(mesh);

      shapes.push({
        mesh,
        basePosition,
        orbitRadius,
        orbitSpeed: 0.05 + Math.random() * 0.1,
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.01
        ),
        phase: Math.random() * Math.PI * 2,
        floatAmplitude: 0.3 + Math.random() * 0.5,
        floatSpeed: 0.3 + Math.random() * 0.5,
      });
    }
    shapesRef.current = shapes;

    // --- Animation Loop ---
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      const elapsed = clockRef.current.getElapsedTime();

      // Smooth mouse lerp
      mouseRef.current.lerp(targetMouseRef.current, 0.05);

      // Fade in effect
      if (fadeInRef.current < 1) {
        fadeInRef.current = Math.min(fadeInRef.current + 0.008, 1);
      }
      const fadeAlpha = fadeInRef.current;

      // --- Animate particles ---
      const posAttr = particleGeometry.getAttribute('position') as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;

        // Drift
        posArray[i3] += velocities[i3];
        posArray[i3 + 1] += velocities[i3 + 1];
        posArray[i3 + 2] += velocities[i3 + 2];

        // Gentle return to original positions
        posArray[i3] += (originalPositions[i3] - posArray[i3]) * 0.001;
        posArray[i3 + 1] += (originalPositions[i3 + 1] - posArray[i3 + 1]) * 0.001;
        posArray[i3 + 2] += (originalPositions[i3 + 2] - posArray[i3 + 2]) * 0.001;

        // Subtle sine wave motion
        posArray[i3 + 1] += Math.sin(elapsed * 0.5 + i * 0.1) * 0.001;

        // Mouse repulsion (2D projection)
        const dx = posArray[i3] - mouseRef.current.x * 5;
        const dy = posArray[i3 + 1] - mouseRef.current.y * 3;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_INFLUENCE_RADIUS && dist > 0.1) {
          const force = (MOUSE_INFLUENCE_RADIUS - dist) / MOUSE_INFLUENCE_RADIUS;
          posArray[i3] += (dx / dist) * force * MOUSE_REPULSION_STRENGTH;
          posArray[i3 + 1] += (dy / dist) * force * MOUSE_REPULSION_STRENGTH;
        }
      }
      posAttr.needsUpdate = true;

      // --- Update connections (sample subset for performance) ---
      const linePosAttr = lineGeometry.getAttribute('position') as THREE.BufferAttribute;
      const linePosArray = linePosAttr.array as Float32Array;
      const lineColAttr = lineGeometry.getAttribute('color') as THREE.BufferAttribute;
      const lineColArray = lineColAttr.array as Float32Array;
      let lineIdx = 0;
      const maxLinePairs = 400;

      // Only check a subset of particles for connections
      const step = Math.max(1, Math.floor(PARTICLE_COUNT / 120));
      for (let i = 0; i < PARTICLE_COUNT && lineIdx < maxLinePairs; i += step) {
        for (let j = i + step; j < PARTICLE_COUNT && lineIdx < maxLinePairs; j += step) {
          const i3 = i * 3;
          const j3 = j * 3;
          const dx = posArray[i3] - posArray[j3];
          const dy = posArray[i3 + 1] - posArray[j3 + 1];
          const dz = posArray[i3 + 2] - posArray[j3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
            const dist = Math.sqrt(distSq);
            const alpha = 1 - dist / CONNECTION_DISTANCE;
            const idx = lineIdx * 6;

            linePosArray[idx] = posArray[i3];
            linePosArray[idx + 1] = posArray[i3 + 1];
            linePosArray[idx + 2] = posArray[i3 + 2];
            linePosArray[idx + 3] = posArray[j3];
            linePosArray[idx + 4] = posArray[j3 + 1];
            linePosArray[idx + 5] = posArray[j3 + 2];

            // Connection color with distance-based alpha
            const cAlpha = alpha * 0.5;
            lineColArray[idx] = ACCENT_GLOW.r * cAlpha;
            lineColArray[idx + 1] = ACCENT_GLOW.g * cAlpha;
            lineColArray[idx + 2] = ACCENT_GLOW.b * cAlpha;
            lineColArray[idx + 3] = ACCENT_GLOW.r * cAlpha;
            lineColArray[idx + 4] = ACCENT_GLOW.g * cAlpha;
            lineColArray[idx + 5] = ACCENT_GLOW.b * cAlpha;

            lineIdx++;
          }
        }
      }
      lineGeometry.setDrawRange(0, lineIdx * 2);
      linePosAttr.needsUpdate = true;
      lineColAttr.needsUpdate = true;

      // --- Animate floating shapes ---
      for (const shape of shapes) {
        const t = elapsed * shape.orbitSpeed + shape.phase;

        shape.mesh.position.x = shape.basePosition.x + Math.cos(t) * 0.8;
        shape.mesh.position.y =
          shape.basePosition.y + Math.sin(elapsed * shape.floatSpeed + shape.phase) * shape.floatAmplitude;
        shape.mesh.position.z = shape.basePosition.z + Math.sin(t) * 0.5;

        shape.mesh.rotation.x += shape.rotationSpeed.x;
        shape.mesh.rotation.y += shape.rotationSpeed.y;
        shape.mesh.rotation.z += shape.rotationSpeed.z;

        // Mouse parallax for shapes
        shape.mesh.position.x += mouseRef.current.x * 0.3;
        shape.mesh.position.y += mouseRef.current.y * 0.2;
      }

      // --- Subtle camera sway ---
      camera.position.x = mouseRef.current.x * 0.3;
      camera.position.y = mouseRef.current.y * 0.2;
      camera.lookAt(0, 0, 0);

      // --- Apply fade-in ---
      particleMaterial.opacity = 0.8 * fadeAlpha;
      lineMaterial.opacity = 0.3 * fadeAlpha;
      for (const shape of shapes) {
        (shape.mesh.material as THREE.MeshPhysicalMaterial).opacity = 0.4 * fadeAlpha;
      }

      // --- Animate lights ---
      pointLight1.position.x = -5 + Math.sin(elapsed * 0.3) * 2;
      pointLight1.position.y = 3 + Math.cos(elapsed * 0.2) * 1.5;
      pointLight2.position.x = 5 + Math.cos(elapsed * 0.4) * 2;
      pointLight2.position.y = -2 + Math.sin(elapsed * 0.3) * 1;

      renderer.render(scene, camera);
    };

    // --- Start ---
    clockRef.current.start();
    animate();

    // --- Events ---
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameIdRef.current);

      // Cleanup Three.js resources
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.LineSegments) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((m) => m.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [handleMouseMove, handleResize]);

  // Reset fade-in when isReady changes
  useEffect(() => {
    if (isReady) {
      fadeInRef.current = 0;
    }
  }, [isReady]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
};
