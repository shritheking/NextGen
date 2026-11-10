import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const OrbitalCenterpiece: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      console.warn('WebGL initialization failed, falling back to static visual:', e);
      setIsSupported(false);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 24;

    const group = new THREE.Group();
    scene.add(group);

    // 1. Core Geometric Structure (Wireframe Icosahedron with subtle violet emissive)
    const coreGeo = new THREE.IcosahedronGeometry(4.8, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x8B5CF6,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // 2. Dual Orbital Rings
    const ringGeo1 = new THREE.RingGeometry(8.2, 8.28, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x3B82F6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    group.add(ring1);

    const ringGeo2 = new THREE.RingGeometry(9.6, 9.68, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x60A5FA,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.22
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 5;
    group.add(ring2);

    // 3. Neural Node Cluster (Fibonacci Golden Spiral Sphere)
    const nodeCount = 68;
    const sphereRadius = 7.6;
    const positions = new Float32Array(nodeCount * 3);
    const nodeCoords: THREE.Vector3[] = [];
    const phi = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = 2 * Math.PI * i / phi;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const vec = new THREE.Vector3(x * sphereRadius, y * sphereRadius, z * sphereRadius);
      positions[i * 3] = vec.x;
      positions[i * 3 + 1] = vec.y;
      positions[i * 3 + 2] = vec.z;
      nodeCoords.push(vec);
    }

    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Custom Canvas Texture for glowing point nodes
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(59, 130, 246, 0.9)');
      grad.addColorStop(0.7, 'rgba(139, 92, 246, 0.4)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
    }
    const pointTexture = new THREE.CanvasTexture(canvas);

    const nodeMat = new THREE.PointsMaterial({
      size: 1.1,
      map: pointTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const pointsMesh = new THREE.Points(nodeGeo, nodeMat);
    group.add(pointsMesh);

    // 4. Interconnecting Lines between Close Nodes
    const linePositions: number[] = [];
    const maxDist = 3.6;
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const d = nodeCoords[i].distanceTo(nodeCoords[j]);
        if (d < maxDist) {
          linePositions.push(nodeCoords[i].x, nodeCoords[i].y, nodeCoords[i].z);
          linePositions.push(nodeCoords[j].x, nodeCoords[j].y, nodeCoords[j].z);
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x3B82F6,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending
    });
    const linesMesh = new THREE.LineSegments(lineGeo, lineMat);
    group.add(linesMesh);

    // Dynamic Sizing & Responsiveness
    const updateSize = () => {
      if (!containerRef.current || !renderer) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight || 380;
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Mouse Tracking with Smooth Lerp Damping
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener('mousemove', onPointerMove);

    // Visibility-Based Render Control (IntersectionObserver)
    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(containerRef.current);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      targetX += (mouseX * 0.45 - targetX) * 0.05;
      targetY += (mouseY * 0.35 - targetY) * 0.05;

      group.rotation.y += 0.0035;
      group.rotation.x = targetY;
      group.rotation.z = targetX * 0.5;

      coreMesh.rotation.y -= 0.005;
      coreMesh.rotation.x += 0.003;

      ring1.rotation.z += 0.004;
      ring2.rotation.z -= 0.003;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('mousemove', onPointerMove);
      observer.disconnect();
      cancelAnimationFrame(animId);
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      pointTexture.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full h-full min-h-[340px] flex items-center justify-center ${className}`}>
      {isSupported ? (
        <canvas ref={canvasRef} className="w-full h-full pointer-events-none" />
      ) : (
        <div className="w-48 h-48 rounded-full border border-accent-electric/30 bg-accent-electric/5 flex items-center justify-center animate-pulse">
          <div className="w-32 h-32 rounded-full border border-accent-violet/40 bg-accent-violet/10 flex items-center justify-center">
            <span className="font-mono text-xs text-accent-electric font-medium">Neural Core</span>
          </div>
        </div>
      )}
    </div>
  );
};
