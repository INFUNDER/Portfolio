import React, { useRef } from 'react';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { NeuralCore } from './NeuralCore';
import * as THREE from 'three';

export function Experience() {
  const scroll = useScroll();
  const groupRef = useRef();
  
  // Create a subtle starfield background
  const starsRef = useRef();

  useFrame((state, delta) => {
    const offset = scroll.offset; // 0 to 1

    // Neural Core Transformation based on scroll
    // Page 1 (offset 0): Center
    // Page 2 (offset 0.33): Move left
    // Page 3 (offset 0.66): Move right
    // Page 4 (offset 1): Move center, scale down
    
    // Smooth dampening for position
    const targetX = offset < 0.2 ? 0 : offset < 0.5 ? -3 : offset < 0.8 ? 3 : 0;
    const targetZ = offset < 0.2 ? 0 : offset < 0.5 ? -2 : offset < 0.8 ? -2 : -5;
    
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.05);
    
    // Rotate faster as you scroll deeper
    groupRef.current.rotation.y = offset * Math.PI * 2;

    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.01;
    }
  });

  return (
    <>
      <group ref={groupRef}>
        <NeuralCore />
      </group>
      
      {/* Subtle Starfield / Dust */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={500}
            array={new Float32Array(1500).map(() => (Math.random() - 0.5) * 50)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#475569" transparent opacity={0.5} />
      </points>
    </>
  );
}
