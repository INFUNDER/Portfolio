import { useEffect, useState } from 'react';
import { nav, profile } from '../data/content';
import { lockScroll, scrollToTarget } from '../lib/smoothScroll';

export default function Nav({ active, hidden }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    // Wait a frame so the menu's scroll lock is released first.
    requestAnimationFrame(() => scrollToTarget(id ? `#${id}` : 0));
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          hidden && !open ? '-translate-y-full' : ''
        }`}
      >
        <div className="shell flex h-16 items-center justify-between md:h-20">
          <a href="#top" onClick={(e) => go(e, null)} className="group flex items-center gap-2.5 text-sm">
            <span className="h-2 w-2 rounded-full bg-eosin transition-transform duration-300 group-hover:scale-150" />
            <span className="font-medium tracking-tight">{profile.name}</span>
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1 rounded-full border border-line/10 bg-ink/50 p-1 backdrop-blur-md">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => go(e, item.id)}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={`block rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                      active === item.id ? 'bg-paper text-ink' : 'text-paper/70 hover:text-paper'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={`mailto:${profile.email}`}
            className="hidden text-sm text-paper/80 transition-colors hover:text-paper md:inline-flex md:items-center md:gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="link-underline">Open to PhD positions</span>
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="-mr-3 flex h-11 items-center gap-2 px-3 text-sm md:hidden"
          >
            {open ? 'Close' : 'Menu'}
            <span className="relative block h-3 w-4" aria-hidden="true">
              <span className={`absolute left-0 h-px w-full bg-current transition-all duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0.5'}`} />
              <span className={`absolute left-0 h-px w-full bg-current transition-all duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-2.5'}`} />
            </span>
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-ink/95 px-[var(--gutter)] pb-10 pt-24 backdrop-blur-xl transition-opacity duration-500 md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        inert={open ? undefined : ''}
      >
        <nav aria-label="Mobile">
          <ul className="space-y-1">
            {nav.map((item, i) => (
              <li key={item.id} className="border-b border-line/10">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => go(e, item.id)}
                  className="flex items-baseline justify-between py-4 font-serif text-5xl"
                >
                  {item.label}
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-paper/70">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </>
  );
}
