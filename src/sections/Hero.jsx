import SplitText from '../components/SplitText';
import { profile, stats } from '../data/content';
import { scrollToTarget } from '../lib/smoothScroll';

const dots = ['bg-hema', 'bg-eosin', 'bg-paper'];

export default function Hero() {
  return (
    <>
      <section
        id="top"
        data-scene="helix"
        data-x="0.24"
        data-mobile-opacity="0.75"
        className="relative flex min-h-[100svh] flex-col justify-between gap-14 pb-8 pt-28 md:gap-16 md:pb-10 md:pt-32"
      >
        <div className="shell">
          <ul className="flex flex-wrap gap-x-6 gap-y-2" data-hero>
            {profile.fields.map((f, i) => (
              <li key={f} className="eyebrow flex items-center gap-2 text-paper/70">
                <span className={`h-1.5 w-1.5 rounded-full ${dots[i]}`} aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="shell">
          <h1
            data-hero-split
            className="font-serif text-[clamp(5.5rem,17vw,16rem)] font-normal leading-[0.8] tracking-[-0.025em]"
          >
            <SplitText text="Ronit" className="block" />
            <SplitText text="Mittal" className="block pl-[0.6em] italic md:pl-[1.1em]" />
          </h1>

          <div className="mt-10 border-t border-line/10 pt-6 md:mt-14">
            <div className="grid gap-8 md:max-w-[46%]">
              <p data-hero className="text-xl leading-snug text-paper/85 md:text-2xl">
                {profile.statement}
              </p>
              <dl data-hero className="grid grid-cols-[6.5rem_1fr] gap-x-4 gap-y-3 text-sm">
                <dt className="eyebrow pt-0.5">Now</dt>
                <dd className="text-paper/85">MCA, University of Petroleum and Energy Studies</dd>
                <dt className="eyebrow pt-0.5">Recently</dt>
                <dd className="text-paper/85">Research Intern, Dalian University of Technology</dd>
                <dt className="eyebrow pt-0.5">Seeking</dt>
                <dd className="text-paper/85">PhD positions in computational biomedicine</dd>
              </dl>
            </div>
          </div>

          <a
            href="#research"
            data-hero
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget('#research');
            }}
            className="group mt-10 hidden items-center gap-3 text-sm text-paper/60 transition-colors hover:text-paper md:inline-flex"
          >
            <span className="relative block h-10 w-px overflow-hidden bg-line/15">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.2s_cubic-bezier(0.65,0,0.35,1)_infinite] bg-paper motion-reduce:animate-none" />
            </span>
            Scroll to explore
          </a>
        </div>
      </section>

      <section aria-label="At a glance" data-scene="helix" data-x="0.24" className="relative py-16 md:py-24">
        <dl className="shell grid grid-cols-2 gap-y-10 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              data-reveal
              className={`flex flex-col-reverse gap-3 pr-6 ${i > 0 ? 'md:border-l md:border-line/10 md:pl-8' : ''} ${
                i % 2 === 1 ? 'border-l border-line/10 pl-6 md:pl-8' : ''
              }`}
            >
              <dt className="max-w-[14rem] text-sm leading-snug text-muted">{s.label}</dt>
              <dd className="font-serif text-6xl leading-none md:text-7xl">
                <span data-count={s.value} data-decimals={s.decimals ?? 0} className="tabular-nums">
                  {s.decimals ? s.value.toFixed(s.decimals) : s.value}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
