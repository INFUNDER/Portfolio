import SplitText from '../components/SplitText';
import { education, experience, skills } from '../data/content';
import { SectionHead } from './Research';

export default function Path() {
  return (
    <section id="path" data-scene="network" data-x="-0.37" data-opacity="0.45" className="relative py-28 md:py-40">
      <div className="shell grid md:grid-cols-12">
        <div className="md:col-span-8 md:col-start-5">
          <SectionHead
            index="04"
            label="Path"
            title={
              <>
                <SplitText text="Where I’ve" className="block" />
                <SplitText text="done the work" className="block italic text-paper/90" />
              </>
            }
          />

          <h3 className="eyebrow mb-2 mt-20" data-reveal>
            Experience
          </h3>
          <ol className="border-t border-line/10">
            {experience.map((job) => (
              <li key={job.org} data-reveal className="grid gap-x-8 gap-y-4 border-b border-line/10 py-10 sm:grid-cols-[10rem_1fr]">
                <div className="text-sm">
                  <p className="font-mono text-xs uppercase tracking-wider text-paper/80">{job.period}</p>
                  <p className="mt-1 text-muted">{job.place}</p>
                </div>
                <div>
                  <h4 className="font-serif text-3xl leading-tight">
                    {job.role}
                    <span className="block text-xl italic text-paper/60 md:text-2xl">{job.org}</span>
                  </h4>
                  <ul className="mt-5 space-y-2.5 text-[0.95rem] leading-relaxed text-paper/70">
                    {job.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-eosin" aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>

          <h3 className="eyebrow mb-6 mt-20" data-reveal>
            Education
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {education.map((e) => (
              <div
                key={e.degree}
                data-reveal
                className="group relative overflow-hidden rounded-2xl border border-line/10 bg-paper/[0.02] p-6 transition-colors duration-500 hover:border-line/25"
              >
                <p className="font-mono text-xs uppercase tracking-wider text-muted">{e.period}</p>
                <p className="mt-6 font-serif text-2xl leading-tight">{e.degree}</p>
                <p className="mt-1 text-sm text-paper/60">{e.org}</p>
                {e.detail && <p className="mt-4 inline-block rounded-full bg-hema/15 px-2.5 py-1 font-mono text-xs text-hema">{e.detail}</p>}
              </div>
            ))}
          </div>

          <h3 className="eyebrow mb-6 mt-20" data-reveal>
            Toolkit
          </h3>
          <dl className="grid gap-x-8 border-t border-line/10 sm:grid-cols-2">
            {skills.map((s) => (
              <div key={s.group} data-reveal className="border-b border-line/10 py-6">
                <dt className="text-sm text-paper">{s.group}</dt>
                <dd className="mt-3 flex flex-wrap gap-1.5">
                  {s.items.map((item) => (
                    <span key={item} className="rounded-full border border-line/10 px-2.5 py-1 text-xs text-paper/70">
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
