import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { sceneState, setScene } from './scene/sceneState';
import Nav from './components/Nav';
import Preloader from './components/Preloader';
import Hero from './sections/Hero';
import Research from './sections/Research';
import Work from './sections/Work';
import Publications from './sections/Publications';
import Path from './sections/Path';
import Contact from './sections/Contact';
import { nav } from './data/content';
import { gsap, lockScroll, ScrollTrigger, startSmoothScroll } from './lib/smoothScroll';

// three.js is most of the bundle; load it alongside the preloader instead of blocking first paint.
const Scene = lazy(() => import('./scene/Scene'));

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Several triggers can be active at once (a project inside the work section);
// the last active one in document order is the most specific.
function lastActive(triggers) {
  for (let i = triggers.length - 1; i >= 0; i--) if (triggers[i].isActive) return triggers[i];
  return null;
}

export default function App() {
  const [reduced] = useState(prefersReduced);
  const [loaded, setLoaded] = useState(reduced);
  const [active, setActive] = useState(null);
  const [navHidden, setNavHidden] = useState(false);
  const main = useRef();
  const progress = useRef();

  const onLoaded = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    sceneState.reducedMotion = reduced;
    if (reduced) return;
    const stop = startSmoothScroll();
    return stop;
  }, [reduced]);

  // Hide the hero before first paint so the intro can play it in.
  useLayoutEffect(() => {
    if (reduced) return;
    gsap.set('[data-hero-split] [data-split]', { yPercent: 110 });
    gsap.set('[data-hero]', { autoAlpha: 0, y: 24 });
  }, [reduced]);

  useEffect(() => {
    if (!loaded) {
      lockScroll(true);
      return;
    }
    lockScroll(false);
    sceneState.ready = true;
    if (reduced) return;
    const tl = gsap.timeline({ delay: 0.05 });
    tl.to('[data-hero-split] [data-split]', { yPercent: 0, duration: 1.4, ease: 'expo.out', stagger: 0.12 }).to(
      '[data-hero]',
      { autoAlpha: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08 },
      0.35,
    );
    return () => tl.kill();
  }, [loaded, reduced]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Background scene follows whichever section is in the middle of the viewport.
      const sceneTriggers = gsap.utils.toArray('[data-scene]').map((el) =>
        ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: () => {
            const t = lastActive(sceneTriggers);
            if (!t) return;
            const d = t.trigger.dataset;
            setScene({
              shape: d.scene,
              x: parseFloat(d.x ?? 0),
              opacity: parseFloat(d.opacity ?? 1),
              mobileOpacity: parseFloat(d.mobileOpacity ?? 0.3),
            });
          },
        }),
      );

      const navTriggers = nav.map(({ id }) =>
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: () => setActive(lastActive(navTriggers)?.trigger.id ?? null),
        }),
      );

      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          if (progress.current) progress.current.style.transform = `scaleX(${self.progress})`;
          setNavHidden(self.direction === 1 && self.scroll() > 320);
        },
      });

      if (reduced) return;

      gsap.utils.toArray('[data-split-group]').forEach((el) => {
        gsap.from(el.querySelectorAll('[data-split]'), {
          yPercent: 110,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });

      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 36,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        });
      });

      gsap.utils.toArray('[data-count]').forEach((el) => {
        const end = parseFloat(el.dataset.count);
        const decimals = parseInt(el.dataset.decimals, 10) || 0;
        const counter = { v: 0 };
        gsap.to(counter, {
          v: end,
          duration: 1.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
          onUpdate: () => {
            el.textContent = counter.v.toFixed(decimals);
          },
        });
      });
    }, main);

    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, [reduced]);

  return (
    <>
      {!loaded && <Preloader onDone={onLoaded} />}
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <div className="grain" aria-hidden="true" />
      <div className="fixed inset-x-0 top-0 z-[55] h-px origin-left bg-eosin" ref={progress} style={{ transform: 'scaleX(0)' }} aria-hidden="true" />
      <Nav active={active} hidden={navHidden} />
      <main id="main" ref={main} className="relative z-10">
        <Hero />
        <Research />
        <Work />
        <Publications />
        <Path />
        <Contact />
      </main>
    </>
  );
}
