import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Text } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';

// SpaceBoi model + interactive name
function SpaceBoi({ mouse }) {
  const { scene } = useGLTF('/space_boi.glb');
  const modelRef = useRef();

  const { opacity, position } = useSpring({
    from: { opacity: 0, position: [2.5, 0.5, 0] }, // In front and to the right
    to: { opacity: 1, position: [2.5, 0.5, 0] },
    config: { duration: 2000 },
  });

  const handleClick = () => {
    const about = document.getElementById('about');
    if (about) about.scrollIntoView({ behavior: 'smooth' });
  };

  useFrame((state, delta) => {
    if (!modelRef.current) return;

    // Idle + cursor tilt
    const targetX = (mouse.current.y / window.innerHeight - 0.5) * Math.PI / 12;
    const targetY = (mouse.current.x / window.innerWidth - 0.5) * Math.PI / 12;

    modelRef.current.rotation.y += delta * 0.3;
    modelRef.current.rotation.x += (targetX - modelRef.current.rotation.x) * 0.05;
    modelRef.current.rotation.y += (targetY - modelRef.current.rotation.y) * 0.05;
  });

  return (
    <>
      {/* Visible clickable name */}
      <a.group position={position}>
        <Text
          fontSize={1.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          onClick={handleClick}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'default')}
        >
          Ronit Mittal
        </Text>
        <a.meshStandardMaterial transparent opacity={opacity} />
      </a.group>

      {/* 3D Model */}
      <primitive
        ref={modelRef}
        object={scene}
        scale={[1.5, 1.5, 1.5]}
        position={[0, -5, -5]}
      />
    </>
  );
}

export default function HeroSection() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section style={{ height: '100vh', margin: 0, padding: 0 }}>
      <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
        <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
          <ambientLight intensity={1} />
          <spotLight position={[5, 10, 10]} angle={0.4} intensity={2} />
          <pointLight position={[-10, -10, -10]} intensity={1} />
          <SpaceBoi mouse={mouse} />
        </Canvas>
      </div>
    </section>
  );
}