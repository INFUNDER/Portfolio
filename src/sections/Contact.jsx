import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import SplitText from '../components/SplitText';
import { profile } from '../data/content';
import { scrollToTarget } from '../lib/smoothScroll';

function useLocalTime(timeZone) {
  const format = () =>
    new Intl.DateTimeFormat('en-GB', { timeZone, hour: '2-digit', minute: '2-digit' }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 20_000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone]);
  return time;
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const time = useLocalTime(profile.timezone);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const links = [
    { label: 'LinkedIn', href: profile.linkedin },
    { label: 'GitHub', href: profile.github },
  ];

  return (
    <section id="contact" data-scene="helix" data-x="0.3" data-opacity="0.7" className="relative flex min-h-[100svh] flex-col pt-28 md:pt-40">
      <div className="shell flex flex-1 flex-col">
        <p className="eyebrow mb-8 flex items-center gap-3" data-reveal>
          <span className="text-eosin">05</span>
          <span className="h-px w-8 bg-line/20" aria-hidden="true" />
          Contact
        </p>
        <h2 data-split-group className="max-w-6xl font-serif text-[clamp(3.25rem,10vw,10rem)] font-normal leading-[0.88] tracking-[-0.025em]">
          <SplitText text="Let’s talk" className="block" />
          <SplitText text="research." className="block italic text-paper/90" />
        </h2>

        <p data-reveal className="mt-10 max-w-xl text-lg leading-relaxed text-paper/75">
          I’m looking for PhD positions in computational pathology, spatial omics and interpretable machine learning,
          and I’m always glad to hear about collaborations.
        </p>

        <div data-reveal className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex min-h-[56px] items-center justify-between gap-6 rounded-full bg-paper py-2 pl-6 pr-2 text-ink transition-colors duration-300 hover:bg-eosin"
          >
            <span className="text-base font-medium md:text-lg">{profile.email}</span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45">
              <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
            </span>
          </a>
          <button
            type="button"
            onClick={copy}
            className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full border border-line/15 px-6 text-sm text-paper/80 transition-colors hover:border-line/40 hover:text-paper"
          >
            {copied ? <Check aria-hidden="true" className="h-4 w-4 text-emerald-400" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
            <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
          </button>
        </div>

        <ul data-reveal className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex min-h-[44px] items-center gap-1.5 text-paper/80 transition-colors hover:text-paper"
              >
                <span className="link-underline">{l.label}</span>
                <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="min-h-24 flex-1" aria-hidden="true" />
        <footer className="flex flex-col gap-4 border-t border-line/10 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p className="font-mono text-xs uppercase tracking-wider">
            {profile.location} · <span className="tabular-nums text-paper/70">{time}</span> IST
          </p>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget(0);
            }}
            className="link-underline self-start text-paper/70 hover:text-paper sm:self-auto"
          >
            Back to top ↑
          </a>
        </footer>
      </div>
    </section>
  );
}
