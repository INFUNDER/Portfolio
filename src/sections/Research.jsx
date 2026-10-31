import SplitText from '../components/SplitText';
import { marquee, profile } from '../data/content';

export function SectionHead({ index, label, title, className = '' }) {
  return (
    <div className={className}>
      <p className="eyebrow mb-6 flex items-center gap-3" data-reveal>
        <span className="text-eosin">{index}</span>
        <span className="h-px w-8 bg-line/20" aria-hidden="true" />
        {label}
      </p>
      <h2 data-split-group className="font-serif text-[clamp(2.75rem,7vw,6.25rem)] font-normal leading-[0.92] tracking-[-0.02em]">
        {title}
      </h2>
    </div>
  );
}

export function Figure({ n, children, className = '' }) {
  return (
    <figure className={`max-w-[17rem] text-xs leading-relaxed text-muted ${className}`} data-reveal>
      <span className="font-mono uppercase tracking-[0.14em] text-paper/70">Fig. {String(n).padStart(2, '0')}</span>
      <figcaption className="mt-1.5">{children}</figcaption>
    </figure>
  );
}

export default function Research() {
  return (
    <>
      <section id="research" data-scene="tissue" data-x="0.25" className="relative py-28 md:py-40">
        <div className="shell grid gap-y-14 md:min-h-[110vh] md:grid-cols-12">
          <SectionHead
            index="01"
            label="Research"
            className="md:col-span-7"
            title={
              <>
                <SplitText text="From tissue" className="block" />
                <SplitText text="to gene." className="block italic text-paper/90" />
              </>
            }
          />

          <div className="space-y-12 md:col-span-6 md:row-start-2">
            <p data-reveal className="text-lg leading-relaxed text-paper/80 md:text-xl">
              {profile.summary}
            </p>

            <div>
              <h3 className="eyebrow mb-4" data-reveal>
                Interests
              </h3>
              <ol className="border-t border-line/10">
                {profile.interests.map((item, i) => (
                  <li
                    key={item}
                    data-reveal
                    className="group flex items-baseline gap-6 border-b border-line/10 py-4 transition-colors duration-300 hover:text-eosin"
                  >
                    <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-serif text-2xl md:text-3xl">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <Figure n={1} className="md:col-span-3 md:col-start-10 md:row-start-2 md:self-end md:justify-self-end">
            A slide of H&amp;E-stained tissue. Nuclei are violet, stroma is pink, and spatial transcriptomics
            expression rises above each spot.
          </Figure>
        </div>
      </section>

      <div className="relative overflow-hidden border-y border-line/10 py-6" aria-hidden="true">
        <div className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {marquee.map((word) => (
                <span key={word} className="flex items-center font-serif text-4xl italic text-paper/80 md:text-6xl">
                  <span className="px-8">{word}</span>
                  <span className="h-2 w-2 rounded-full bg-eosin" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
