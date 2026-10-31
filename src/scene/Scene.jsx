import { Component, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import ParticleField from './ParticleField';
import { sceneState } from './sceneState';

class WebGLBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function Scene() {
  useEffect(() => {
    const onMove = (e) => {
      sceneState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      sceneState.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 7000 : 15000;

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <WebGLBoundary>
        <Canvas
          camera={{ position: [0, 0, 13], fov: 40 }}
          dpr={[1, 1.75]}
          gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        >
          <ParticleField count={count} />
        </Canvas>
      </WebGLBoundary>
      {/* Edge vignette keeps text legible over the brightest particles. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgb(var(--ink))_100%)]" />
    </div>
  );
}
