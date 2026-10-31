import { useId, useState } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import SplitText from '../components/SplitText';
import { projects } from '../data/content';
import { ScrollTrigger } from '../lib/smoothScroll';
import { Figure, SectionHead } from './Research';

function MethodNotes({ points }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="border-b border-line/10">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          setOpen((v) => !v);
          // Let the panel finish opening before trigger positions are recalculated.
          setTimeout(() => ScrollTrigger.refresh(), 650);
        }}
        className="flex min-h-[44px] w-full items-center justify-between py-4 text-left text-sm text-paper/80 transition-colors hover:text-paper"
      >
        Method notes
        <Plus
          aria-hidden="true"
          className={`h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? 'rotate-45' : ''}`}
        />
      </button>
      <div
        id={id}
        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <ul className="min-h-0 space-y-3 overflow-hidden text-[0.95rem] leading-relaxed text-paper/70" inert={open ? undefined : ''}>
          {points.map((p) => (
            <li key={p} className="flex gap-3 last:pb-5">
              <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-eosin" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Project({ project, index, total }) {
  return (
    <article
      data-scene={project.scene}
      data-x="0.27"
      aria-labelledby={`${project.id}-title`}
      className="relative grid gap-y-10 py-20 md:min-h-[100svh] md:grid-cols-12 md:items-center md:py-28"
    >
      <div className="md:col-span-6">
        <p className="eyebrow mb-6 flex flex-wrap items-center gap-3" data-reveal>
          <span className="tabular-nums text-paper">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <span className="h-px w-8 bg-line/20" aria-hidden="true" />
          {project.short}
        </p>

        <h3
          id={`${project.id}-title`}
          data-split-group
          className="font-serif text-[clamp(2.4rem,4.8vw,4.5rem)] font-normal leading-[0.95] tracking-[-0.015em]"
        >
          <SplitText text={project.title} />
        </h3>

        {project.status && (
          <p data-reveal className="mt-6 inline-flex items-center gap-2 rounded-full border border-eosin/40 px-3 py-1.5 text-xs text-eosin">
            <span className="h-1.5 w-1.5 rounded-full bg-eosin" aria-hidden="true" />
            {project.status}
          </p>
        )}

        <p data-reveal className="mt-6 text-lg leading-relaxed text-paper/80">
          {project.lede}
        </p>

        <dl data-reveal className="mt-10 grid grid-cols-1 border-t border-line/10 sm:grid-cols-3">
          {project.metrics.map((m, i) => (
            <div
              key={m.label}
              className={`flex flex-col-reverse gap-2 border-b border-line/10 py-5 sm:border-b-0 ${
                i > 0 ? 'sm:border-l sm:border-line/10 sm:pl-5' : ''
              } sm:pr-4`}
            >
              <dt className="text-xs leading-snug text-muted">{m.label}</dt>
              <dd className="font-serif text-4xl leading-none tabular-nums">{m.value}</dd>
            </div>
          ))}
        </dl>

        <div data-reveal className="mt-2 border-t border-line/10 sm:mt-0">
          <MethodNotes points={project.points} />
        </div>

        <div data-reveal className="mt-6 flex flex-wrap items-center gap-2">
          {project.stack.map((s) => (
            <span key={s} className="rounded-full border border-line/15 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-paper/70">
              {s}
            </span>
          ))}
          {project.code && (
            <a
              href={project.code}
              target="_blank"
              rel="noreferrer"
              className="group ml-auto inline-flex min-h-[44px] items-center gap-1.5 text-sm text-paper transition-colors hover:text-eosin"
            >
              <span className="link-underline">View code</span>
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          )}
        </div>
      </div>

      <Figure n={index + 2} className="md:col-span-3 md:col-start-10 md:self-end md:justify-self-end">
        {project.figure}
      </Figure>
    </article>
  );
}

export default function Work() {
  return (
    <section id="work" className="relative pt-28 md:pt-40" data-scene="tissue" data-x="0.27">
      <div className="shell">
        <SectionHead
          index="02"
          label="Selected work"
          title={
            <>
              <SplitText text="Models you can" className="block" />
              <SplitText text="read, not just score." className="block italic text-paper/90" />
            </>
          }
          className="max-w-4xl"
        />
        <div className="mt-10 divide-y divide-line/10 md:mt-6">
          {projects.map((p, i) => (
            <Project key={p.id} project={p} index={i} total={projects.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
