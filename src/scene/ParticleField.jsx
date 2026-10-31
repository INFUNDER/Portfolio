import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { buildShapes } from './shapes';
import { sceneState } from './sceneState';

const MORPH_SECONDS = 1.9;
const ARC = 0.9;

const vertexShader = /* glsl */ `
  attribute vec3 aFrom;
  attribute vec3 aTo;
  attribute vec3 aColFrom;
  attribute vec3 aColTo;
  attribute float aRand;
  uniform float uMix;
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  varying vec3 vColor;
  varying float vFade;

  void main() {
    float m = smoothstep(0.0, 1.0, clamp(uMix * 1.4 - aRand * 0.4, 0.0, 1.0));
    vec3 p = mix(aFrom, aTo, m);
    p += normalize(p + 0.0001) * sin(m * 3.14159) * ${ARC.toFixed(2)} * (0.3 + aRand);
    float t = uTime * 0.5 + aRand * 60.0;
    p += vec3(sin(t), cos(t * 0.9), sin(t * 1.1)) * 0.035;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.5 + aRand) * uPixelRatio / -mv.z;
    vColor = mix(aColFrom, aColTo, m);
    vFade = smoothstep(26.0, 9.0, -mv.z) * (0.75 + 0.25 * sin(t * 2.0));
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vFade;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.05, d);
    gl_FragColor = vec4(vColor, a * vFade * uOpacity);
  }
`;

const smooth = (t) => t * t * (3 - 2 * t);

export default function ParticleField({ count }) {
  const group = useRef();
  const viewport = useThree((s) => s.viewport);
  const size = useThree((s) => s.size);

  const { shapes, geometry, material, rand } = useMemo(() => {
    const shapes = buildShapes(count);
    const rand = new Float32Array(count);
    for (let i = 0; i < count; i++) rand[i] = Math.random();
    const geometry = new THREE.BufferGeometry();
    const attr = (arr) => new THREE.BufferAttribute(arr, 3).setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute('position', new THREE.BufferAttribute(shapes.helix.pos.slice(), 3));
    geometry.setAttribute('aFrom', attr(shapes.scatter.pos.slice()));
    geometry.setAttribute('aTo', attr(shapes.helix.pos.slice()));
    geometry.setAttribute('aColFrom', attr(shapes.scatter.col.slice()));
    geometry.setAttribute('aColTo', attr(shapes.helix.col.slice()));
    geometry.setAttribute('aRand', new THREE.BufferAttribute(rand, 1));
    geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 20);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uMix: { value: 0 },
        uTime: { value: 0 },
        uSize: { value: 42 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uOpacity: { value: 0 },
      },
    });
    return { shapes, geometry, material, rand };
  }, [count]);

  const morph = useRef({ target: 'helix', mix: 0 });
  const motion = useRef({ x: 0, rotY: 0, rotX: 0, opacity: 0 });

  // Freeze wherever the particles currently are, then head for the next shape.
  const retarget = (next) => {
    const { mix } = morph.current;
    const from = geometry.attributes.aFrom.array;
    const to = geometry.attributes.aTo.array;
    const cFrom = geometry.attributes.aColFrom.array;
    const cTo = geometry.attributes.aColTo.array;
    for (let i = 0; i < count; i++) {
      const m = smooth(Math.min(1, Math.max(0, mix * 1.4 - rand[i] * 0.4)));
      const i3 = i * 3;
      const px = from[i3] + (to[i3] - from[i3]) * m;
      const py = from[i3 + 1] + (to[i3 + 1] - from[i3 + 1]) * m;
      const pz = from[i3 + 2] + (to[i3 + 2] - from[i3 + 2]) * m;
      const l = Math.hypot(px, py, pz) || 1;
      const arc = (Math.sin(m * Math.PI) * ARC * (0.3 + rand[i])) / l;
      from[i3] = px + px * arc;
      from[i3 + 1] = py + py * arc;
      from[i3 + 2] = pz + pz * arc;
      for (let k = 0; k < 3; k++) cFrom[i3 + k] = cFrom[i3 + k] + (cTo[i3 + k] - cFrom[i3 + k]) * m;
    }
    to.set(shapes[next].pos);
    cTo.set(shapes[next].col);
    for (const name of ['aFrom', 'aTo', 'aColFrom', 'aColTo']) geometry.attributes[name].needsUpdate = true;
    morph.current = { target: next, mix: 0 };
  };

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 20);
    const reduced = sceneState.reducedMotion;
    if (sceneState.shape !== morph.current.target && shapes[sceneState.shape]) retarget(sceneState.shape);
    if (sceneState.ready) {
      morph.current.mix = reduced ? 1 : Math.min(1, morph.current.mix + dt / MORPH_SECONDS);
    }

    const u = material.uniforms;
    u.uMix.value = morph.current.mix;
    if (!reduced) u.uTime.value += dt;

    const narrow = size.width < 900;
    const m = motion.current;
    const ease = 1 - Math.exp(-dt * 2.4);
    const targetX = narrow ? 0 : sceneState.x * viewport.width;
    const targetOpacity = (narrow ? sceneState.mobileOpacity : sceneState.opacity) * (sceneState.ready ? 1 : 0.4);
    m.x += (targetX - m.x) * ease;
    m.opacity += (targetOpacity - m.opacity) * ease;
    const t = state.clock.elapsedTime;
    const drift = reduced ? 0 : Math.sin(t * 0.18) * 0.32;
    m.rotY += (drift + sceneState.pointer.x * 0.35 - m.rotY) * ease;
    m.rotX += (sceneState.pointer.y * 0.18 - m.rotX) * ease;

    u.uOpacity.value = m.opacity;
    const g = group.current;
    g.position.x = m.x;
    g.rotation.y = m.rotY;
    g.rotation.x = m.rotX;
    const scale = narrow ? Math.min(1, size.width / 640) * 0.85 : 1;
    g.scale.setScalar(scale);
  });

  return (
    <group ref={group}>
      <points geometry={geometry} material={material} frustumCulled={false} />
    </group>
  );
}
