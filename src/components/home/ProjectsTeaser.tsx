import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { projects } from '@/data/projects';
import { Reveal } from '@/components/Reveal';

export function ProjectsTeaser() {
  const t = useTranslations('projectsTeaser');
  const tProjects = useTranslations('projects');

  return (
    <section id="referanslar" className="scroll-mt-20 bg-graphite-950 py-16 text-white sm:py-20">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-graphite-300">
                {t('eyebrow')}
              </p>
              <h2 className="mt-3 max-w-xl text-balance font-display text-2xl font-bold tracking-tight sm:text-3xl">
                {t('title')}
              </h2>
            </div>
            <Link
              href="/projects"
              className="group flex shrink-0 items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-graphite-950"
            >
              {t('cta')}
              <ArrowRight size={15} className="rtl:rotate-180" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:thin]">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.06} className="snap-start">
              <Link
                href="/projects"
                className={`group relative flex h-48 w-72 shrink-0 flex-col justify-end overflow-hidden rounded-xl bg-gradient-to-br ${project.gradient} p-5 transition-transform hover:-translate-y-1`}
              >
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.location}
                    fill
                    sizes="288px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                )}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-graphite-950/85 via-graphite-950/30 to-transparent"
                  aria-hidden
                />
                <div className="relative">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur-sm">
                    <MapPin size={11} />
                    {project.location}
                  </span>
                  <h3 className="mt-2.5 line-clamp-2 font-display text-sm font-bold leading-snug">
                    {tProjects(`items.${project.slug}.title`)}
                  </h3>
                  <p className="mt-1 text-xs text-white/70">
                    {project.metric} · {project.year}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
