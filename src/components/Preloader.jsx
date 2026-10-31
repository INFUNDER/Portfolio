import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../lib/smoothScroll';

export default function Preloader({ onDone }) {
  const root = useRef();
  const count = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      gsap
        .timeline({ onComplete: onDone })
        .from('[data-pre-line]', { yPercent: 110, duration: 0.9, ease: 'expo.out', stagger: 0.08 })
        .to(
          counter,
          {
            v: 100,
            duration: 1.3,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, '0');
            },
          },
          0.1,
        )
        .to('[data-pre-bar]', { scaleX: 1, duration: 1.3, ease: 'power2.inOut' }, 0.1)
        .to('[data-pre-line]', { yPercent: -110, duration: 0.6, ease: 'expo.in', stagger: 0.04 }, '+=0.1')
        .to(root.current, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, '-=0.25');
    }, root);
    return () => ctx.revert();
  }, [onDone]);

  return (
    <div ref={root} className="fixed inset-0 z-[70] flex flex-col justify-between bg-ink p-[var(--gutter)]" aria-hidden="true">
      <div className="eyebrow overflow-hidden">
        <span data-pre-line className="inline-block">Research portfolio · 2026</span>
      </div>
      <div className="flex items-end justify-between gap-6">
        <div className="overflow-hidden font-serif text-[clamp(2.5rem,7vw,5.5rem)] leading-none">
          <span data-pre-line className="inline-block">
            Ronit <em>Mittal</em>
          </span>
        </div>
        <div className="overflow-hidden font-mono text-sm text-muted">
          <span data-pre-line ref={count} className="inline-block tabular-nums">
            000
          </span>
        </div>
      </div>
      <div data-pre-bar className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-eosin" />
    </div>
  );
}
