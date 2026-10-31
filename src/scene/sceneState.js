// Shared mutable state read every frame by the particle field. DOM code writes
// to it directly so scrolling never triggers React re-renders.
export const sceneState = {
  shape: 'helix',
  x: 0.24,
  opacity: 1,
  mobileOpacity: 0.3,
  pointer: { x: 0, y: 0 },
  reducedMotion: false,
  ready: false,
};

export function setScene({ shape, x = 0, opacity = 1, mobileOpacity = 0.3 }) {
  sceneState.shape = shape;
  sceneState.x = x;
  sceneState.opacity = opacity;
  sceneState.mobileOpacity = mobileOpacity;
}
