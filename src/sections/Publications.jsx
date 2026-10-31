import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import SplitText from '../components/SplitText';
import { publications } from '../data/content';
import { ScrollTrigger } from '../lib/smoothScroll';
import { SectionHead } from './Research';

const filters = [
  { id: 'all', label: 'All', test: () => true },
  { id: 'first', label: 'First author', test: (p) => p.tags.includes('First author') },
  { id: 'journal', label: 'Journal', test: (p) => p.tags.includes('Journal') },
  { id: 'conference', label: 'Conference', test: (p) => p.tags.includes('Conference') },
];

function Authors({ text }) {
  const parts = text.split('R. Mittal');
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <strong className="font-medium text-paper">R. Mittal</strong>}
        </span>
      ))}
    </>
  );
}

function PubRow({ pub }) {
  const href = pub.doi ? `https://doi.org/${pub.doi}` : null;
  const Tag = href ? 'a' : 'div';
  return (
    <li className="border-b border-line/10">
      <Tag
        {...(href ? { href, target: '_blank', rel: 'noreferrer' } : {})}
        className="group grid gap-x-8 gap-y-3 py-8 transition-colors duration-300 md:grid-cols-12 md:py-10"
      >
        <span className="font-mono text-xs text-muted md:col-span-1 md:pt-2">{pub.year}</span>
        <div className="md:col-span-8">
          <h3 className={`font-serif text-2xl leading-tight md:text-[2rem] ${href ? 'transition-colors duration-300 group-hover:text-eosin' : ''}`}>
            {pub.title}
          </h3>
          <p className="mt-3 text-sm text-paper/60">
            <Authors text={pub.authors} />
          </p>
          <p className="mt-1 text-sm italic text-muted">
            {pub.venue}
            {pub.note && <span className="not-italic"> · {pub.note}</span>}
          </p>
        </div>
        <div className="flex flex-wrap items-start gap-2 md:col-span-3 md:flex-col md:items-end md:pt-2">
          <div className="flex flex-wrap gap-2 md:justify-end">
            {pub.tags.map((t) => (
              <span
                key={t}
                className={`rounded-full px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-wider ${
                  t === 'First author' || t === 'Under review'
                    ? 'bg-eosin/15 text-eosin'
                    : 'border border-line/15 text-paper/60'
                }`}
              >
                {t}
              </span>
            ))}
          </div>
          {href && (
            <span className="mt-1 inline-flex items-center gap-1 text-sm text-paper/70 transition-colors group-hover:text-paper">
              DOI
              <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              <span className="sr-only">(opens in a new tab)</span>
            </span>
          )}
        </div>
      </Tag>
    </li>
  );
}

export default function Publications() {
  const [filter, setFilter] = useState('all');
  const list = useMemo(() => publications.filter(filters.find((f) => f.id === filter).test), [filter]);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [filter]);

  return (
    <section id="publications" data-scene="network" data-x="0.38" data-opacity="0.32" className="relative py-28 md:py-40">
      <div className="shell">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <SectionHead
            index="03"
            label="Publications"
            title={
              <>
                <SplitText text="Papers &" className="block" />
                <SplitText text="manuscripts" className="block italic text-paper/90" />
              </>
            }
          />
          <div role="group" aria-label="Filter publications" className="flex flex-wrap gap-2" data-reveal>
            {filters.map((f) => {
              const n = publications.filter(f.test).length;
              const on = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(f.id)}
                  className={`min-h-[40px] rounded-full border px-4 text-sm transition-colors duration-300 ${
                    on ? 'border-paper bg-paper text-ink' : 'border-line/15 text-paper/70 hover:border-line/40 hover:text-paper'
                  }`}
                >
                  {f.label} <span className={`font-mono text-xs ${on ? 'text-ink/60' : 'text-muted'}`}>{n}</span>
                </button>
              );
            })}
          </div>
        </div>

        <ul className="mt-14 border-t border-line/10" aria-live="polite">
          {list.map((p) => (
            <PubRow key={p.title} pub={p} />
          ))}
        </ul>
      </div>
    </section>
  );
}
