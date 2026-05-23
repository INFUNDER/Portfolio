import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import { Experience } from './component/Experience';
import Overlay from './component/Overlay';
import ProjectModal from './component/ProjectModal';

function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [pages, setPages] = useState(6);

  useEffect(() => {
    const updatePages = () => {
      if (window.innerWidth < 640) {
        setPages(8); // Mobile requires ~8 pages for vertically stacked items
      } else if (window.innerWidth < 1024) {
        setPages(6.5);  // Tablet
      } else {
        setPages(5.5);  // Desktop
      }
    };
    
    updatePages();
    window.addEventListener('resize', updatePages);
    return () => window.removeEventListener('resize', updatePages);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#030303' }}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#030303']} />
        <fog attach="fog" args={['#030303', 10, 30]} />
        <ScrollControls pages={pages} damping={0.1}>
          <Experience />
          <Overlay onProjectClick={setActiveProject} />
        </ScrollControls>
      </Canvas>
      <ProjectModal activeProject={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}

export default App;
