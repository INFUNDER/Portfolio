import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function NeuralCore() {
  const pointsRef = useRef();
  const linesRef = useRef();
  
  const particleCount = 1000;
  const maxDistance = 1.5;

  const { positions, colors, particles } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const particlesData = [];
    const colorPalette = ['#ffffff', '#aaaaaa', '#ff2a2a', '#222222'];
    
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 3 + Math.random() * 2;
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const color = new THREE.Color(colorPalette[Math.floor(Math.random() * colorPalette.length)]);
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
      
      particlesData.push({
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ),
        originalPos: new THREE.Vector3(pos[i*3], pos[i*3+1], pos[i*3+2])
      });
    }
    return { positions: pos, colors: col, particles: particlesData };
  }, []);

  // Line geometry for connections
  const maxLines = (particleCount * (particleCount - 1)) / 2;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);

  useFrame((state, delta) => {
    if (!pointsRef.current || !linesRef.current) return;
    
    // Rotate entire core slowly
    pointsRef.current.rotation.y += delta * 0.05;
    pointsRef.current.rotation.x += delta * 0.02;
    linesRef.current.rotation.y += delta * 0.05;
    linesRef.current.rotation.x += delta * 0.02;

    const posArray = pointsRef.current.geometry.attributes.position.array;
    let vertexpos = 0;
    let numConnected = 0;

    // We only update a subset of particles for performance or just drift them
    for (let i = 0; i < particleCount; i++) {
      posArray[i * 3] += particles[i].velocity.x;
      posArray[i * 3 + 1] += particles[i].velocity.y;
      posArray[i * 3 + 2] += particles[i].velocity.z;

      // Keep them roughly in their original sphere boundary
      const dx = posArray[i*3] - particles[i].originalPos.x;
      const dy = posArray[i*3+1] - particles[i].originalPos.y;
      const dz = posArray[i*3+2] - particles[i].originalPos.z;
      if (dx*dx + dy*dy + dz*dz > 1) {
        particles[i].velocity.multiplyScalar(-1);
      }
    }
    
    // Calculate lines between close particles
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        // Simple distance check (optimization: limit inner loop or use spatial grid if needed)
        // To save frames, we only check a subset or accept lower framerate on high particle counts.
        // 1000 is usually fine for O(N^2) on modern machines, but we can limit connections.
        if (numConnected >= 3000) break; // Limit total drawn lines

        const dx = posArray[i * 3] - posArray[j * 3];
        const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
        const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxDistance * maxDistance) {
          linePositions[vertexpos++] = posArray[i * 3];
          linePositions[vertexpos++] = posArray[i * 3 + 1];
          linePositions[vertexpos++] = posArray[i * 3 + 2];
          linePositions[vertexpos++] = posArray[j * 3];
          linePositions[vertexpos++] = posArray[j * 3 + 1];
          linePositions[vertexpos++] = posArray[j * 3 + 2];
          numConnected++;
        }
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.setDrawRange(0, numConnected * 2);
    linesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group scale={1.5}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.04} 
          vertexColors={true}
          transparent 
          opacity={0.8} 
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={maxLines * 2}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
}
